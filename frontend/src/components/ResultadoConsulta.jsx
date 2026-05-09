import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function ResultadoConsulta({ resultado }) {

  const reportRef = useRef()
  const [mostrarMas, setMostrarMas] = useState(false)

const descargarPDF = async () => {

  // Abrir automáticamente "Ver más"
  setMostrarMas(true)

  // Esperar renderizado
  await new Promise((resolve) => setTimeout(resolve, 500))

  const element = reportRef.current

  // Captura HD
  const canvas = await html2canvas(element, {
    scale: 2.5,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    scrollY: -window.scrollY
  })

  const imgData = canvas.toDataURL('image/png')

  // PDF A4
  const pdf = new jsPDF('p', 'mm', 'a4')

  const pdfWidth = 210
  const pdfHeight = 297

  const margin = 10

  const usableWidth = pdfWidth - margin * 2

  const imgProps = pdf.getImageProperties(imgData)

  const imgHeight =
    (imgProps.height * usableWidth) / imgProps.width

  let heightLeft = imgHeight

  let position = 30

  // ===== HEADER =====
  pdf.setFont('helvetica', 'bold')

  pdf.setFontSize(20)

  pdf.text('VALIDA-PE', 10, 15)

  pdf.setFont('helvetica', 'normal')

  pdf.setFontSize(10)

  pdf.text(
    'Reporte Oficial de Consulta',
    10,
    22
  )

  pdf.line(10, 26, 200, 26)

  // ===== PRIMERA PÁGINA =====
  pdf.addImage(
    imgData,
    'PNG',
    margin,
    position,
    usableWidth,
    imgHeight
  )

  heightLeft -= (pdfHeight - 40)

  // ===== PÁGINAS EXTRA =====
  while (heightLeft > 0) {

    position = heightLeft - imgHeight + 30

    pdf.addPage()

    pdf.addImage(
      imgData,
      'PNG',
      margin,
      position,
      usableWidth,
      imgHeight
    )

    heightLeft -= (pdfHeight - 20)
  }

  // ===== FOOTER =====
  const totalPages = pdf.internal.getNumberOfPages()

  for (let i = 1; i <= totalPages; i++) {

    pdf.setPage(i)

    pdf.setFontSize(9)

    pdf.text(
      `Generado: ${new Date().toLocaleString('es-PE')}`,
      10,
      290
    )

    pdf.text(
      `Página ${i} de ${totalPages}`,
      170,
      290
    )
  }

  pdf.save(
    `Valida-PE-${resultado.tipo}-${Date.now()}.pdf`
  )
}

  return (
    <div
      ref={reportRef}
      className="bg-white rounded-lg shadow-lg p-8 mt-8"
    >

      {/* HEADER */}
      <div className="border-b-2 border-gray-200 pb-4 mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          Resultado de Consulta
        </h3>

        <p className="text-sm text-gray-500">
          {new Date(resultado.consultadoEn).toLocaleString('es-PE')}
        </p>
      </div>

      {/* ================= RENIEC ================= */}
      {resultado.tipo === 'reniec' && (
        <div className="space-y-4">

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">DNI</p>

            <p className="text-2xl font-bold text-blue-600">
              {resultado.dni}
            </p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Nombres</p>

            <p className="text-xl font-semibold text-gray-800">
              {resultado.nombres}
            </p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Apellidos</p>

            <p className="text-xl font-semibold text-gray-800">
              {resultado.apellidos}
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Estado</p>

            <p className="text-lg font-semibold text-yellow-600">
              {resultado.estado}
            </p>
          </div>

        </div>
      )}

      {/* ================= SUNAT ================= */}
      {resultado.tipo === 'sunat' && (
        <div className="space-y-4">

          {/* RUC */}
          <div className="bg-emerald-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">RUC</p>

            <p className="text-2xl font-bold text-emerald-600">
              {resultado.ruc}
            </p>
          </div>

          {/* Razón Social */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Razón Social</p>

            <p className="text-xl font-semibold text-gray-800">
              {resultado.razonSocial}
            </p>
          </div>

          {/* Estado y condición */}
          <div className="grid grid-cols-2 gap-4">

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Estado</p>

              <p className="text-lg font-semibold text-green-600">
                {resultado.estado}
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Condición</p>

              <p className="text-lg font-semibold text-purple-600">
                {resultado.condicion}
              </p>
            </div>

          </div>

          {/* BOTÓN VER MÁS */}
          <button
            onClick={() => setMostrarMas(!mostrarMas)}
            className="w-full bg-gray-100 hover:bg-gray-200 transition p-3 rounded-lg font-semibold"
          >
            {mostrarMas
              ? '▲ Ocultar información'
              : '▼ Ver más información'}
          </button>

          {/* INFORMACIÓN EXTRA */}
          {mostrarMas && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Dirección</p>

                <p className="font-semibold">
                  {resultado.direccion || 'No disponible'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Actividad Económica
                </p>

                <p className="font-semibold">
                  {resultado.actividadEconomica || 'No disponible'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Tipo de Empresa
                </p>

                <p className="font-semibold">
                  {resultado.tipoEmpresa || 'No disponible'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Departamento
                </p>

                <p className="font-semibold">
                  {resultado.departamento || 'No disponible'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Provincia
                </p>

                <p className="font-semibold">
                  {resultado.provincia || 'No disponible'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Distrito
                </p>

                <p className="font-semibold">
                  {resultado.distrito || 'No disponible'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Trabajadores
                </p>

                <p className="font-semibold">
                  {resultado.trabajadores || 'No disponible'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Comercio Exterior
                </p>

                <p className="font-semibold">
                  {resultado.comercioExterior || 'No disponible'}
                </p>
              </div>

            </div>
          )}

        </div>
      )}

      {/* BOTÓN PDF */}
      <div className="flex gap-4 mt-8">

        <button
          onClick={descargarPDF}
          className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Descargar PDF
        </button>

      </div>

    </div>
  )
}