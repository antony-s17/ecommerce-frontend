import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchWishlist } from "../../store/wishlistSlice";

import ProductCard from "../../components/ProductCard/ProductCard";

import styles from "./WishlistPage.module.css";

function WishlistPage() {
  const dispatch = useDispatch();

  const {
    items,
    loading,
    error,
  } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (loading && items.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.message}>
          Cargando favoritos...
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>
              Mis favoritos
            </span>

            <h1>Lista de deseos</h1>

            <p>
              Guarda tus videojuegos favoritos
              para encontrarlos fácilmente.
            </p>
          </div>

          <span className={styles.counter}>
            {items.length}{" "}
            {items.length === 1
              ? "producto"
              : "productos"}
          </span>
        </div>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          items.length === 0 && (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                ♡
              </div>

              <h2>Tu lista está vacía</h2>

              <p>
                Explora nuestro catálogo y agrega
                videojuegos a tus favoritos.
              </p>

              <Link
                to="/products"
                className={styles.button}
              >
                Explorar videojuegos
              </Link>
            </div>
          )}

        {items.length > 0 && (
          <div className={styles.grid}>
            {items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default WishlistPage;