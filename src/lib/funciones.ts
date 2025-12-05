// Patrones regex para validación
const formatoValidoAnio = /^\d{4}$/;
const formatoValidoMes = /^(0[1-9]|1[0-2])$/;
const formatoValidoDia = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;

//Comprueba que el año tenga formato YYYY
export const comprobarFormatoAnio = (anio: string): boolean =>
    formatoValidoAnio.test(anio.toString());

// Comprueba que el mes tenga formato MM (01-12)
export const comprobarFormatoMes = (mes: string): boolean =>
    formatoValidoMes.test(mes.toString());

// Comprueba que el día tenga formato DD (01-31).
export const comprobarFormatoDia = (dia: string): boolean =>
    formatoValidoDia.test(dia.toString());

// Convierte componente de fecha a string YYYY-MM-DD (puro)
export const fechaToString = (anio: string, mes: string, dia: string): string =>
    `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;


//Verifica que una combinación anio/mes/dia represente una fecha real

export const esFechaValida = (anio: number, mes: number, dia: number): boolean => {
    const date = new Date(anio, mes - 1, dia);
    return date.getFullYear() === anio &&
        (date.getMonth() + 1) === mes &&
        date.getDate() === dia;
};

// Valida una fecha dada como cadenas (YYYY, MM, DD)
export const validarFechaString = (anio: string, mes: string, dia: string): boolean =>
    comprobarFormatoAnio(anio) &&
    comprobarFormatoMes(mes) &&
    comprobarFormatoDia(dia) &&
    esFechaValida(parseInt(anio), parseInt(mes), parseInt(dia));

// Convierte componentes string a Date
export const stringToFecha = (anio: string, mes: string, dia: string): Date | null => {
    if (!validarFechaString(anio, mes, dia)) {
        return null;
    }
    return new Date(`${anio}-${mes}-${dia}T03:00:00Z`);
};

// Función pura para formatear fecha a string legible
export const formatearFecha = (fecha: Date): string =>
    fecha.toLocaleDateString('es-ES');

// Devuelve una representación con estrellas (1-5) para la dificultad
export const mostrarDificultad = (dificultad: number): string => {
    const dificultadValida = Math.max(1, Math.min(5, Math.floor(Number(dificultad))));
    const estrellasLlenas = '★'.repeat(dificultadValida);
    const estrellasVacias = '☆'.repeat(5 - dificultadValida);
    return `${estrellasLlenas}${estrellasVacias}`;
};

