import { Button, Dialogs, EventData, ItemEventData, ListView, NavigatedData, Page } from '@nativescript/core'
import { irAFormulario } from '../navegacion/navegacion'
import { Tarea } from '../models/tarea'
import { tareasService } from '../services/tareas-service'
import { ListaViewModel } from './lista-view-model'

// Se ejecuta cada vez que se entra a la pantalla (también al volver del formulario).
export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object

  if (!page.bindingContext) {
    page.bindingContext = new ListaViewModel()
  }

  // Al volver del formulario se recalcula el resumen.
  ;(<ListaViewModel>page.bindingContext).actualizarResumen()
}

// Navegación: lista -> formulario.
export function onNuevaTarea(args: EventData) {
  const boton = <Button>args.object
  irAFormulario(boton.page.frame)
}

// Evento tap sobre una tarea: permite cambiar su estado (actualizar datos).
export function onItemTap(args: ItemEventData) {
  const lista = <ListView>args.object
  const tarea = <Tarea>args.view.bindingContext
  const nuevoEstado = tarea.estado === 'Pendiente' ? 'Completada' : 'Pendiente'

  Dialogs.confirm({
    title: tarea.titulo,
    message: `¿Marcar la tarea como ${nuevoEstado}?`,
    okButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  }).then((aceptado) => {
    if (aceptado) {
      tareasService.alternarEstado(tarea.id)
      ;(<ListaViewModel>lista.page.bindingContext).actualizarResumen()
    }
  })
}
