import { Frame } from '@nativescript/core'

// Rutas de las dos pantallas (carpeta/archivo sin extensión).
export const RUTAS = {
  lista: 'lista/lista-page',
  formulario: 'formulario/formulario-page'
}

// Lista -> formulario
export function irAFormulario(frame: Frame): void {
  frame.navigate({
    moduleName: RUTAS.formulario,
    transition: { name: 'slide', duration: 200 }
  })
}

// Formulario -> lista (vuelve a la pantalla anterior del Frame)
export function volverALista(frame: Frame): void {
  frame.goBack()
}
