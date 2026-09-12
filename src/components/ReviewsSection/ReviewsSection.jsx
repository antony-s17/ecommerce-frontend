import { useEffect, useState } from "react";

import {
  createReview,
  getReviews,
} from "../../api/reviews";

import styles from "./ReviewsSection.module.css";

function ReviewsSection({ productId }) {
  const [review, setReview] = useState(null);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  /* =========================
     CARGAR RESEÑA
  ========================= */

  const loadReview = async () => {
    if (!productId) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await getReviews(productId);

      if (response.ok) {
        setReview(response.data);
      }
    } catch (error) {
      /*
       * Si no existe una reseña todavía,
       * permitimos que el usuario cree una.
       */
      if (error.response?.status === 404) {
        setReview(null);
      } else {
        setError(
          error.response?.data?.message ||
            "No se pudo obtener la reseña."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReview();
  }, [productId]);

  /* =========================
     PUBLICAR RESEÑA
  ========================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (rating === 0) {
      setError(
        "Selecciona una calificación."
      );
      return;
    }

    if (!comment.trim()) {
      setError(
        "Escribe un comentario."
      );
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess("");

      const response = await createReview(
        productId,
        {
          rating,
          comment: comment.trim(),
        }
      );

      if (!response.ok) {
        setError(
          response.message ||
            "No se pudo publicar la reseña."
        );
        return;
      }

      setSuccess(
        "Reseña publicada correctamente."
      );

      setComment("");
      setRating(0);
      setHoverRating(0);

      /*
       * Recargamos la reseña para mostrarla
       * inmediatamente.
       */
      await loadReview();

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "No se pudo publicar la reseña."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.header}>
          <span className={styles.badge}>
            Reseñas
          </span>

          <h2>Tu opinión</h2>
        </div>

        <p className={styles.message}>
          Cargando reseña...
        </p>
      </section>
    );
  }

  /* =========================
     RESEÑA EXISTENTE
  ========================= */

  if (review) {
    return (
      <section className={styles.section}>
        <div className={styles.header}>
          <span className={styles.badge}>
            Reseñas
          </span>

          <h2>Tu reseña</h2>

          <p>
            Esta es tu opinión sobre este
            producto.
          </p>
        </div>

        <div className={styles.review}>
          <div
            className={styles.reviewStars}
            aria-label={`${review.rating} de 5 estrellas`}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= Number(review.rating)
                    ? styles.reviewStarActive
                    : styles.reviewStar
                }
              >
                ★
              </span>
            ))}

            <span className={styles.ratingValue}>
              {review.rating}/5
            </span>
          </div>

          <p>
            {review.comment}
          </p>
        </div>

        {success && (
          <div className={styles.success}>
            {success}
          </div>
        )}
      </section>
    );
  }

  /* =========================
     CREAR RESEÑA
  ========================= */

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>
          Reseñas
        </span>

        <h2>Escribe una reseña</h2>

        <p>
          Comparte tu experiencia con este
          producto.
        </p>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        {/* CALIFICACIÓN */}

        <div className={styles.field}>
          <label>
            Calificación
          </label>

          <div
            className={styles.rating}
            role="radiogroup"
            aria-label="Calificación del producto"
          >
            {[1, 2, 3, 4, 5].map(
              (star) => (
                <button
                  key={star}
                  type="button"
                  className={`${styles.starButton} ${
                    star <=
                    (hoverRating || rating)
                      ? styles.starActive
                      : ""
                  }`}
                  onClick={() =>
                    setRating(star)
                  }
                  onMouseEnter={() =>
                    setHoverRating(star)
                  }
                  onMouseLeave={() =>
                    setHoverRating(0)
                  }
                  aria-label={`${star} ${
                    star === 1
                      ? "estrella"
                      : "estrellas"
                  }`}
                  aria-pressed={
                    rating === star
                  }
                >
                  ★
                </button>
              )
            )}

            {rating > 0 && (
              <span
                className={
                  styles.ratingValue
                }
              >
                {rating}/5
              </span>
            )}
          </div>
        </div>

        {/* COMENTARIO */}

        <div className={styles.field}>
          <label htmlFor="comment">
            Comentario
          </label>

          <textarea
            id="comment"
            value={comment}
            onChange={(event) =>
              setComment(
                event.target.value
              )
            }
            placeholder="¿Qué te pareció el producto?"
            rows="5"
            maxLength="500"
          />

          <span
            className={
              styles.characterCount
            }
          >
            {comment.length}/500
          </span>
        </div>

        {/* ERROR */}

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className={styles.success}>
            {success}
          </div>
        )}

        <button
          type="submit"
          className={styles.button}
          disabled={submitting}
        >
          {submitting
            ? "Publicando..."
            : "Publicar reseña"}
        </button>
      </form>
    </section>
  );
}

export default ReviewsSection;