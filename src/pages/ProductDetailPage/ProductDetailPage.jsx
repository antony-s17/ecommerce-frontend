import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { getProductById } from "../../api/products";
import { addProductToCart } from "../../store/cartSlice";
import { addProductToWishlist } from "../../store/wishlistSlice";

import ReviewsSection from "../../components/ReviewsSection/ReviewsSection";

import styles from "./ProductDetailPage.module.css";

function ProductDetailPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const { loading: cartLoading } = useSelector(
    (state) => state.cart
  );

  const { loading: wishlistLoading } = useSelector(
    (state) => state.wishlist
  );

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================
     CARGAR PRODUCTO
  ========================= */

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getProductById(id);

        if (!response.ok) {
          setError(
            response.message ||
              "No se pudo obtener el producto"
          );

          return;
        }

        setProduct(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "No se pudo obtener el producto"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  /* =========================
     AGREGAR AL CARRITO
  ========================= */

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    await dispatch(
      addProductToCart(id)
    );
  };

  /* =========================
     AGREGAR A FAVORITOS
  ========================= */

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    await dispatch(
      addProductToWishlist(id)
    );
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.message}>
          Cargando producto...
        </div>
      </main>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error || !product) {
    return (
      <main className={styles.page}>
        <div className={styles.message}>
          {error || "Producto no encontrado"}
        </div>
      </main>
    );
  }

  /* =========================
     PRODUCTO
  ========================= */

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <Link
          to="/products"
          className={styles.back}
        >
          ← Volver a productos
        </Link>

        <div className={styles.product}>
          {/* IMAGEN */}

          <div className={styles.imageContainer}>
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className={styles.image}
              />
            ) : (
              <div className={styles.noImage}>
                🎮
              </div>
            )}
          </div>

          {/* INFORMACIÓN */}

          <div className={styles.info}>
            <span className={styles.category}>
              Videojuego
            </span>

            <h1>
              {product.name}
            </h1>

            <div className={styles.price}>
              S/{" "}
              {Number(
                product.price
              ).toFixed(2)}
            </div>

            <p className={styles.description}>
              {product.description ||
                "Este producto no tiene una descripción disponible."}
            </p>

            {/* STOCK */}

            <div className={styles.stock}>
              {Number(product.stock) > 0 ? (
                <span>
                  Stock disponible:{" "}
                  <strong>
                    {product.stock}
                  </strong>
                </span>
              ) : (
                <span
                  className={
                    styles.outOfStock
                  }
                >
                  Sin stock
                </span>
              )}
            </div>

            {/* ACCIONES */}

            <div className={styles.actions}>
              <button
                type="button"
                className={
                  styles.cartButton
                }
                onClick={
                  handleAddToCart
                }
                disabled={
                  cartLoading ||
                  Number(product.stock) <= 0
                }
              >
                {cartLoading
                  ? "Agregando..."
                  : "Agregar al carrito"}
              </button>

              <button
                type="button"
                className={
                  styles.wishlistButton
                }
                onClick={
                  handleAddToWishlist
                }
                disabled={
                  wishlistLoading
                }
              >
                {wishlistLoading
                  ? "Agregando..."
                  : "♡ Agregar a favoritos"}
              </button>
            </div>
          </div>
        </div>

        {/* =====================
            RESEÑAS
        ===================== */}

        {isAuthenticated && id && (
          <ReviewsSection
            productId={id}
          />
        )}
      </section>
    </main>
  );
}

export default ProductDetailPage;