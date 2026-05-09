export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Error de Decolecta (identidad no encontrada)
  if (err.response?.status === 404) {
    return res.status(404).json({
      success: false,
      message: 'No se encontró información para el documento proporcionado',
      code: 'NOT_FOUND',
    });
  }

  // Error de autenticación (token inválido)
  if (err.response?.status === 401) {
    return res.status(401).json({
      success: false,
      message: 'Error de autenticación con Decolecta',
      code: 'AUTH_ERROR',
    });
  }

  // Error genérico
  return res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    code: 'INTERNAL_ERROR',
  });
};