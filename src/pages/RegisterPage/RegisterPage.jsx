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
    name: "",
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
            <label htmlFor="name">
              Nombre
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Tu nombre"
              value={form.name}
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