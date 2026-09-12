import { useDispatch, useSelector } from "react-redux";

import { processCheckout } from "../../store/cartSlice";

import styles from "./CartSummary.module.css";

function CartSummary() {
  const dispatch = useDispatch();

  const {
    items,
    loading,
    error,
  } = useSelector((state) => state.cart);

  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.subtotal),
    0
  );

  const totalItems = items.reduce(
    (total, item) =>
      total + Number(item.quantity),
    0
  );

  const handleCheckout = async () => {
    const result = await dispatch(
      processCheckout()
    );

    if (
      processCheckout.fulfilled.match(result)
    ) {
      const { url } = result.payload;

      if (url) {
        window.location.href = url;
      }
    }
  };

  return (
    <aside className={styles.summary}>
      <h2>Resumen</h2>

      <div className={styles.row}>
        <span>Productos</span>
        <strong>{totalItems}</strong>
      </div>

      <div className={styles.row}>
        <span>Subtotal</span>

        <strong>
          S/ {subtotal.toFixed(2)}
        </strong>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.total}>
        <span>Total</span>

        <strong>
          S/ {subtotal.toFixed(2)}
        </strong>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <button
        type="button"
        className={styles.button}
        onClick={handleCheckout}
        disabled={
          loading ||
          items.length === 0
        }
      >
        {loading
          ? "Redirigiendo a Stripe..."
          : "Pagar con Stripe"}
      </button>

      <p className={styles.paymentInfo}>
        Pago procesado con Stripe en modo test.
        No se realizará ningún cobro real.
      </p>
    </aside>
  );
}

export default CartSummary;