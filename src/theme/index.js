import merge from "lodash/merge";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { THEMES } from "./constants";
import { lightShadows, darkShadows } from "./shadows";

const baseOptions = {
  direction: "ltr",
  components: {
    MuiAvatar: {
      styleOverrides: {
        fallback: {
          height: "75%",
          width: "75%",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          backgroundColor: "#2F534E"
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          height: "100%",
          width: "100%",
        },
        body: {
          height: "100%",
        },
        "#root": {
          height: "100%",
        },
        "#nprogress .bar": {
          zIndex: "2000 !important",
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: "hidden",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "auto",
          marginRight: "16px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        gutters: {
          paddingLeft: "48px !important",
          paddingRight: "48px !important",
        }
      }
    },
  },
  typography: {
    button: {
      fontWeight: 700,
      fontSize: "1rem",
    },
    fontFamily:
      'Roboto Mono,sans-serif;',
    h1: {
      fontWeight: "700 !important",
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: "700 !important",
      fontSize: "2rem",
    },
    h3: {
      fontWeight: "700 !important",
      fontSize: "1.5rem",
    },
    h4: {
      fontWeight: "700 !important",
      fontSize: "1.25rem",
    },
    h5: {
      fontWeight: "700 !important",
      fontSize: "1rem",
    },
    h6: {
      fontWeight: "700 !important",
      fontSize: "0.75rem",
    },
    body1: {
      fontWeight: "400 !important",
      fontSize: "1.5rem",
    },
    body2:{
      fontWeight: "500 !important",
      fontSize: "0.75rem",
    },
    subtitle1:{
      fontWeight: "500 !important",
      fontSize: "0.625rem",
    },
    action1:{
      fontWeight: "700 !important",
      fontSize: "1rem",
    },
    action2:{
      fontWeight: "700 !important",
      fontSize: "0.75rem",
    },
  },
};

const themesOptions = {
  [THEMES.DARK]: {
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
          },
        },
      },
    },
    palette: {
      action: {
        active: "rgba(96, 186, 251, 0.7)",
        hover: "#0F9AFF",
        selected: "rgba(96,186,251,0.7)"
      },
      background: {
        paper: "#00201B",
        default: "#00201B",
      },
      divider: "rgba(145, 158, 171, 0.24)",
      error: {
        contrastText: "#ffffff",
        main: "#f44336",
      },
      mode: "dark",
      primary: {
        main: "#0FFFDF",
        contrastText: "#527C93",
      },
      secondary: {
        main: "#1FC1BB",
        contrastText: "#A9CCDF"
      },
      success: {
        contrastText: "#ffffff",
        main: "#4caf50",
      },
      text: {
        primary: "#DCF3FF",
        secondary: "#A9CCDF",
      },
      warning: {
        contrastText: "#ffffff",
        main: "#ff9800",
      },
    },
    shadows: darkShadows,
  },
};

export const createCustomTheme = (config = {}) => {
  let themeOptions = themesOptions[config.theme];

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    themeOptions = themesOptions[THEMES.LIGHT];
  }

  let theme = createTheme(
    merge(
      {},
      baseOptions,
      themeOptions,
      {
        ...(config.roundedCorners && {
          shape: {
            borderRadius: 16,
          },
        }),
      },
      {
        direction: config.direction,
      }
    )
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
