const hexToRgba = (hex, opacity) => {
  opacity = opacity || 1;
  hex = hex.replace(/[^0-9A-F]/gi, '');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${[r, g, b, opacity].join(',')})`;
};

const headings = {
  xs: '10px',
  sm: '12px',
  md: '14px',
  lg: '36px',
  xl: '43px',
  xxl: '60px',
};

/**
 * Values should be hex values and not rgb/rgba
 * https://material.io/design/color/the-color-system.html#tools-for-picking-colors
 * @type {ThemeVariant}
 */
const colors = {
  default: {
    primary: '#5ECE71',
    primaryDark: '#FEFEFF',
    secondary: '#094D4C',
    gray1: '#65838A',
    gray2: '#95B0B7',
    gray3: '#CCDDE1',
    gray4: '#E2EDF0',
    gray5: '#F1F7F9',
    gray6: '#F8FBFC',
    background: '#F0F2F5',
    onSurface: '#000000',
    onButton: '#FFFFFF',
    leftNav: {
      bg: 'rgb(240, 242, 245)',
      text: '#6e7d7f',
      highlight: '#fff',
    },
    status: {
      info: {
        primary: '#91D5FF',
        secondary: '#E6F7FF',
      },
      error: {
        primary: '#F5222D',
        secondary: '#FFEBEE',
      },
      warning: {
        primary: '#FAAD14',
        secondary: '#FFF7E1',
      },
      ok: {
        primary: '#52C41A',
        secondary: '#ECF8E6;',
      },
    },
  },
};

const typography = {
  primary: {
    regular: 'Poppins',
    semiBold: 'PoppinsSemiBold',
    bold: 'PoppinsBold',
    extraBold: 'PoppinsExtraBold',
    light: 'PoppinsLight',
  },
};

const theme = {
  colors,
  headings,
  typography,
  hexToRgba,
};

export default theme;
