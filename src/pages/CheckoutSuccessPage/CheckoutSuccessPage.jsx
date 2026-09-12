import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useSearchParams,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import { confirmCheckout } from "../../api/cart";
import { clearCart } from "../../store/cartSlice";

import styles from "./CheckoutSuccessPage.module.css";

function CheckoutSuccessPage() {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const sessionId =
    searchParams.get("session_id");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response =
          await confirmCheckout(sessionId);

        if (!response.ok) {
          setError(
            response.message ||
              "No se pudo confirmar el pago."
          );

          return;
        }

        setOrder(response.data);

        /*
         * Stripe confirmó el pago y el backend
         * ya creó la orden.
         */
        dispatch(clearCart());

      } catch (error) {
        setError(
          error.response?.data?.message ||
            "No se pudo confirmar el pago."
        );
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [sessionId, dispatch]);

  /*
   * Si alguien entra manualmente a
   * /checkout/success sin session_id.
   */
  if (!sessionId) {
    return (
      <Navigate
        to="/products"
        replace
      />
    );
  }

  if (loading) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <div className={styles.spinner}></div>

          <h1>Confirmando pago...</h1>

          <p className={styles.description}>
            Estamos verificando tu pago
            con Stripe.
          </p>
        </section>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <div className={styles.errorIcon}>
            !
          </div>

          <span className={styles.badge}>
            Pago no confirmado
          </span>

          <h1>
            No pudimos confirmar tu compra
          </h1>

          <p className={styles.description}>
            {error ||
              "Ocurrió un problema al validar el pago."}
          </p>

          <Link
            to="/cart"
            className={styles.button}
          >
            Volver al carrito
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.icon}>
          ✓
        </div>

        <span className={styles.badge}>
          Pago confirmado
        </span>

        <h1>
          ¡Compra realizada!
        </h1>

        <p className={styles.description}>
          Tu pago fue confirmado por Stripe
          y tu pedido fue registrado
          correctamente.
        </p>

        <div className={styles.order}>
          <div>
            <span>
              Número de pedido
            </span>

            <strong>
              {order.orderId}
            </strong>
          </div>

          <div>
            <span>
              Total pagado
            </span>

            <strong>
              S/{" "}
              {Number(
                order.total
              ).toFixed(2)}
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