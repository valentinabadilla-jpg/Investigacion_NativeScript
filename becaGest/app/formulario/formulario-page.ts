
import { Button, Dialogs, EventData, NavigatedData, Page, Utils } from '@nativescript/core'
import { volverALista } from '../navegacion/navegacion'
import { tareasService } from '../services/tareas-service'
import { FormularioViewModel } from './formulario-view-model'

// Se ejecuta cuando se abre la pantalla del formulario.
export function onNavigatingTo(args: NavigatedData) {
  const page = args.object as Page

  // Inicializa los campos del formulario.
  page.bindingContext = new FormularioViewModel()
}

// Se ejecuta cuando se presiona Guardar tarea.
export function onGuardar(args: EventData) {
  const boton = args.object as Button
  const vm = boton.bindingContext as FormularioViewModel

  // Cierra el teclado del dispositivo.
  Utils.dismissSoftInput()

  // Comprueba los campos del formulario.
  const datos = vm.validar()

  if (!datos) {
    return
  }

  // Registra la tarea utilizando el servicio existente.
  tareasService.agregar(datos)

  // Confirma el registro y regresa al listado.
  Dialogs.alert({
    title: 'Tarea registrada',
    message: `La tarea "${datos.titulo}" se agregó a la lista.`,
    okButtonText: 'Aceptar'
  }).then(() => {
    volverALista(boton.page.frame)
  })
}

// Se ejecuta cuando se presiona Cancelar.
export function onCancelar(args: EventData) {
  const boton = args.object as Button

  // Regresa al listado sin guardar.
  volverALista(boton.page.frame)
}
