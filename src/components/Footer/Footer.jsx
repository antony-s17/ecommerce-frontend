import { Link } from "react-router-dom";

import styles from "./Footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoIcon}>🎮</span>
              <span>Pixel Market</span>
            </Link>

            <p>
              Tu tienda gaming para descubrir videojuegos,
              guardar favoritos y ampliar tu colección.
            </p>

            <span className={styles.tagline}>
              PLAY · EXPLORE · COLLECT
            </span>
          </div>

          <div className={styles.linksGroup}>
            <h3>Tienda</h3>

            <Link to="/products">
              Videojuegos
            </Link>

            <Link to="/wishlist">
              Favoritos
            </Link>

            <Link to="/cart">
              Carrito
            </Link>
          </div>

          <div className={styles.linksGroup}>
            <h3>Navegación</h3>

            <Link to="/">
              Inicio
            </Link>

            <Link to="/products">
              Catálogo
            </Link>

            <a href="/#featured">
              Destacados
            </a>
          </div>

          <div className={styles.gaming}>
            <h3>Gaming Zone</h3>

            <p>
              Encuentra títulos para tus plataformas
              favoritas.
            </p>

            <div className={styles.platforms}>
              <span>PC</span>
              <span>PS5</span>
              <span>XBOX</span>
              <span>SWITCH</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © {currentYear} Pixel Market.
          </span>

          <span>
            Proyecto e-commerce 🎮
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;