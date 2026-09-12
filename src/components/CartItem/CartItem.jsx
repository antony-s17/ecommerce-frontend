import styles from "./CartItem.module.css";

function CartItem({ item }) {
  return (
    <article className={styles.item}>
      <div className={styles.imageContainer}>
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className={styles.image}
          />
        ) : (
          <div className={styles.noImage}>
            🎮
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.productInfo}>
          <span className={styles.category}>
            Videojuego
          </span>

          <h2>{item.name}</h2>

          <span className={styles.unitPrice}>
            S/ {Number(item.price).toFixed(2)} c/u
          </span>
        </div>

        <div className={styles.details}>
          <span className={styles.quantity}>
            Cantidad:{" "}
            <strong>{item.quantity}</strong>
          </span>

          <div className={styles.subtotal}>
            <span>Subtotal</span>

            <strong>
              S/ {Number(item.subtotal).toFixed(2)}
            </strong>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CartItem;