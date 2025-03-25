"use client";
import React from "react";
import { useState } from "react";
import { AlertCircle, CheckCircle2, Star, X } from "lucide-react";

export default function avaliations() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Por favor, selecione uma classificação por estrelas antes de enviar sua avaliação."
  );
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    // Validate rating
    if (rating === 0) {
      setShowError(true);
      return;
    }

    // Start submission
    setSubmitting(true);

    try {
      // Prepare review data
      const reviewData = {
        num_estrelas: Number(rating),
        comentario: comment,
      };

      const token = localStorage.getItem("accessToken") as string;
      console.log("Token:", token);
      // Submit to backend using POST request
      const response = await fetch(
        "http://localhost:5001/api/avaliacoes?id=f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        // Handle error response
        const errorData = await response.json();
        throw new Error(response.statusText);
      }

      // Handle success
      const result = await response.json();
      console.log("Review submitted successfully:", result);

      // Show success message
      setShowSuccess(true);

      // Reset form
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao enviar sua avaliação. Tente novamente."
      );
      setShowError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Main Content */}
      <main className="flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-[#e0e0e0]">
          <h1 className="mb-6 text-xl font-semibold text-center text-[#1d1b20]">
            Avalie Sua Estadia
          </h1>

          {/* Star Rating */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1"
              >
                <Star
                  size={32}
                  className={`${
                    (hoveredRating || rating) >= star
                      ? "fill-[#1976d2] text-[#1976d2]"
                      : "fill-[#d9d9d9] text-[#d9d9d9]"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          {/* Comment Section */}
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block mb-2 text-sm text-[#505050]"
            >
              Deixe um comentário (Opcional)
            </label>
            <input
              id="comment"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comentário"
              className="w-full p-3 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1976d2]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className={`w-full py-3 text-white ${
              submitting
                ? "bg-[#1976d2]/70 cursor-not-allowed"
                : "bg-[#1976d2] hover:bg-[#1976d2]/90"
            } rounded-md transition-colors flex justify-center items-center`}
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enviando...
              </>
            ) : (
              "Enviar"
            )}
          </button>
        </div>
      </main>

      {/* Error Popup */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="relative w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={() => setShowError(false)}
              className="absolute top-3 right-3 text-[#505050] hover:text-black"
            >
              <X size={20} />
              <span className="sr-only">Fechar</span>
            </button>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-red-100">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>

              <h3 className="mb-2 text-lg font-medium text-[#1d1b20]">
                Avaliação necessária
              </h3>

              <p className="mb-4 text-center text-[#505050]">{errorMessage}</p>

              <button
                onClick={() => setShowError(false)}
                className="px-4 py-2 text-white bg-[#1976d2] rounded-md hover:bg-[#1976d2]/90 transition-colors"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="relative w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-3 right-3 text-[#505050] hover:text-black"
            >
              <X size={20} />
              <span className="sr-only">Fechar</span>
            </button>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-green-100">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>

              <h3 className="mb-2 text-lg font-medium text-[#1d1b20]">
                Avaliação enviada
              </h3>

              <p className="mb-4 text-center text-[#505050]">
                Obrigado por compartilhar sua opinião! Sua avaliação foi enviada
                com sucesso.
              </p>

              <button
                onClick={() => setShowSuccess(false)}
                className="px-4 py-2 text-white bg-[#1976d2] rounded-md hover:bg-[#1976d2]/90 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
