import { useState } from 'react'
import { consultarRENIEC, consultarSUNAT } from '../services/api'

export default function ConsultaForm({ onConsulta, tipoConsulta, setTipoConsulta }) {
  const [valor, setValor] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      let resultado
      if (tipoConsulta === 'reniec') {
        resultado = await consultarRENIEC(valor)
      } else {
        resultado = await consultarSUNAT(valor)
      }

      if (resultado.success) {
        onConsulta({
          tipo: tipoConsulta,
          ...resultado.data,
        })
        setValor('')
      } else {
        setError(resultado.message)
      }
    } catch (err) {
      setError(err.message || 'Error en la consulta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Consultar Identidad</h2>

      {/* Selector de tipo */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setTipoConsulta('reniec')}
          className={`flex-1 py-3 rounded-lg font-semibold transition ${
            tipoConsulta === 'reniec'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          DNI (RENIEC)
        </button>
        <button
          onClick={() => setTipoConsulta('sunat')}
          className={`flex-1 py-3 rounded-lg font-semibold transition ${
            tipoConsulta === 'sunat'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          RUC (SUNAT)
        </button>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {tipoConsulta === 'reniec' ? 'Ingresa tu DNI (8 dígitos)' : 'Ingresa el RUC (11 dígitos)'}
          </label>
          <input
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value.replace(/\D/g, ''))}
            maxLength={tipoConsulta === 'reniec' ? 8 : 11}
            placeholder={tipoConsulta === 'reniec' ? '12345678' : '12345678901'}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Consultando...' : 'Consultar'}
        </button>
      </form>

      {/* Nota de privacidad */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 text-sm text-gray-700">
        <p><strong>ℹ️ Privacidad:</strong> Este sitio solo consulta datos públicos de RENIEC y SUNAT. No almacenamos información personal en nuestros servidores.</p>
      </div>
    </div>
  )
}