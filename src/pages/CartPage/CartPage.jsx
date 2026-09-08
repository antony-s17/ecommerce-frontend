import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
          <div className={styles.spinner}></div>
          <p>Cargando carrito...</p>
        </div>
      </main>
    );
  }

  if (error && items.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>
          <span>🛒</span>
          <h1>Tu carrito está vacío</h1>
          <p>{error}</p>

          <Link to="/products" className={styles.button}>
            Explorar productos
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>
          <span>🛒</span>
          <h1>Tu carrito está vacío</h1>
          <p>Agrega algunos productos para comenzar.</p>

          <Link to="/products" className={styles.button}>
            Explorar productos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Tu compra</span>
            <h1>Carrito</h1>
            <p>Revisa los productos que has seleccionado.</p>
          </div>

          <span className={styles.count}>
            {items.length} productos
          </span>
        </div>

        <div className={styles.content}>
          <div className={styles.items}>
            {items.map((item) => (
              <CartItem
                key={item.id || item.product.id}
                item={item}
              />
            ))}
          </div>

          <CartSummary />
        </div>
      </section>
    </main>
  );
}

export default CartPage;