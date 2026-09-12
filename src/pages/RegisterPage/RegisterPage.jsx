import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../store/authSlice";

import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(registerUser(form));

    if (registerUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>P</div>

          <h1>Crear cuenta</h1>

          <p>
            Regístrate para comenzar a comprar.
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label htmlFor="username">
              Nombre de usuario
            </label>

            <input
              id="username"
              name="username"
              type="text"
              placeholder="Tu nombre de usuario"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

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
            <label htmlFor="password">
              Contraseña
            </label>

            <div className={styles.passwordContainer}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                aria-label={
                  showPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24">
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                    <path d="M9.9 4.2A10.7 10.7 0 0112 4c5 0 9 4 10 8a13.2 13.2 0 01-2 4" />
                    <path d="M6.6 6.6A13.5 13.5 0 002 12c1 4 5 8 10 8a10.5 10.5 0 005.4-1.5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
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
            {loading
              ? "Creando cuenta..."
              : "Crear cuenta"}
          </button>
        </form>

        <div className={styles.login}>
          <span>¿Ya tienes una cuenta?</span>

          <Link to="/login">
            Iniciar sesión
          </Link>
        </div>
      </section>

      <section className={styles.decoration}>
        <div className={styles.circle}></div>

        <div className={styles.decorationContent}>
          <span className={styles.badge}>
            ✦ Empieza ahora
          </span>

          <h2>
            Todo lo que buscas,
            <br />
            en un solo lugar.
          </h2>

          <p>
            Crea tu cuenta y disfruta de una
            experiencia de compra sencilla y rápida.
          </p>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;