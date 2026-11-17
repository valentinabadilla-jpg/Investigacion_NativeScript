export type EstadoTarea = 'Pendiente' | 'Completada'

export interface Tarea {
  id: number
  titulo: string
  descripcion: string
  fechaLimite: string // formato dd/mm/aaaa
  estado: EstadoTarea
}

// Datos que llena el formulario (el id y el estado los asignA el servicio).
export type NuevaTarea = Omit<Tarea, 'id' | 'estado'>      





