import { Link } from "react-router-dom";

import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <span className={styles.code}>404</span>

        <div className={styles.icon}>
          🎮
        </div>

        <h1>Ruta no encontrada</h1>

        <p>
          Parece que esta parte del mapa no existe.
          Regresa al inicio o continúa explorando
          el catálogo de Pixel Market.
        </p>

        <div className={styles.actions}>
          <Link
            to="/"
            className={styles.primaryButton}
          >
            Volver al inicio
          </Link>

          <Link
            to="/products"
            className={styles.secondaryButton}
          >
            Ver videojuegos
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;