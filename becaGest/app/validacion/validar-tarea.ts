import { NuevaTarea } from '../models/tarea'

export type CampoTarea = 'Titulo' | 'Descripcion' | 'FechaLimite'

export interface ResultadoValidacion {
  valido: boolean
  errores: Record<CampoTarea, string> // cadena vacía = sin error
  datos: NuevaTarea | null // solo si es válido
}

// Convierte "dd/mm/aaaa" en Date. Devuelve null si el formato o la fecha no existen.
function leerFecha(texto: string): Date | null {
  const partes = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texto)
  if (!partes) return null

  const dia = Number(partes[1])
  const mes = Number(partes[2])
  const anio = Number(partes[3])
  const fecha = new Date(anio, mes - 1, dia)

  const existe =
    fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia
  return existe ? fecha : null
}

// Reglas: título >= 3 caracteres, descripción >= 10 caracteres,
// fecha límite con formato dd/mm/aaaa, existente y no anterior a hoy.
export function validarTarea(
  entrada: { titulo: string; descripcion: string; fechaLimite: string },
  hoy: Date = new Date()
): ResultadoValidacion {
  const titulo = (entrada.titulo || '').trim()
  const descripcion = (entrada.descripcion || '').trim()
  const fechaLimite = (entrada.fechaLimite || '').trim()

  const errores: Record<CampoTarea, string> = {
    Titulo: titulo.length < 3 ? 'El título debe tener al menos 3 caracteres.' : '',
    Descripcion: descripcion.length < 10 ? 'La descripción debe tener al menos 10 caracteres.' : '',
    FechaLimite: ''
  }

  const fecha = leerFecha(fechaLimite)
  if (!fecha) {
    errores.FechaLimite = 'Use el formato dd/mm/aaaa con una fecha válida.'
  } else {
    const inicioDeHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
    if (fecha < inicioDeHoy) {
      errores.FechaLimite = 'La fecha límite no puede ser anterior a hoy.'
    }
  }

  const valido = !errores.Titulo && !errores.Descripcion && !errores.FechaLimite

  return {
    valido,
    errores,
    datos: valido ? { titulo, descripcion, fechaLimite } : null
  }
}
