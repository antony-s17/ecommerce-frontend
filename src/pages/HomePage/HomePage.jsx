import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../store/productsSlice";
import ProductCard from "../../components/ProductCard/ProductCard";

import styles from "./HomePage.module.css";

function HomePage() {
  const dispatch = useDispatch();

  const {
    items,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const featuredProducts = items.slice(0, 4);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>
            🎮 Pixel Market
          </span>

          <h1>
            Encuentra tu próxima
            <span> aventura.</span>
          </h1>

          <p>
            Descubre videojuegos, guarda tus favoritos
            y encuentra tu próximo título para jugar.
          </p>

          <div className={styles.heroActions}>
            <Link
              to="/products"
              className={styles.primaryButton}
            >
              Explorar videojuegos
            </Link>

            <a
              href="#featured"
              className={styles.secondaryButton}
            >
              Ver destacados
            </a>
          </div>

          <div className={styles.features}>
            <div>
              <strong>🎮</strong>
              <span>Catálogo gaming</span>
            </div>

            <div>
              <strong>♡</strong>
              <span>Lista de deseos</span>
            </div>

            <div>
              <strong>🛒</strong>
              <span>Compra sencilla</span>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.gameCard}>
            <div className={styles.controller}>
              🎮
            </div>

            <span>PIXEL MARKET</span>

            <h2>
              Level up your
              <br />
              collection
            </h2>

            <div className={styles.decorations}>
              <span>✦</span>
              <span>●</span>
              <span>✚</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="featured"
        className={styles.featured}
      >
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionBadge}>
              Catálogo
            </span>

            <h2>Videojuegos destacados</h2>

            <p>
              Algunos títulos disponibles actualmente
              en Pixel Market.
            </p>
          </div>

          <Link
            to="/products"
            className={styles.viewAll}
          >
            Ver todos →
          </Link>
        </div>

        {loading && (
          <div className={styles.message}>
            Cargando videojuegos...
          </div>
        )}

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          featuredProducts.length === 0 && (
            <div className={styles.message}>
              Todavía no hay videojuegos disponibles.
            </div>
          )}

        {featuredProducts.length > 0 && (
          <div className={styles.grid}>
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      <section className={styles.promo}>
        <div>
          <span>PIXEL MARKET</span>

          <h2>
            Tu colección comienza aquí.
          </h2>

          <p>
            Explora nuestro catálogo y agrega tus
            videojuegos favoritos.
          </p>
        </div>

        <Link
          to="/products"
          className={styles.promoButton}
        >
          Explorar catálogo
        </Link>
      </section>
    </main>
  );
}

export default HomePage;