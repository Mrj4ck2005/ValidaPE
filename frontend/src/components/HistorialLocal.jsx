export default function HistorialLocal({ historial }) {
  if (historial.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4">📋 Historial</h3>
        <p className="text-gray-500 text-center py-8">
          Aquí aparecerán tus últimas 5 consultas
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="font-bold text-gray-800 mb-4">📋 Historial (Últimas 5)</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {historial.map((item, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition">
            <p className="text-xs text-gray-500">
              {new Date(item.consultadoEn).toLocaleTimeString('es-PE')}
            </p>
            <p className="font-semibold text-gray-800">
              {item.tipo === 'reniec' ? item.dni : item.ruc}
            </p>
            <span className={`text-xs px-2 py-1 rounded ${
              item.tipo === 'reniec' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-emerald-100 text-emerald-700'
            }`}>
              {item.tipo.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}