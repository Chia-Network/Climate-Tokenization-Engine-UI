
terraform {
  backend "remote" {
    organization = "ChiaBlockchain"

    workspaces {
      name = "carbon-asset-token"
    }
  }
}

provider "aws" {
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  region     = var.aws_region
  profile    = var.aws_profile
}

variable "aws_access_key"   {}
variable "aws_secret_key"   {}
variable "aws_profile"      {}
variable "aws_region"       { default = "us-east-1" }
variable "storage_bucket"   { default = "carbon-asset-token-app"}
variable "app_name"         { default = "Carbon Asset Token Retirement Explorer"}
variable "upload_directory" { default = "./build/"}   
variable "service_domain"   { default = "example.com" }

variable "mime_types" {
  type = map
  default = {
    htm      = "text/html"
    html     = "text/html"
    css      = "text/css"
    ttf      = "font/ttf"
    js       = "application/javascript"
    map      = "application/javascript"
    json     = "application/json"
    png      = "image/png"
    jpg      = "image/jpg"
    gltf     = "application/octet-stream"
    bin      = "application/octet-stream"
    glb      = "application/octet-stream"
    tif      = "image/tif"
    wasm     = "application/wasm"
    hdr      = "image/hdr"
    DS_Store = "application/octet-stream"
    env      = "application/octet-stream"
  }
}

### UPLOAD APP TO AWS BUCKET ###

resource "aws_s3_bucket" "app-bucket" {
  bucket = "${var.storage_bucket}"
  acl     = "public-read"
  policy = jsonencode({
    "Version": "2008-10-17",
    "Statement": [
      {
        "Sid": "AllowPublicRead",
        "Effect": "Allow",
        "Principal": {
          "AWS": "*"
        },
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::${var.storage_bucket}/*"
      }
    ]
  })

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_object" "website_files" {
  for_each      = fileset("${path.module}", "**/*.*")
  bucket        = var.storage_bucket
  key           = replace(each.value, var.upload_directory, "")
  source        = "${path.module}/${each.value}"
  acl           = "public-read"
  etag          = filemd5("${path.module}/${each.value}")
  content_type  = lookup(var.mime_types, split(".", each.value)[length(split(".", each.value)) - 1], "application/octet-stream")
}

### END UPLOAD APP TO AWS BUCKET ### 

### CREATE APP DOMAIN ###

resource "aws_route53_zone" "service-zone" {
  name = var.service_domain
}

resource "aws_route53_record" "app-subdomain-a-record" {
  zone_id = aws_route53_zone.service-zone.zone_id
  name    = "app.${var.service_domain}"
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.cdn_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.cdn_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_acm_certificate" "primary-domain" {
  domain_name       = var.service_domain
  validation_method = "DNS"

  tags = {
    Environment = "Prod"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.primary-domain.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id = aws_route53_zone.service-zone.id
}

resource "aws_acm_certificate_validation" "primary-domain-certificate" {
  certificate_arn         = aws_acm_certificate.primary-domain.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

resource "aws_acm_certificate" "wildcard-domain" {
  domain_name       = "*.${var.service_domain}"
  validation_method = "DNS"

  tags = {
    Environment = "Prod"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "wildcard-cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.wildcard-domain.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id = aws_route53_zone.service-zone.id
}

resource "aws_acm_certificate_validation" "wildcard-domain-certificate" {
  certificate_arn         = aws_acm_certificate.wildcard-domain.arn
  validation_record_fqdns = [for record in aws_route53_record.wildcard-cert_validation : record.fqdn]
}

### WEBSITE CDN ###

resource "aws_cloudfront_distribution" "cdn_distribution" {
  origin {
    domain_name = aws_s3_bucket.storage-bucket.bucket_regional_domain_name
    origin_id   = "${var.storage_bucket}"

    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols = ["TLSv1.2"]
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [aws_route53_record.app-subdomain-a-record.name]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.storage_bucket}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.wildcard-domain.arn
    ssl_support_method = "sni-only"
  }
}