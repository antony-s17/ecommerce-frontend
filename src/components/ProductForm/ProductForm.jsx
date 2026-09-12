import { useEffect, useState } from "react";

import styles from "./ProductForm.module.css";

const initialForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
};

function ProductForm({
  product = null,
  onSubmit,
  onCancel,
  loading = false,
  error = null,
}) {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const isEditing = Boolean(product);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price ?? "",
        stock: product.stock ?? "",
      });

      setPreview(product.imageUrl || "");
      setImage(null);
    } else {
      setForm(initialForm);
      setPreview("");
      setImage(null);
    }
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImage(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit({
      ...form,
      image,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <div>
          <span className={styles.badge}>
            {isEditing ? "Editar videojuego" : "Nuevo videojuego"}
          </span>

          <h2>
            {isEditing
              ? "Editar producto"
              : "Agregar videojuego"}
          </h2>

          <p>
            {isEditing
              ? "Actualiza la información del videojuego."
              : "Agrega un nuevo videojuego al catálogo."}
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <label className={styles.imageLabel}>
            Imagen del producto
          </label>

          <div className={styles.preview}>
            {preview ? (
              <img
                src={preview}
                alt="Vista previa"
                className={styles.previewImage}
              />
            ) : (
              <div className={styles.emptyPreview}>
                <span>🎮</span>
                <p>Sin imagen</p>
              </div>
            )}
          </div>

          <label className={styles.fileButton}>
            {image ? "Cambiar imagen" : "Seleccionar imagen"}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>

          {image && (
            <span className={styles.fileName}>
              {image.name}
            </span>
          )}

          {isEditing && !image && product?.imageUrl && (
            <span className={styles.fileHint}>
              Se conservará la imagen actual.
            </span>
          )}
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="name">
              Nombre del videojuego
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ej. The Legend of Zelda"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="description">
              Descripción
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Describe el videojuego..."
              value={form.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="price">
                Precio
              </label>

              <div className={styles.inputWrapper}>
                <span>S/</span>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="stock">
                Stock
              </label>

              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading
            ? "Guardando..."
            : isEditing
              ? "Guardar cambios"
              : "Crear videojuego"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;