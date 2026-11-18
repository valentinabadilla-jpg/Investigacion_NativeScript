# BecaGest — App Móvil con NativeScript

Aplicación móvil sencilla creada con **NativeScript** (JavaScript/TypeScript, plantilla **Core + TypeScript**) para la investigación **«Frameworks para desarrollo móvil»** del curso Desarrollo de Software IV — Universidad de Costa Rica, Sede del Pacífico.

Permite administrar las tareas de gestión de becas (BecaGest): consultar la lista de tareas, registrar una nueva mediante un formulario validado y cambiar su estado entre **Pendiente** y **Completada**.

---

## 1. Requisitos del sistema

- **Node.js y npm:** se requiere Node.js con npm. Para administrar versiones en Windows puede utilizarse nvm-windows.

- **JDK:** Eclipse Temurin. Es necesario configurar la variable de entorno `JAVA_HOME`.

- **Android Studio y Android SDK:** se debe configurar `ANDROID_HOME` y agregar `platform-tools` al `Path` del sistema.

- **Emulador (AVD) o dispositivo Android:** si se utiliza un dispositivo físico, debe habilitarse la depuración USB.

- **NativeScript CLI:** se instala mediante npm:
```powershell
  npm.cmd install -g nativescript
```
**Nota:** En Windows se pueden realizar compilaciones locales para Android. Compilar para iOS de forma local requiere macOS con Xcode.

Para verificar el entorno Android:
```powershell
ns.cmd doctor android
```
Este comando permite detectar problemas de configuración. Es recomendable revisar cualquier advertencia o error que aparezca.

**Herramientas utilizadas en las pruebas del proyecto:**

| Herramienta | Versión o configuración utilizada |

|---|---|

| Node.js | 26.13.1 |

| npm | 11.20.0 |

| NativeScript CLI | 9.1.2 |

| Eclipse Temurin JDK | 21.0.13 |

| Android Studio | Utilizado para configurar Android SDK y el emulador (versión no documentada) |

| Emulador | Small Phone (`emulator-5554`); versión de Android por confirmar en Device Manager |

Comandos de comprobación:
```powershell
node -v

npm.cmd -v

java -version

javac -version

ns.cmd --version
```
Guía oficial de instalación: https://docs.nativescript.org/setup/windows

---

## 2. Instalación y ejecución

### 2.1. Clonar el repositorio e instalar dependencias
```powershell
git clone https://github.com/valentinabadilla-jpg/Investigacion_NativeScript.git

cd Investigacion_NativeScript

cd becaGest

npm.cmd install
```
### 2.2. Configurar Android y abrir el emulador

Desde **Android Studio → Device Manager**, se inicia un emulador Android. También puede conectarse un teléfono físico compatible.

En Windows, si `adb` no se reconoce en la terminal, se puede configurar el SDK para la sesión actual de PowerShell:
```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"

$env:Path += ";$env:ANDROID_HOME\platform-tools"
```
Luego se verifica la conexión:
```powershell
adb devices

ns.cmd devices android
```
Durante el desarrollo, el dispositivo virtual se identificó como `emulator-5554`.

### 2.3. Ejecutar la aplicación
```powershell
ns.cmd run android
```
La primera compilación puede tardar varios minutos, ya que Gradle descarga dependencias y componentes de Android. En la ejecución de prueba se confirmó la compilación mediante `Project successfully built` y la instalación en `emulator-5554`.

Los cambios en el código pueden recargarse automáticamente mientras el proceso de NativeScript permanece activo. Para detenerlo se utiliza `Ctrl + C`.

### 2.4. Solución de problemas frecuentes

- **`node`, `npm` o `ns` no se reconocen:** comprobar que las herramientas estén instaladas y reiniciar la terminal. En PowerShell puede utilizarse `npm.cmd` y `ns.cmd`.

- **`adb` no se reconoce:** verificar `ANDROID_HOME` y agregar `platform-tools` al `Path`.

- **NativeScript no detecta el emulador:** comprobar que Android haya iniciado por completo y revisar la salida de `adb devices`.

- **La aplicación se instala, pero no se abre automáticamente:** intentar abrir BecaGest desde el emulador. Si se cierra, revisar los registros de ejecución antes de repetir la compilación.

- **Problemas de compilación:** comprobar el resultado de `ns.cmd doctor android` y, cuando corresponda, ejecutar `ns.cmd clean` antes de reconstruir.

**Creación original de un proyecto equivalente (comando de referencia, no necesario al clonar este repositorio):**
```powershell
ns.cmd create becaGest --template @nativescript/template-blank-ts
```
---

## 3. Organización del proyecto

La estructura por responsabilidades fue organizada por el equipo para mantener un código modular. **NativeScript no genera automáticamente todas estas carpetas.**

