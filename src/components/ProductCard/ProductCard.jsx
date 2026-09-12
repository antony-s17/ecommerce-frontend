import { Link } from "react-router-dom";
import WishlistButton from "../WishlistButton/WishlistButton";

import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <Link
        to={`/products/${product.id}`}
        className={styles.imageContainer}
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.image}
          />
        ) : (
          <div className={styles.noImage}>
            🎮
          </div>
        )}
      </Link>

      <div className={styles.content}>
        <span className={styles.category}>
          Videojuego
        </span>

        <Link
          to={`/products/${product.id}`}
          className={styles.name}
        >
          {product.name}
        </Link>

        <div className={styles.footer}>
          <span className={styles.price}>
            S/ {Number(product.price).toFixed(2)}
          </span>

          <div className={styles.actions}>
            <WishlistButton productId={product.id} />

            <Link
              to={`/products/${product.id}`}
              className={styles.viewButton}
            >
              Ver
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;