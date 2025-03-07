import React from "react";
import JobList from "../../Components/listedjobs";

const Landing = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="relative text-white py-16 ">
        <img
          src="/fondo.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover "
        />

        <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold">Encuentra el Trabajo Ideal</h1>
          <p className="mt-2 text-lg">Postúlate a miles de empleos en segundos.</p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-12 text-center">
        <p className="mt-4 text-gray-600 text-lg">
          Descubre empleos en diferentes áreas y encuentra el que mejor se adapte a tu perfil.
        </p>
        <button className="mt-6 px-6 py-3 border-2 border-[#EAD86A] text-[#EAD86A] font-semibold rounded-lg bg-white transition-all duration-300 hover:bg-[#EAD86A] hover:text-white">
          Explorar Empleos
        </button>
      </section>

      {/* Lista de empleos */}
      <section className="max-w-5xl mx-auto px-6 py-6">
        <JobList />
      </section>
    </main>
  );
};

export default Landing;
