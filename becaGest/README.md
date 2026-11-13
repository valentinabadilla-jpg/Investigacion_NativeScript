===============================================================================

                       BecaGest — App Móvil con NativeScript

===============================================================================



Aplicación móvil sencilla creada con NativeScript (JavaScript/TypeScript, 

plantilla Core + TypeScript) para la investigación "Frameworks para desarrollo 

móvil" del curso Desarrollo de Software IV — UCR Sede del Pacífico.



Permite administrar las tareas de gestión de becas (BecaGest): ver la lista 

de tareas, registrar una nueva mediante un formulario validado y cambiar su 

estado entre Pendiente y Completada.





-------------------------------------------------------------------------------

1. REQUISITOS DEL SISTEMA

-------------------------------------------------------------------------------



- Node.js (LTS) y npm:

  Se recomienda instalarlo con nvm-windows.



- JDK:

  Eclipse Temurin. Defina la variable JAVA_HOME.



- Android Studio + Android SDK:

  Defina ANDROID_HOME y agregue 'platform-tools' al Path del sistema.



- Emulador (AVD) o celular Android:

  Si usa un celular real, active la depuración USB.



- NativeScript CLI:

  npm install -g nativescript



* NOTA IMPORTANTE: En Windows solo se pueden compilar aplicaciones Android. 

  Compilar para iOS requiere obligatoriamente macOS con Xcode.



Verifique su entorno (debe terminar con "No issues were detected"):

  ns doctor android



Guía oficial de instalación:

  https://docs.nativescript.org/setup/windows





-------------------------------------------------------------------------------

2. INSTALACIÓN Y EJECUCIÓN

-------------------------------------------------------------------------------



1. Clonar el repositorio e instalar dependencias:

   git clone <URL-DEL-REPOSITORIO>

   cd becaGest

   npm install



2. Abrir un emulador desde Android Studio (Device Manager) o conectar un 

   celular y verificar su detección:

   ns devices



3. Ejecutar el proyecto:

   ns run android



* La primera compilación puede tardar varios minutos mientras Gradle descarga 

  las dependencias. Después, los cambios en el código se recargan automáticamente.



* Si ocurre algún problema: ejecute 'ns clean' y vuelva a correr 'ns run android'.



-- ¿Cómo se creó el proyecto originalmente? --

   ns create becagest --template @nativescript/template-blank-ts





-------------------------------------------------------------------------------

3. ORGANIZACIÓN DEL PROYECTO

-------------------------------------------------------------------------------



La estructura por responsabilidades fue organizada por el equipo para mantener 

un código modular (NativeScript no la genera automáticamente):



- Pantalla principal (lista):   app/lista/

- Pantalla de formulario:       app/formulario/

- Lógica de validación:         app/validacion/validar-tarea.ts

- Gestión de tareas (datos):    app/services/tareas-service.ts

- Navegación:                   app/navegacion/navegacion.ts

- Estilos y recursos:           app/app.css, App_Resources/



Estructura de archivos:



becaGest/

├── app/

│   ├── app.ts                      Punto de entrada (Application.run)

│   ├── app-root.xml                Frame de navegación; defaultPage = lista

│   ├── app.css                     Estilos globales

│   ├── models/tarea.ts             Interfaz Tarea

│   ├── validacion/validar-tarea.ts Reglas de validación (TypeScript puro)

│   ├── services/tareas-service.ts  Datos locales: registrar y actualizar

│   ├── navegacion/navegacion.ts    Rutas y funciones de navegación

│   ├── lista/                      Pantalla 1: lista de tareas

│   │   ├── lista-page.xml          Vista (UI)

│   │   ├── lista-page.ts           Code-behind (eventos)

│   │   └── lista-view-model.ts     Estado enlazado a la vista

│   └── formulario/                 Pantalla 2: nueva tarea

│       ├── formulario-page.xml

│       ├── formulario-page.ts

│       └── formulario-view-model.ts Campos del formulario y errores

├── App_Resources/                  Íconos y configuración nativa (Android/iOS)

├── nativescript.config.ts          Id de la app y rutas del proyecto

├── package.json                    Dependencias; "main": "app/app.ts"

├── tsconfig.json

└── webpack.config.js





-------------------------------------------------------------------------------

4. FLUJO DE EJECUCIÓN

-------------------------------------------------------------------------------



1. package.json apunte a "main": "app/app.ts". app.ts llama a 

   Application.run({ moduleName: 'app-root' }).

2. app-root.xml crea un Frame que muestra por defecto lista/lista-page.

3. En la lista, el botón "Nueva tarea" llama a irAFormulario(frame), que ejecuta 

   frame.navigate(...).

4. El formulario llama a validarTarea(...). Si los datos son correctos, 

   tareasService.agregar(...) registra la tarea, muestra una confirmación visual 

   y volverALista(frame) ejecuta frame.goBack().

5. La lista usa el mismo ObservableArray del servicio, por lo que la nueva 

   tarea aparece inmediatamente sin recargar.

6. Al tocar una tarea, se pide confirmación y tareasService.alternarEstado(id) 

   cambia su estado; el resumen superior se actualiza de inmediato.





-------------------------------------------------------------------------------

5. VALIDACIONES DEL FORMULARIO

-------------------------------------------------------------------------------



- Título:       Mínimo 3 caracteres.

- Descripción:  Mínimo 10 caracteres.

- Fecha límite: Formato dd/mm/aaaa, fecha existente y no anterior a hoy.



Los errores se muestran en mensaje de alerta o texto rojo bajo cada campo. 

Al guardar correctamente, se presenta un diálogo de confirmación.





-------------------------------------------------------------------------------

6. CUMPLIMIENTO DE REQUISITOS DE LA DEMOSTRACIÓN

-------------------------------------------------------------------------------



[DE-01] Proyecto propio y ejecutable:

        Ejecutable mediante 'ns run android'.



[DE-02] Dos pantallas con navegación:

        Navegación entre lista/ y formulario/.



[DE-03] Formulario con >=3 campos, validación y respuesta visual:

        Implementado en formulario/ y validacion/ (3 campos, errores y diálogos).



[DE-04] Listado dinámico:

        Uso de ListView + ObservableArray en lista/.



[DE-05] Explicación técnica:

        Secciones de Organización y Flujo de ejecución.



[DE-06] Reproducibilidad:

        Secciones de Requisitos e Instalación y ejecución.





-------------------------------------------------------------------------------

7. LIMITACIONES

-------------------------------------------------------------------------------



- Los datos viven en memoria: se reinician al cerrar la aplicación.

- No consume una API REST externa; las tareas se gestionan localmente.

- Probada y validada únicamente en Android; no se compiló para iOS.



