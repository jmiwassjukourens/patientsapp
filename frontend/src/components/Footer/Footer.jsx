import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.text}>© 2025 PatientsApp - Todos los derechos reservados</span>
        {/*
        <div className={styles.divider}></div>
        <a href="/privacidad" className={styles.link}>Política de Privacidad</a>
        <div className={styles.divider}></div>
        <a href="/terminos" className={styles.link}>Términos y Condiciones</a>
        */}
      </div>
    </footer>
  );
}

export default Footer;
