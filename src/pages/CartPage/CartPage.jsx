import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchCart } from "../../store/cartSlice";

import CartItem from "../../components/CartItem/CartItem";
import CartSummary from "../../components/CartSummary/CartSummary";

import styles from "./CartPage.module.css";

function CartPage() {
  const dispatch = useDispatch();

  const {
    items,
    loading,
    error,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading && items.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.message}>
          Cargando carrito...
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
              Mi carrito
            </span>

            <h1>Carrito de compras</h1>

            <p>
              Revisa tus videojuegos antes de continuar
              con la compra.
            </p>
          </div>

          <span className={styles.counter}>
            {items.reduce(
              (total, item) =>
                total + Number(item.quantity),
              0
            )}{" "}
            productos
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
                🛒
              </div>

              <h2>Tu carrito está vacío</h2>

              <p>
                Agrega videojuegos desde nuestro catálogo.
              </p>

              <Link
                to="/products"
                className={styles.button}
              >
                Ver videojuegos
              </Link>
            </div>
          )}

        {items.length > 0 && (
          <div className={styles.content}>
            <div className={styles.items}>
              {items.map((item) => (
                <CartItem
                  key={item.id || item.productId}
                  item={item}
                />
              ))}
            </div>

            <CartSummary />
          </div>
        )}
      </section>
    </main>
  );
}

export default CartPage;