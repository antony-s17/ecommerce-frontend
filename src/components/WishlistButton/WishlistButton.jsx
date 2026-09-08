import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../store/wishlistSlice";

import styles from "./WishlistButton.module.css";

function WishlistButton({ productId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items, loading } = useSelector((state) => state.wishlist);

  const isFavorite = items.some((item) => {
    return item.productId === productId || item.id === productId;
  });

  const handleClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (isFavorite) {
      dispatch(removeProductFromWishlist(productId));
    } else {
      dispatch(addProductToWishlist(productId));
    }
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${
        isFavorite ? styles.active : ""
      }`}
      onClick={handleClick}
      disabled={loading}
      aria-label={
        isFavorite
          ? "Eliminar de favoritos"
          : "Agregar a favoritos"
      }
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}

export default WishlistButton;