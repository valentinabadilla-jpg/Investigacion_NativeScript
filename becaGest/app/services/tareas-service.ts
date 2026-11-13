import { ObservableArray } from '@nativescript/core'
import { NuevaTarea, Tarea } from '../models/tarea'

// Gestión de tareas. Es un singleton: la lista y el formulario comparten
// la misma instancia, por eso la lista se actualiza sola.
class TareasService {
  // ObservableArray avisa a la UI cuando se agrega, elimina o reemplaza un elemento.
  readonly tareas = new ObservableArray<Tarea>([
    {
      id: 1,
      titulo: 'Revisar solicitudes pendientes',
      descripcion: 'Evaluar las solicitudes de beca recibidas esta semana.',
      fechaLimite: '15/11/2026',
      estado: 'Pendiente'
    },
    {
      id: 2,
      titulo: 'Publicar convocatoria de transporte',
      descripcion: 'Registrar fechas y cupos de la nueva convocatoria.',
      fechaLimite: '20/11/2026',
      estado: 'Pendiente'
    },
    {
      id: 3,
      titulo: 'Actualizar reporte de becas asignadas',
      descripcion: 'Verificar los montos mensuales de las asignaciones activas.',
      fechaLimite: '05/11/2026',
      estado: 'Completada'
    }
  ])

  private siguienteId = 4

  // Registrar
  agregar(datos: NuevaTarea): Tarea {
    const tarea: Tarea = { id: this.siguienteId++, ...datos, estado: 'Pendiente' }
    this.tareas.push(tarea)
    return tarea
  }

  // Actualizar: alterna entre Pendiente y Completada.
  // setItem reemplaza el elemento y notifica a la lista para que se redibuje.
  alternarEstado(id: number): void {
    for (let i = 0; i < this.tareas.length; i++) {
      const actual = this.tareas.getItem(i)
      if (actual.id === id) {
        const nuevoEstado = actual.estado === 'Pendiente' ? 'Completada' : 'Pendiente'
        this.tareas.setItem(i, { ...actual, estado: nuevoEstado })
        return
      }
    }
  }

  contarPendientes(): number {
    let total = 0
    for (let i = 0; i < this.tareas.length; i++) {
      if (this.tareas.getItem(i).estado === 'Pendiente') total++
    }
    return total
  }
}

export const tareasService = new TareasService()