- **Pantalla principal (lista):** `app/lista/`

- **Pantalla de formulario:** `app/formulario/`

- **Lógica de validación:** `app/validacion/validar-tarea.ts`

- **Gestión de tareas (datos):** `app/services/tareas-service.ts`

- **Navegación:** `app/navegacion/navegacion.ts`

- **Estilos y recursos:** `app/app.css`, `App_Resources/`

Estructura principal:
```text
Investigacion_NativeScript/

├── README.md

└── becaGest/

    ├── app/

    │   ├── app.ts                         Punto de entrada (Application.run)

    │   ├── app-root.xml                   Frame de navegación; pantalla inicial: lista

    │   ├── app.css                        Estilos globales

    │   ├── models/

    │   │   └── tarea.ts                   Modelo de tarea

    │   ├── validacion/

    │   │   └── validar-tarea.ts           Reglas de validación

    │   ├── services/

    │   │   └── tareas-service.ts          Registro y actualización de tareas

    │   ├── navegacion/

    │   │   └── navegacion.ts              Funciones de navegación

    │   ├── lista/                         Pantalla 1: lista de tareas

    │   │   ├── lista-page.xml             Vista

    │   │   ├── lista-page.ts              Eventos

    │   │   └── lista-view-model.ts        Estado enlazado a la vista

    │   └── formulario/                    Pantalla 2: nueva tarea

    │       ├── formulario-page.xml        Vista

    │       ├── formulario-page.ts         Eventos

    │       └── formulario-view-model.ts   Campos y errores

    ├── App_Resources/                     Recursos y configuración nativa

    ├── nativescript.config.ts             Configuración del proyecto

    ├── package.json                       Dependencias y punto de entrada

    ├── tsconfig.json

    └── webpack.config.js
```
---

## 4. Flujo de ejecución

1\. `package.json` establece el punto de entrada en `app/app.ts`. A su vez, `app.ts` llama a `Application.run({ moduleName: 'app-root' })`.

2\. `app-root.xml` crea un `Frame` que muestra inicialmente `lista/lista-page`.

3\. En la lista, el botón **Nueva tarea** llama a `irAFormulario(frame)`, que utiliza `frame.navigate(...)`.

4\. El formulario ejecuta `validarTarea(...)`. Si los datos son correctos, `tareasService.agregar(...)` registra la tarea, muestra una confirmación visual y `volverALista(frame)` regresa a la pantalla anterior.

5\. La lista utiliza el `ObservableArray` del servicio, por lo que la tarea registrada aparece sin necesidad de volver a cargar manualmente los datos.

6\. Al tocar una tarea, se solicita confirmación y `tareasService.alternarEstado(id)` cambia su estado; el resumen superior se actualiza.

---

## 5. Validaciones del formulario

- **Título:** mínimo 3 caracteres.

- **Descripción:** mínimo 10 caracteres.

- **Fecha límite:** formato `dd/mm/aaaa`, fecha existente y no anterior al día actual.

Los errores se muestran mediante texto rojo debajo de cada campo. Al guardar correctamente, se presenta un diálogo de confirmación.

### 5.1. Interfaz, componentes y formulario — Integrante 2

#### Descripción de la pantalla

La pantalla de registro de tareas permite ingresar nuevas actividades relacionadas con la gestión de becas. Fue construida mediante **NativeScript Core, XML, TypeScript y CSS**, con una estructura vertical que facilita la lectura y el ingreso de información.

El formulario muestra el encabezado **Registrar nueva tarea**, indicaciones para completar los datos, un asterisco en cada campo obligatorio y botones para guardar o cancelar. Su contenido puede desplazarse verticalmente cuando no cabe en la pantalla.

#### Componentes utilizados

La interfaz se encuentra en `app/formulario/formulario-page.xml` y utiliza los siguientes controles:

| Componente | Función |

|---|---|

| `Page` | Define la pantalla del formulario. |

| `ActionBar` | Presenta el título **Nueva tarea**. |

| `ScrollView` | Permite desplazarse por el contenido. |

| `StackLayout` | Organiza los elementos verticalmente. |

| `Label` | Muestra títulos, instrucciones, etiquetas y errores. |

| `TextField` | Recibe el título y la fecha límite. |

| `TextView` | Recibe una descripción de varias líneas. |

| `Button` | Ejecuta las acciones **Guardar tarea** y **Cancelar**. |

#### Campos y validaciones

El formulario dispone de tres campos obligatorios: **título**, **descripción** y **fecha límite**. Se comprueba que el título tenga al menos 3 caracteres, que la descripción tenga al menos 10 y que la fecha corresponda al formato `dd/mm/aaaa`, exista en el calendario y no sea anterior al día actual.

