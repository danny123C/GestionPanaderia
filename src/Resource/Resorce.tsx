const formatFecha = (fecha: string) => {
  const date = new Date(fecha);

  // Ajustar la fecha agregando la compensación de la zona horaria
  const adjustedDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  );

  const year = adjustedDate.getFullYear();
  const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
  const day = String(adjustedDate.getDate()).padStart(2, "0"); // Asegurarse de que siempre tenga dos dígitos

  return `${year}/${month}/${day}`;
};

export default formatFecha;
