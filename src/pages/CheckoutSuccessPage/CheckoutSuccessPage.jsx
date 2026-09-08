import { Link, useLocation, Navigate } from "react-router-dom";

import styles from "./CheckoutSuccessPage.module.css";

function CheckoutSuccessPage() {
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/products" replace />;
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.icon}>
          ✓
        </div>

        <span className={styles.badge}>
          Pago simulado
        </span>

        <h1>¡Compra realizada!</h1>

        <p className={styles.description}>
          Tu pedido ha sido registrado correctamente.
          El pago ha sido simulado exitosamente.
        </p>

        <div className={styles.order}>
          <div>
            <span>Número de pedido</span>
            <strong>{order.orderId}</strong>
          </div>

          <div>
            <span>Total pagado</span>
            <strong>
              S/ {Number(order.total).toFixed(2)}
            </strong>
          </div>
        </div>

        <Link
          to="/products"
          className={styles.button}
        >
          Seguir comprando
        </Link>
      </section>
    </main>
  );
}

export default CheckoutSuccessPage;