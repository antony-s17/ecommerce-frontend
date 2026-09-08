import styles from "./CartItem.module.css";

function CartItem({ item }) {
  return (
    <article className={styles.item}>
      <div className={styles.imageContainer}>
        <img
          src={item.product.image}
          alt={item.product.name}
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <div>
          <span className={styles.category}>
            {item.product.category?.name || "Producto"}
          </span>

          <h2>{item.product.name}</h2>
        </div>

        <div className={styles.details}>
          <span>
            Cantidad: <strong>{item.quantity}</strong>
          </span>

          <span className={styles.price}>
            S/ {Number(item.subtotal).toFixed(2)}
          </span>
        </div>
      </div>
    </article>
  );
}

export default CartItem;