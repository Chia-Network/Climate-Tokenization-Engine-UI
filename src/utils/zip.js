import Minizip from 'minizip-asm.js';

export const decrypt = (file, password, cb) => {
  var fr = new FileReader();

  fr.onload = function (event) {
    try {
      var zip = new Minizip(new Uint8Array(event.target.result));

      var newZip = new Minizip();

      zip.list({ encoding: 'buffer' }).forEach(function (o) {
        newZip.append(
          o.filepath,
          zip.extract(o.filepath, { password: password }),
        );
      });

      var file = new File([newZip.zip()], 'file.zip', {
        type: 'application/octet-binary',
      });

      cb(file);
    } catch (e) {
      cb(null);
      console.log('error: ', e);
    }
  };

  fr.readAsArrayBuffer(file);
};
