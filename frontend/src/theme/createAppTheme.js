import { alpha, createTheme } from "@mui/material/styles";
import { tokens, tokensToCssVars } from "./tokens";

const fontFamily = tokens.typography.fontFamily;

export function createAppTheme() {
  return createTheme({
    palette: {
      mode: "light",
      primary: {
        main: tokens.color.primary,
        dark: tokens.color.primaryHover,
        light: tokens.color.primarySoft,
        contrastText: tokens.color.surface,
      },
      success: { main: tokens.color.success },
      warning: { main: tokens.color.warning },
      error: { main: tokens.color.danger },
      info: { main: tokens.color.info },
      background: {
        default: tokens.color.bg,
        paper: tokens.color.surface,
      },
      text: {
        primary: tokens.color.ink,
        secondary: tokens.color.muted,
      },
      divider: tokens.color.border,
      action: {
        hover: alpha(tokens.color.primary, 0.06),
        selected: alpha(tokens.color.primary, 0.1),
        focus: alpha(tokens.color.primary, 0.12),
      },
    },
    shape: { borderRadius: tokens.radius.control },
    typography: {
      fontFamily,
      h1: { fontSize: "1.75rem", lineHeight: 1.3, fontWeight: 600 },
      h2: { fontSize: "1.5rem", lineHeight: 1.33, fontWeight: 600 },
      h3: { fontSize: "1.25rem", lineHeight: 1.4, fontWeight: 600 },
      h4: { fontSize: "1.125rem", lineHeight: 1.44, fontWeight: 600 },
      h5: { fontSize: "1rem", lineHeight: 1.5, fontWeight: 600 },
      h6: { fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 600 },
      body1: { fontSize: "1rem", lineHeight: 1.5, fontWeight: 400 },
      body2: { fontSize: "0.875rem", lineHeight: 1.57, fontWeight: 400 },
      caption: { fontSize: "0.75rem", lineHeight: 1.5, fontWeight: 400 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ":root": {
            ...tokensToCssVars(),
            colorScheme: "light",
          },
          "html, body": {
            height: "100%",
          },
          body: {
            margin: 0,
            backgroundColor: tokens.color.bg,
            color: tokens.color.ink,
            fontFamily,
            textRendering: "optimizeLegibility",
          },
          "*, *::before, *::after": {
            boxSizing: "border-box",
          },
          a: {
            color: "inherit",
          },
          "::selection": {
            backgroundColor: alpha(tokens.color.primary, 0.18),
          },
          "@media (prefers-reduced-motion: reduce)": {
            "*, *::before, *::after": {
              animationDuration: "1ms !important",
              animationIterationCount: "1 !important",
              transitionDuration: "1ms !important",
              scrollBehavior: "auto !important",
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            border: `1px solid ${tokens.color.border}`,
            backgroundImage: "none",
          },
          rounded: {
            borderRadius: tokens.radius.card,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.control,
            textTransform: "none",
            letterSpacing: 0,
            paddingInline: 14,
            transition: `background-color ${tokens.motion.base}ms ${tokens.motion.easing}, border-color ${tokens.motion.base}ms ${tokens.motion.easing}, transform ${tokens.motion.base}ms ${tokens.motion.easing}`,
            "&:active": {
              transform: "translateY(0px)",
            },
            "&.Mui-focusVisible": {
              outline: `2px solid ${alpha(tokens.color.primary, 0.5)}`,
              outlineOffset: 2,
            },
          },
          containedPrimary: {
            backgroundColor: tokens.color.primary,
            "&:hover": { backgroundColor: tokens.color.primaryHover },
          },
          outlined: {
            borderColor: tokens.color.border,
          },
        },
        variants: [
          {
            props: { variant: "outlined", color: "primary" },
            style: {
              borderColor: alpha(tokens.color.primary, 0.35),
              "&:hover": { borderColor: alpha(tokens.color.primary, 0.6) },
            },
          },
          {
            props: { variant: "text", color: "primary" },
            style: {
              "&:hover": { backgroundColor: alpha(tokens.color.primary, 0.08) },
            },
          },
        ],
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          size: "small",
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.control,
            backgroundColor: tokens.color.surface,
            transition: `box-shadow ${tokens.motion.base}ms ${tokens.motion.easing}, border-color ${tokens.motion.base}ms ${tokens.motion.easing}`,
            "&.Mui-focused": {
              boxShadow: `0 0 0 4px ${alpha(tokens.color.primary, 0.14)}`,
            },
          },
          notchedOutline: {
            borderColor: tokens.color.border,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: tokens.color.muted,
            "&.Mui-focused": { color: tokens.color.primary },
          },
        },
      },
      MuiDialog: {
        defaultProps: {
          fullWidth: true,
          maxWidth: "sm",
        },
      },
      MuiDialogPaper: {
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.modal,
            border: `1px solid ${tokens.color.border}`,
            boxShadow: tokens.shadow.level2,
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            fontSize: "1.125rem",
            paddingBottom: 10,
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            paddingTop: 10,
          },
        },
      },
      MuiAlert: {
        defaultProps: {
          variant: "outlined",
        },
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.card,
            alignItems: "center",
          },
          outlinedSuccess: {
            backgroundColor: tokens.color.successSoft,
            borderColor: alpha(tokens.color.success, 0.25),
          },
          outlinedError: {
            backgroundColor: tokens.color.dangerSoft,
            borderColor: alpha(tokens.color.danger, 0.25),
          },
          outlinedWarning: {
            backgroundColor: tokens.color.warningSoft,
            borderColor: alpha(tokens.color.warning, 0.25),
          },
          outlinedInfo: {
            backgroundColor: tokens.color.infoSoft,
            borderColor: alpha(tokens.color.info, 0.25),
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            "& .MuiPaper-root": {
              boxShadow: tokens.shadow.level1,
            },
          },
        },
      },
    },
  });
}

