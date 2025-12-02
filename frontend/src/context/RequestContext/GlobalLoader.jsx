import { useRequest } from "./RequestContext";
import styles from "./GlobalLoader.module.css";

export default function GlobalLoader() {
  const { activeRequests } = useRequest();

  if (activeRequests === 0) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.loader}></div>
    </div>
  );
}
