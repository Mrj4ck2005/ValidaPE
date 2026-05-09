import { validateDNI } from '../utils/validators.js';
import decolectaClient from '../utils/decolectaClient.js';

export const consultarRENIEC = async (req, res, next) => {
  try {
    const { dni } = req.body;

    // Validar DNI
    const { error, value } = validateDNI(dni);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Consulta correcta a Decolecta
    const response = await decolectaClient.get(
      `/v1/reniec/dni?numero=${value}`
    );
//nuevo mas
    console.log(response.data)

    // Respuesta
    return res.status(200).json({
      success: true,
      data: {
        dni: response.data.document_number,
        nombres: response.data.first_name,

        apellidos: `${response.data.first_last_name || ''} ${response.data.second_last_name || ''}`.trim(),

        apellidoPaterno: response.data.first_last_name || '',

        apellidoMaterno: response.data.second_last_name || '',

        nombreCompleto: response.data.full_name,

        estado: 'ACTIVO',

  consultadoEn: new Date().toISOString(),
},
    });

  } catch (error) {
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: 'Error consultando RENIEC',
      error: error.response?.data || error.message,
    });
  }
};