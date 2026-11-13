import { Application } from '@nativescript/core'

// Punto de entrada de la aplicación (package.json -> "main": "app/app.ts").
// Application.run carga app-root.xml, que contiene el Frame de navegación.
Application.run({ moduleName: 'app-root' })

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
