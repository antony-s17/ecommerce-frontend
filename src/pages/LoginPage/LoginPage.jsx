import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../../store/authSlice";

import styles from "./LoginPage.module.css";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(login(form));

    if (login.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>P</div>

          <h1>Bienvenido</h1>

          <p>
            Inicia sesión para continuar con tu cuenta.
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label htmlFor="email">
              Correo electrónico
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <div className={styles.passwordHeader}>
              <label htmlFor="password">
                Contraseña
              </label>

              <a href="#" className={styles.forgot}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <div className={styles.register}>
          <span>¿No tienes una cuenta?</span>

          <Link to="/register">
            Crear cuenta
          </Link>
        </div>
      </section>

      <section className={styles.decoration}>
        <div className={styles.circle}></div>

        <div className={styles.decorationContent}>
          <span className={styles.badge}>
            ✦ Tu tienda, tu experiencia
          </span>

          <h2>
            Descubre productos
            <br />
            que te encantan.
          </h2>

          <p>
            Explora nuestro catálogo y encuentra
            tus próximos productos favoritos.
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;