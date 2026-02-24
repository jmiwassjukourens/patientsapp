export const tokens = {
  color: {
    primary: "#2F6F6B",
    primaryHover: "#285E5B",
    primarySoft: "#E6F3F2",

    ink: "#1F2A33",
    muted: "#55616D",

    bg: "#F6F2EE",
    surface: "#FCFAF8",
    border: "#E4DED7",

    success: "#2F7A5B",
    successSoft: "#E7F3ED",
    warning: "#9A6A1C",
    warningSoft: "#F7F0E3",
    danger: "#B23A48",
    dangerSoft: "#F7E7EA",
    info: "#2F5E7A",
    infoSoft: "#E6EEF4",
  },
  radius: {
    control: 10,
    card: 14,
    modal: 16,
  },
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 24,
    6: 32,
    7: 40,
    8: 48,
    9: 64,
  },
  motion: {
    fast: 120,
    base: 180,
    dialog: 220,
    easing: "cubic-bezier(0.2, 0, 0, 1)",
  },
  shadow: {
    level1: "0 1px 2px rgba(31, 42, 51, 0.06), 0 6px 18px rgba(31, 42, 51, 0.06)",
    level2: "0 2px 4px rgba(31, 42, 51, 0.08), 0 14px 36px rgba(31, 42, 51, 0.12)",
  },
  typography: {
    fontFamily:
      '"Source Sans 3", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
    weights: { regular: 400, medium: 500, semibold: 600 },
  },
};

export function tokensToCssVars(t = tokens) {
  return {
    "--color-primary": t.color.primary,
    "--color-primary-hover": t.color.primaryHover,
    "--color-primary-soft": t.color.primarySoft,

    "--color-ink": t.color.ink,
    "--color-muted": t.color.muted,

    "--color-bg": t.color.bg,
    "--color-surface": t.color.surface,
    "--color-border": t.color.border,

    "--color-success": t.color.success,
    "--color-success-soft": t.color.successSoft,
    "--color-warning": t.color.warning,
    "--color-warning-soft": t.color.warningSoft,
    "--color-danger": t.color.danger,
    "--color-danger-soft": t.color.dangerSoft,
    "--color-info": t.color.info,
    "--color-info-soft": t.color.infoSoft,

    "--radius-control": `${t.radius.control}px`,
    "--radius-card": `${t.radius.card}px`,
    "--radius-modal": `${t.radius.modal}px`,

    "--shadow-1": t.shadow.level1,
    "--shadow-2": t.shadow.level2,

    "--dur-fast": `${t.motion.fast}ms`,
    "--dur-base": `${t.motion.base}ms`,
    "--dur-dialog": `${t.motion.dialog}ms`,
    "--ease-standard": t.motion.easing,

    "--font-family": t.typography.fontFamily,
  };
}

