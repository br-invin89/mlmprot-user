import { createMuiTheme } from "@material-ui/core/styles";
import PoppinsTtf from "assets/fonts/proxima-nova-regular.ttf";

const poppins = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 500,
  src: `
    local('Poppins'),
    local('Poppins-Regular'),
    url(${PoppinsTtf}) format('ttf')
  `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: "#3A81D4",
      // dark: "#1C67FF",
      // light: "#49A0FF",
      // darker: "#5856D6",
      // inverted: "#F7FAFE",
      main: "#5d487a",
      menu: "#5d487a",
      dark: "#10c020",
      light: "#44e400",
      darker: "#00a000",
      inverted: "#F7FAFE", 
      contrastText: "#F7FAEF",
      dimGray: '#fbfafc' 
    },
    secondary: {
      main: "#1a2732",
      light: "#F577B1",
      dark: "#F56BAA",
      contrastText: "#FFFFFF",
    },
    menu: {
      title: '#DADADA',
      icon: '#B83E39'
    },
    success: {
      dark: "#2c387e",
      main: "#3f51b5",
      light: "#6573c3",
    },
    error: {
      dark: '#b22a00',
      main: '#ff3d00',
      light: '#ff6333',
    },
    info: {
      main: "#1C67FF",
      light: "#FFCC00",
    },
    text: {
      primary: "#31394D",
      secondary: "#8892ac",
      primaryInverted: "#fff",
      secondaryInverted: "#d6d6d6",
      disabled: "#8892AC",
    },
    divider: "#F1F1F1",
    background: {
      default: "#EFF3F6",
      panel: "#fff",
      activePanel: "#F3F6FC",
      search: "#FAFAFA",      
    },
    action: {
      disabled: "#B7BECE",
    },
    border: {
      active: "#97A1B9",
      panel: "#e5e9f2",
      search: "#CED2DA",
      menu: '#E3F2FD',
    },
    circle: {
      inactive: '#C4C4C4',
      active: '#5d487a'
    }
  },
  typography: {
    fontFamily: "Poppins, Arial",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [poppins],
      },
    },
    MuiButton: {
      raisedPrimary: {
        color: 'white'
      },
      raisedDefault: {
        color: 'white'
      }
    },
    MuiLink: {
      raisedPrimary: {
        color: '#44e400'
      }
    }
  },
});

export default theme;
