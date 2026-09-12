import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./AdminRoute.module.css";

function AdminRoute() {
  const {
    user,
    isAuthenticated,
    loading,
  } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>

          <p className={styles.loadingText}>
            Verificando permisos...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (user?.role !== "ADMIN") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
}

export default AdminRoute;