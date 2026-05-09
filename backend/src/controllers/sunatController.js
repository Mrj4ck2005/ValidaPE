import decolectaClient from '../utils/decolectaClient.js';

export const consultarSUNAT = async (req, res, next) => {
  try {
    const { ruc } = req.body;

    // Validación básica
    if (!ruc || ruc.length !== 11) {
      return res.status(400).json({
        success: false,
        message: 'El RUC debe tener 11 dígitos',
      });
    }

    // Consulta correcta a Decolecta
    const response = await decolectaClient.get(
      `/v1/sunat/ruc/full?numero=${ruc}`
    );



    const data = response.data;
    console.log(response.data);
    



   return res.status(200).json({
  success: true,
  data: {
    tipo: 'sunat',

    ruc: data.numero_documento || ruc,

    razonSocial: data.razon_social || '',

    estado: data.estado || '',

    condicion: data.condicion || '',

    direccion: data.direccion || '',

    actividadEconomica: data.actividad_economica || '',

    tipoEmpresa: data.tipo || '',

    departamento: data.departamento || '',

    provincia: data.provincia || '',

    distrito: data.distrito || '',

    trabajadores: data.numero_trabajadores || '',

    comercioExterior: data.comercio_exterior || '',

    consultadoEn: new Date().toISOString(),
  },
})

  } catch (error) {
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: 'Error consultando SUNAT',
      error: error.response?.data || error.message,
    });
  }
};