import { useSelector } from "react-redux";

import styles from "./AdminPage.module.css";

function AdminPage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <span className={styles.badge}>
          Panel administrativo
        </span>

        <h1>
          Bienvenido, {user?.name}
        </h1>

        <p>
          Desde aquí podrás administrar los productos
          de Pixel Market.
        </p>

        <div className={styles.cards}>
          <div className={styles.card}>
            <span className={styles.icon}>📦</span>

            <div>
              <h2>Productos</h2>
              <p>
                Crear, editar y eliminar productos.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <span className={styles.icon}>📊</span>

            <div>
              <h2>Pedidos</h2>
              <p>
                Gestionar los pedidos de la tienda.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdminPage;