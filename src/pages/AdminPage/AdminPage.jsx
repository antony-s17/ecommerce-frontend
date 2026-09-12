import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/products";

import { fetchProducts } from "../../store/productsSlice";

import ProductForm from "../../components/ProductForm/ProductForm";

import styles from "./AdminPage.module.css";

function AdminPage() {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const { user } = useSelector((state) => state.auth);

  const {
    items,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCreate = () => {
    setSelectedProduct(null);
    setFormError(null);
    setSuccessMessage("");
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormError(null);
    setSuccessMessage("");
    setShowForm(true);
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setFormError(null);
    setShowForm(false);
  };

  const handleSubmit = async (formData) => {
    try {
      setFormLoading(true);
      setFormError(null);
      setSuccessMessage("");

      const {
        name,
        description,
        price,
        stock,
        image,
      } = formData;

      let response;

      if (selectedProduct) {
        response = await updateProduct(
          selectedProduct.id,
          {
            data: {
              name,
              description,
              price,
              stock,
            },
            image,
          }
        );
      } else {
        response = await createProduct({
          product: {
            name,
            description,
            price,
            stock,
          },
          image,
        });
      }

      if (!response.ok) {
        setFormError(
          response.message ||
            "No se pudo guardar el producto."
        );
        return;
      }

      setSuccessMessage(
        selectedProduct
          ? "Producto actualizado correctamente."
          : "Producto creado correctamente."
      );

      setSelectedProduct(null);
      setShowForm(false);

      await dispatch(fetchProducts());
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
          "Ocurrió un error al guardar el producto."
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(product.id);
      setSuccessMessage("");

      const response = await deleteProduct(product.id);

      if (!response.ok) {
        alert(
          response.message ||
            "No se pudo eliminar el producto."
        );
        return;
      }

      setSuccessMessage(
        "Producto eliminado correctamente."
      );

      await dispatch(fetchProducts());
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Ocurrió un error al eliminar el producto."
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  if (showForm) {
    return (
      <main className={styles.page}>
        <section className={styles.container}>
          <ProductForm
            product={selectedProduct}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={formLoading}
            error={formError}
          />
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>
              Panel administrativo
            </span>

            <h1>Gestión de productos</h1>

            <p>
              Hola, {user?.name}. Administra el catálogo
              de Pixel Market.
            </p>
          </div>

          <button
            type="button"
            className={styles.addButton}
            onClick={handleCreate}
          >
            + Nuevo producto
          </button>
        </div>

        {/* MENSAJE DE ÉXITO */}
        {successMessage && (
          <div className={styles.success}>
            {successMessage}
          </div>
        )}

        {/* ESTADÍSTICAS */}
        <section className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>
              🎮
            </span>

            <div>
              <span>Productos</span>
              <strong>{items.length}</strong>
            </div>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statIcon}>
              🛒
            </span>

            <div>
              <span>Catálogo</span>
              <strong>Gaming</strong>
            </div>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statIcon}>
              👤
            </span>

            <div>
              <span>Administrador</span>
              <strong>ADMIN</strong>
            </div>
          </div>
        </section>

        {/* PRODUCTOS */}
        <section className={styles.productsCard}>
          <div className={styles.productsHeader}>
            <div>
              <h2>Productos</h2>

              <p>
                Videojuegos y productos disponibles
                en la tienda.
              </p>
            </div>
          </div>

          {loading && (
            <div className={styles.message}>
              Cargando productos...
            </div>
          )}

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            items.length === 0 && (
              <div className={styles.message}>
                No hay productos registrados.
              </div>
            )}

          {!loading &&
            !error &&
            items.length > 0 && (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((product) => (
                      <tr key={product.id}>
                        {/* PRODUCTO */}
                        <td>
                          <div className={styles.product}>
                            <div
                              className={
                                styles.imageContainer
                              }
                            >
                              {product.imageUrl ? (
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className={styles.image}
                                />
                              ) : (
                                <span>🎮</span>
                              )}
                            </div>

                            <div>
                              <strong>
                                {product.name}
                              </strong>

                              <span>
                                {product.category?.name ||
                                  "Videojuego"}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* PRECIO */}
                        <td>
                          S/{" "}
                          {Number(
                            product.price
                          ).toFixed(2)}
                        </td>

                        {/* STOCK */}
                        <td>
                          {product.stock}
                        </td>

                        {/* ACCIONES */}
                        <td>
                          <div className={styles.actions}>
                            {/* EDITAR */}
                            <button
                              type="button"
                              className={
                                styles.editButton
                              }
                              onClick={() =>
                                handleEdit(product)
                              }
                              disabled={
                                deleteLoading ===
                                product.id
                              }
                              title="Editar producto"
                              aria-label={`Editar ${product.name}`}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  d="M12 20h9"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />

                                <path
                                  d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>

                            {/* ELIMINAR */}
                            <button
                              type="button"
                              className={
                                styles.deleteButton
                              }
                              onClick={() =>
                                handleDelete(product)
                              }
                              disabled={
                                deleteLoading ===
                                product.id
                              }
                              title="Eliminar producto"
                              aria-label={`Eliminar ${product.name}`}
                            >
                              {deleteLoading ===
                              product.id ? (
                                <span
                                  className={
                                    styles.deleteSpinner
                                  }
                                />
                              ) : (
                                <svg
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M3 6h18"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />

                                  <path
                                    d="M8 6V4h8v2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />

                                  <path
                                    d="M19 6l-1 14H6L5 6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />

                                  <path
                                    d="M10 11v5M14 11v5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </section>
      </section>
    </main>
  );
}

export default AdminPage;