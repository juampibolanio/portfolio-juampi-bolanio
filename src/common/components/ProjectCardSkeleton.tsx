// Un componente que imita la forma de tu ProjectCard pero en gris y parpadeando
export const ProjectCardSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 animate-pulse">
      {/* Rectángulo para la imagen */}
      <div className="w-full md:w-1/2 h-64 bg-slate-700/50 rounded-xl"></div>
      
      {/* Contenedor de textos */}
      <div className="flex flex-col justify-between w-full md:w-1/2 py-2">
        <div>
          {/* Título fantasma */}
          <div className="h-8 bg-slate-700/50 rounded w-3/4 mb-4"></div>
          {/* Líneas de descripción fantasmas */}
          <div className="h-4 bg-slate-700/50 rounded w-full mb-2"></div>
          <div className="h-4 bg-slate-700/50 rounded w-5/6 mb-6"></div>
        </div>
        
        {/* Píldoras de tecnologías fantasmas */}
        <div className="flex gap-2">
          <div className="h-6 bg-slate-700/50 rounded-full w-16"></div>
          <div className="h-6 bg-slate-700/50 rounded-full w-20"></div>
          <div className="h-6 bg-slate-700/50 rounded-full w-14"></div>
        </div>
      </div>
    </div>
  );
};