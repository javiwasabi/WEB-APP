import { useState, useEffect } from "react";
import { Heart, MapPin } from "lucide-react";

interface Job {
  id: number;
  nombre: string;
  detalle: string;
  empresa: string;
  ubicacion: string;
  salario: string;
  destacado: boolean;
  tipo: string;
}

const ITEMS_PER_PAGE = 5;
const API_URL = "http://localhost:7071/api/GetJson";
const FILTER_OPTIONS = ["Full-time", "Freelance", "Remote", "Hybrid"];

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
        if (!response.ok) throw new Error("Error al obtener datos");
        
        const data = await response.json();
        setJobs(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [currentPage]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const filteredJobs = jobs.filter((job) =>
    selectedFilters.length === 0 || selectedFilters.includes(job.tipo)
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 min-h-screen rounded-full">
      <div className="flex flex-wrap gap-3 mb-6">
        {FILTER_OPTIONS.map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
              selectedFilters.includes(filter) ? "bg-yellow-400 text-gray-900" : "bg-white text-gray-800 border-gray-300"
            }`}
          >
            {filter} ✖
          </button>
        ))}
        {selectedFilters.length > 0 && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium"
          >
            Borrar filtros
          </button>
        )}
      </div>
      
      {loading ? (
        <p className="text-center text-lg">Cargando empleos...</p>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-800">{job.nombre}</h3>
                  <button onClick={() => toggleFavorite(job.id)}>
                    <Heart size={24} className={favorites.includes(job.id) ? "text-red-500 fill-red-500" : "text-gray-400"} />
                  </button>
                </div>
                <p className="text-gray-500 text-sm">{job.empresa}</p>
                <div className="flex items-center text-gray-600 mt-2">
                  <MapPin size={16} />
                  <span className="ml-1">{job.ubicacion}</span>
                </div>
                <p className="text-gray-600 text-lg">{job.detalle}</p>
                <span className="text-sm font-medium bg-gray-200 px-3 py-1 rounded-full w-fit">{job.tipo}</span>
              </div>
              <div className="mt-6 flex justify-end">
              <button className="px-6 py-3 border-2 border-[#EAD86A] text-[#EAD86A] font-semibold rounded-lg bg-white transition-all duration-300 hover:bg-[#EAD86A] hover:text-white">
                Ver más
              </button>

              </div>
            </div>
          ))}
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-5 py-3 rounded-lg font-semibold text-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#EAD86A] hover:bg-yellow-500 text-gray-900"}`}
          >
            Anterior
          </button>

          <span className="text-lg font-medium text-gray-800">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-5 py-3 rounded-lg font-semibold text-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-[#EAD86A] hover:bg-yellow-500 text-gray-900"}`}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