Las reglas se implementan en `app/validacion/validar-tarea.ts`. Si algún valor es incorrecto, se muestra un mensaje debajo del campo respectivo y no se registra la tarea. El texto se recorta con `trim()` para evitar espacios sobrantes al inicio y al final.

#### Eventos del formulario

El archivo `app/formulario/formulario-page.ts` contiene los eventos principales:

- **`onNavigatingTo`:** crea un `FormularioViewModel` nuevo para mostrar los campos vacíos al ingresar a la pantalla.

- **`onGuardar`:** cierra el teclado, ejecuta `vm.validar()` y, si los datos son válidos, los envía a `tareasService.agregar(datos)`. Después muestra una confirmación y regresa al listado.

- **`onCancelar`:** regresa a la pantalla principal sin registrar la información introducida.

#### Gestión de datos y estado visual

`app/formulario/formulario-view-model.ts` utiliza `Observable` para mantener los valores `titulo`, `descripcion` y `fechaLimite`, así como los textos `errorTitulo`, `errorDescripcion` y `errorFechaLimite`.

Mediante enlaces de datos en XML, como `text="{{ titulo }}"`, los controles muestran y actualizan las propiedades del ViewModel. Las propiedades `visTitulo`, `visDescripcion` y `visFechaLimite` controlan si los errores deben aparecer o permanecer ocultos. El método `validar()` usa `this.set()` para notificar a la interfaz los cambios de los mensajes de validación.

#### Estilos visuales

Los estilos se definen en `app/app.css`. Para el formulario se utilizan las clases `.formulario`, `.formulario-titulo`, `.formulario-subtitulo`, `.formulario-ayuda`, `.etiqueta`, `.campo-formulario` y `.error`.

Estas clases configuran los espacios, los tamaños de texto, los colores y los bordes de los campos. Los errores aparecen en rojo para distinguirlos de las instrucciones generales. Los estilos del listado de tareas se conservaron para no alterar la otra pantalla.

#### Navegación

La navegación utiliza el componente `Frame` y las funciones de `app/navegacion/navegacion.ts`. Desde la lista se accede al formulario mediante **Nueva tarea**. Tras un registro válido se muestra una confirmación y se vuelve al listado; al utilizar **Cancelar**, se regresa sin guardar.

#### Pruebas realizadas

El formulario se verificó en un emulador **Small Phone (`emulator-5554`)**. Se comprobó lo siguiente:

| Prueba | Resultado |

|---|---|

| Apertura de la pantalla del formulario | Correcto |

| Visualización de título, descripción y fecha límite | Correcto |

| Guardar con los campos vacíos | Muestra errores |

| Título demasiado corto | Muestra error |

| Descripción con menos de diez caracteres | Muestra error |

| Fecha con formato incorrecto | Muestra error |

| Registro de una tarea con datos válidos | Correcto |

| Visualización de la nueva tarea en el listado | Correcto |

| Botón Cancelar | Regresa sin guardar |

| Navegación entre ambas pantallas | Correcto |

Estas pruebas confirman el funcionamiento de la interfaz y su conexión con el listado dinámico en el entorno utilizado.

#### Archivos relacionados

| Archivo | Responsabilidad |

|---|---|

| `app/formulario/formulario-page.xml` | Estructura visual del formulario. |

| `app/formulario/formulario-page.ts` | Eventos de Guardar y Cancelar. |

| `app/formulario/formulario-view-model.ts` | Valores y mensajes de error. |

| `app/validacion/validar-tarea.ts` | Reglas de validación. |

| `app/app.css` | Estilos del formulario y de la aplicación. |

---

## 6. Cumplimiento de requisitos de la demostración

| ID | Requisito | Implementación |

|---|---|---|

| **DE-01** | Proyecto propio y ejecutable | Se ejecuta con `ns.cmd run android` en un emulador Android. |

| **DE-02** | Dos pantallas con navegación | Pantallas `lista/` y `formulario/`, conectadas mediante `Frame`. |

| **DE-03** | Formulario de tres o más campos, validación y respuesta visual | Tres campos, mensajes de error y diálogo de confirmación. |

| **DE-04** | Listado dinámico | `ListView` y `ObservableArray` en la pantalla de lista. |

| **DE-05** | Explicación técnica | Secciones de organización, flujo de ejecución y formulario. |

| **DE-06** | Reproducibilidad | Requisitos, instalación y comandos de ejecución incluidos. |

---

## 7. Limitaciones

- **Datos locales en memoria:** las tareas registradas durante la ejecución no se conservan al cerrar la aplicación.

- **Sin API REST externa:** la demostración gestiona las tareas localmente; la conexión con un servicio web es una ampliación opcional.

- **Pruebas en Android:** la aplicación se verificó en Android; no se realizó una compilación para iOS.

---
