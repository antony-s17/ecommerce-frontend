import { useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { logoutUser } from "../../store/authSlice";
import { clearCart } from "../../store/cartSlice";
import { clearWishlist } from "../../store/wishlistSlice";

import styles from "./Navbar.module.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const {
    user,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  const {
    items: cartItems,
  } = useSelector((state) => state.cart);

  const {
    items: wishlistItems,
  } = useSelector((state) => state.wishlist);

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  const wishlistCount =
    wishlistItems.length;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    const result = await dispatch(
      logoutUser()
    );

    if (
      logoutUser.fulfilled.match(result)
    ) {
      dispatch(clearCart());
      dispatch(clearWishlist());

      closeMenu();

      navigate("/login");
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link
          to="/"
          className={styles.logo}
          onClick={closeMenu}
        >
          <span className={styles.logoIcon}>
            🎮
          </span>

          <span>
            Pixel Market
          </span>
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() =>
            setMenuOpen((value) => !value)
          }
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div
          className={`${styles.menu} ${
            menuOpen ? styles.menuOpen : ""
          }`}
        >
          <div className={styles.links}>
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? styles.active
                  : styles.link
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/products"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? styles.active
                  : styles.link
              }
            >
              Productos
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink
                  to="/wishlist"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? styles.active
                      : styles.link
                  }
                >
                  Favoritos

                  {wishlistCount > 0 && (
                    <span
                      className={styles.counter}
                    >
                      {wishlistCount}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/cart"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? styles.active
                      : styles.link
                  }
                >
                  Carrito

                  {cartCount > 0 && (
                    <span
                      className={styles.counter}
                    >
                      {cartCount}
                    </span>
                  )}
                </NavLink>

                {user?.role === "ADMIN" && (
                  <NavLink
                    to="/admin"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      isActive
                        ? styles.active
                        : styles.link
                    }
                  >
                    Admin
                  </NavLink>
                )}
              </>
            )}
          </div>

          <div className={styles.userSection}>
            {isAuthenticated ? (
              <>
                <div className={styles.user}>
                  <div
                    className={styles.avatar}
                  >
                    {user?.username
                      ?.charAt(0)
                      .toUpperCase() || "U"}
                  </div>

                  <div
                    className={styles.userInfo}
                  >
                    <strong>
                      {user?.username || "Usuario"}
                    </strong>

                    <span>
                      {user?.role === "ADMIN"
                        ? "Administrador"
                        : "Cliente"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className={
                    styles.logoutButton
                  }
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <div
                className={
                  styles.authButtons
                }
              >
                <Link
                  to="/login"
                  className={
                    styles.loginButton
                  }
                  onClick={closeMenu}
                >
                  Iniciar sesión
                </Link>

                <Link
                  to="/register"
                  className={
                    styles.registerButton
                  }
                  onClick={closeMenu}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;