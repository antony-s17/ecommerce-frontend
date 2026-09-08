import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/authSlice";

import styles from "./Navbar.module.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const handleLogout = async () => {
    const result = await dispatch(logout());

    if (logout.fulfilled.match(result)) {
      setMenuOpen(false);
      navigate("/login");
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {/* Logo */}
        <Link
          to="/"
          className={styles.logo}
          onClick={closeMenu}
        >
          <span className={styles.logoIcon}>P</span>

          <span>Pixel Market</span>
        </Link>

        {/* Navegación principal */}
        <div
          className={`${styles.navLinks} ${
            menuOpen ? styles.navLinksOpen : ""
          }`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.navLink} ${
                isActive ? styles.active : ""
              }`
            }
            onClick={closeMenu}
          >
            Inicio
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${styles.navLink} ${
                isActive ? styles.active : ""
              }`
            }
            onClick={closeMenu}
          >
            Productos
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `${styles.navLink} ${
                    isActive ? styles.active : ""
                  }`
                }
                onClick={closeMenu}
              >
                Favoritos

                {wishlistItems.length > 0 && (
                  <span className={styles.badge}>
                    {wishlistItems.length}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `${styles.navLink} ${
                    isActive ? styles.active : ""
                  }`
                }
                onClick={closeMenu}
              >
                Carrito

                {cartItems.length > 0 && (
                  <span className={styles.badge}>
                    {cartItems.length}
                  </span>
                )}
              </NavLink>
            </>
          )}

          {/* Acciones */}
          <div className={styles.actions}>
            {isAuthenticated ? (
              <>
                <div className={styles.user}>
                  <div className={styles.avatar}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>

                  <span className={styles.userName}>
                    {user?.name}
                  </span>
                </div>

                {user?.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    className={styles.adminButton}
                    onClick={closeMenu}
                  >
                    Administración
                  </Link>
                )}

                <button
                  type="button"
                  className={styles.logoutButton}
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading
                    ? "Saliendo..."
                    : "Cerrar sesión"}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={styles.loginButton}
                  onClick={closeMenu}
                >
                  Iniciar sesión
                </Link>

                <Link
                  to="/register"
                  className={styles.registerButton}
                  onClick={closeMenu}
                >
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;