import { useState } from 'react'
import NavBar from './components/NavBar'
import ConsultaForm from './components/ConsultaForm'
import ResultadoConsulta from './components/ResultadoConsulta'
import HistorialLocal from './components/HistorialLocal'

function App() {
  const [resultado, setResultado] = useState(null)
  const [historial, setHistorial] = useState(() => {
    const stored = localStorage.getItem('valida_pe_historial')
    return stored ? JSON.parse(stored) : []
  })
  const [tipoConsulta, setTipoConsulta] = useState('reniec')

  const agregarAlHistorial = (dato) => {
    const nuevoHistorial = [dato, ...historial].slice(0, 5)
    setHistorial(nuevoHistorial)
    localStorage.setItem('valida_pe_historial', JSON.stringify(nuevoHistorial))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-emerald-800">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda */}
          <div className="lg:col-span-2">
            <ConsultaForm 
              onConsulta={(data) => {
                setResultado(data)
                agregarAlHistorial(data)
              }}
              tipoConsulta={tipoConsulta}
              setTipoConsulta={setTipoConsulta}
            />
            
            {resultado && <ResultadoConsulta resultado={resultado} />}
          </div>

          {/* Columna Derecha */}
          <div>
            <HistorialLocal historial={historial} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-12">
        <p>© 2026 Valida-PE | Verificación de Identidad Fiscal Peruana</p>
        <p className="text-sm">By Jack Anderson Rosales Garay</p>
      </footer>
    </div>
  )
}

export default App