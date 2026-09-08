import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { processCheckout } from "../../store/cartSlice";
import styles from "./CartSummary.module.css";

function CartSummary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading } = useSelector((state) => state.cart);

  const total = items.reduce(
    (sum, item) => sum + Number(item.subtotal),
    0
  );

  const handleCheckout = async () => {
    const result = await dispatch(processCheckout());

    if (processCheckout.fulfilled.match(result)) {
      navigate("/checkout/success");
    }
  };

  return (
    <aside className={styles.summary}>
      <h2>Resumen del pedido</h2>

      <div className={styles.row}>
        <span>Productos</span>
        <span>{items.length}</span>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.total}>
        <span>Total</span>
        <strong>S/ {total.toFixed(2)}</strong>
      </div>

      <button
        type="button"
        className={styles.button}
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
      >
        {loading ? "Procesando..." : "Continuar al pago"}
      </button>
    </aside>
  );
}

export default CartSummary;