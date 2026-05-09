export default function NavBar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-xl font-bold">
            ✓
          </div>
          <h1 className="text-2xl font-bold">Valida-PE</h1>
        </div>
        <p className="text-sm text-gray-400">Verificación de Identidad Fiscal</p>
      </div>
    </nav>
  )
}