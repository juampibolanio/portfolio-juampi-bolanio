import { FaEye, FaFolderOpen, FaMousePointer, FaCodeBranch } from "react-icons/fa";

export default function MetricCards() {
  const metrics = [
    { title: "Visitas Totales", value: "1,240", change: "+12% este mes", icon: <FaEye />, color: "text-blue-400" },
    { title: "Clics en Proyectos", value: "348", change: "+8% esta semana", icon: <FaMousePointer />, color: "text-primary" },
    { title: "Proyectos Activos", value: "8", change: "2 destacados", icon: <FaFolderOpen />, color: "text-emerald-400" },
    { title: "Tecnologías", value: "15", change: "Catálogo completo", icon: <FaCodeBranch />, color: "text-amber-400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((item, index) => (
        <div key={index} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between shadow-xl">
          <div className="flex justify-between items-start">
            <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">
              {item.title}
            </span>
            <span className={`p-3 bg-slate-950 rounded-xl border border-slate-800 ${item.color}`}>
              {item.icon}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-white tracking-tight">{item.value}</h3>
            <p className="text-slate-500 text-xs mt-1 font-medium">{item.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
}