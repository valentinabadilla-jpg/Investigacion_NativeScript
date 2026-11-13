import { Button, Dialogs, EventData, NavigatedData, Page, Utils } from '@nativescript/core'
import { volverALista } from '../navegacion/navegacion'
import { tareasService } from '../services/tareas-service'
import { FormularioViewModel } from './formulario-view-model'

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
  // Un formulario nuevo (vacío) cada vez que se entra a la pantalla.
  page.bindingContext = new FormularioViewModel()
}

export function onGuardar(args: EventData) {
  const boton = <Button>args.object
  const vm = <FormularioViewModel>boton.bindingContext

  Utils.dismissSoftInput()

  const datos = vm.validar()
  if (!datos) {
    return // los mensajes de error ya se muestran en pantalla
  }

  tareasService.agregar(datos)

  // Respuesta visual y regreso a la lista.
  Dialogs.alert({
    title: 'Tarea registrada',
    message: `La tarea "${datos.titulo}" se agregó a la lista.`,
    okButtonText: 'Aceptar'
  }).then(() => volverALista(boton.page.frame))
}

export function onCancelar(args: EventData) {
  const boton = <Button>args.object
  volverALista(boton.page.frame)
}
