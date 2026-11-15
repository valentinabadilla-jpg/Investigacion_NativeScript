
import { Observable } from '@nativescript/core'
import { NuevaTarea } from '../models/tarea'
import { CampoTarea, validarTarea } from '../validacion/validar-tarea'

export class FormularioViewModel extends Observable {

  // Datos que ingresa el usuario.
  titulo = ''
  descripcion = ''
  fechaLimite = ''

  // Mensajes de error de cada campo.
  errorTitulo = ''
  errorDescripcion = ''
  errorFechaLimite = ''

  // Controlan cuándo se muestran los errores.
  visTitulo = 'collapsed'
  visDescripcion = 'collapsed'
  visFechaLimite = 'collapsed'

  // Valida los datos ingresados.
  validar(): NuevaTarea | null {

    const resultado = validarTarea({
      titulo: this.titulo,
      descripcion: this.descripcion,
      fechaLimite: this.fechaLimite
    })

    // Actualiza los mensajes de error.
    for (const campo of Object.keys(resultado.errores) as CampoTarea[]) {

      const mensaje = resultado.errores[campo]

      this.set('error' + campo, mensaje)
      this.set('vis' + campo, mensaje ? 'visible' : 'collapsed')
    }

    // Devuelve los datos si son válidos.
    return resultado.datos
  }
}
