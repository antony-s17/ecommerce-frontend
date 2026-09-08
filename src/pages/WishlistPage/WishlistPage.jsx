import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
          <div className={styles.spinner}></div>
          <p>Cargando favoritos...</p>
        </div>
      </main>
    );
  }

  if (error && items.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>
          <span>♡</span>
          <h1>No pudimos cargar tus favoritos</h1>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>
              Tus favoritos
            </span>

            <h1>Favoritos</h1>

            <p>
              Guarda los productos que más te gustan.
            </p>
          </div>

          {items.length > 0 && (
            <span className={styles.count}>
              {items.length} productos
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <span>♡</span>

            <h2>Aún no tienes favoritos</h2>

            <p>
              Explora nuestros productos y guarda los que
              más te interesen.
            </p>

            <Link
              to="/products"
              className={styles.button}
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map((item) => (
              <ProductCard
                key={item.id || item.product?.id}
                product={item.product || item}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default WishlistPage;