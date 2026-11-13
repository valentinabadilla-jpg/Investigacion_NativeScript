import { Observable, ObservableArray } from '@nativescript/core'
import { Tarea } from '../models/tarea'
import { tareasService } from '../services/tareas-service'

export class ListaViewModel extends Observable {
  // Es la misma instancia del servicio: cualquier cambio se refleja en el ListView.
  items: ObservableArray<Tarea> = tareasService.tareas
  resumen = ''

  constructor() {
    super()
    this.actualizarResumen()
  }

  actualizarResumen() {
    const total = this.items.length
    const pendientes = tareasService.contarPendientes()
    this.set('resumen', `Tareas: ${total}  |  Pendientes: ${pendientes}`)
  }
}
