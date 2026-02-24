import styles from "./AppShell.module.css";

export default function AppShell({ title, subtitle, actions, children }) {
  return (
    <div className={styles.shell}>
      {(title || subtitle || actions) && (
        <div className={styles.header}>
          <div className={styles.titleBlock}>
            {title && <h1 className={styles.title}>{title}</h1>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}

      <div className={styles.content}>{children}</div>
    </div>
  );
}

