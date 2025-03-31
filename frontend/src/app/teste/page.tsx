import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function FetchButton() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/pf/${user?.id}`);
      const data = await response.json();
      console.log("PF:", data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={fetchData}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Carregando..." : "Buscar PF"}
      </button>
    </div>
  );
}
