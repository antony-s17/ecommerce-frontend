import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../store/productsSlice";

import ProductCard from "../../components/ProductCard/ProductCard";

import styles from "./ProductPage.module.css";

function ProductsPage() {
  const dispatch = useDispatch();

  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>
              Nuestra colección
            </span>

            <h1>Productos</h1>

            <p>
              Encuentra productos que se adapten
              a tu estilo.
            </p>
          </div>

          {!loading && products.length > 0 && (
            <span className={styles.count}>
              {products.length} productos
            </span>
          )}
        </div>

        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>

            <p>Cargando productos...</p>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <h2>No pudimos cargar los productos</h2>

            <p>{error}</p>

            <button
              onClick={() => dispatch(fetchProducts())}
            >
              Intentar nuevamente
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          products.length === 0 && (
            <div className={styles.empty}>
              <span>📦</span>

              <h2>No hay productos</h2>

              <p>
                Todavía no existen productos
                disponibles.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          products.length > 0 && (
            <div className={styles.grid}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
      </section>
    </main>
  );
}

export default ProductsPage;