import { Observable } from '@nativescript/core'
import { NuevaTarea } from '../models/tarea'
import { CampoTarea, validarTarea } from '../validacion/validar-tarea'

export class FormularioViewModel extends Observable {
  // Campos del formulario (enlace bidireccional con los controles).
  titulo = ''
  descripcion = ''
  fechaLimite = ''

  // Mensajes de error y su visibilidad ('visible' | 'collapsed').
  errorTitulo = ''
  errorDescripcion = ''
  errorFechaLimite = ''
  visTitulo = 'collapsed'
  visDescripcion = 'collapsed'
  visFechaLimite = 'collapsed'

  // Devuelve los datos listos para guardar, o null si hay errores.
  // Las reglas viven en validacion/validar-tarea.ts.
  validar(): NuevaTarea | null {
    const resultado = validarTarea({
      titulo: this.titulo,
      descripcion: this.descripcion,
      fechaLimite: this.fechaLimite
    })

    for (const campo of Object.keys(resultado.errores) as CampoTarea[]) {
      const mensaje = resultado.errores[campo]
      this.set('error' + campo, mensaje)
      this.set('vis' + campo, mensaje ? 'visible' : 'collapsed')
    }

    return resultado.datos
  }
}
