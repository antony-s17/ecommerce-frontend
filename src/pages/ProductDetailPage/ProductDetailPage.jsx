import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getProductById } from "../../api/products";
import { addProductToCart } from "../../store/cartSlice";
import { addProductToWishlist } from "../../store/wishlistSlice";

import styles from "./ProductDetailPage.module.css";

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { loading: cartLoading } = useSelector((state) => state.cart);
  const { loading: wishlistLoading } = useSelector(
    (state) => state.wishlist
  );

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getProductById(id);

        if (!response.ok) {
          setError(response.message);
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

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    dispatch(addProductToCart(product.id));
  };

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    dispatch(addProductToWishlist(product.id));
  };

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.message}>
          <div className={styles.spinner}></div>
          <p>Cargando producto...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className={styles.page}>
        <div className={styles.error}>
          <span>⚠️</span>
          <h1>No encontramos el producto</h1>
          <p>{error || "El producto no existe."}</p>
          <Link to="/products" className={styles.backButton}>
            Volver a productos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <Link to="/products" className={styles.back}>
          ← Volver a productos
        </Link>

        <div className={styles.product}>
          <div className={styles.imageContainer}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
            />
          </div>

          <div className={styles.info}>
            <span className={styles.category}>
              {product.category?.name || "Producto"}
            </span>

            <h1>{product.name}</h1>

            <div className={styles.price}>
              S/ {Number(product.price).toFixed(2)}
            </div>

            <p className={styles.description}>
              {product.description ||
                "Este producto no tiene una descripción disponible."}
            </p>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cartButton}
                onClick={handleAddToCart}
                disabled={cartLoading}
              >
                {cartLoading
                  ? "Agregando..."
                  : "Agregar al carrito"}
              </button>

              <button
                type="button"
                className={styles.wishlistButton}
                onClick={handleAddToWishlist}
                disabled={wishlistLoading}
              >
                {wishlistLoading
                  ? "Guardando..."
                  : "♡ Agregar a favoritos"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetailPage;