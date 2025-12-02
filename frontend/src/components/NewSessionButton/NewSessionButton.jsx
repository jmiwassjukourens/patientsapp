import React from "react";
import styles from "./NewSessionButton.module.css";


function NewSessionButton({ onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      + Nueva sesión
    </button>
  );
}

export default NewSessionButton;
