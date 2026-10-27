# Despliegue de prueba en Azure Static Web Apps

Este despliegue publica **solo el frontend de demostración**. No incluye backend, login Entra ID ni integración real con Microsoft 365.

1. Crear un repositorio **privado** `cba-creative-studio` en GitHub.
2. Subir estos archivos a `main` y verificar que **Validate MVP** compile en GitHub Actions.
3. En Azure Portal crear una **Static Web App** para el entorno de pruebas. Elegir un plan y región acordes con IT; vincular el repositorio cuando corresponda. Si Azure crea automáticamente otro workflow, conservar **solo un flujo de despliegue** para evitar despliegues duplicados.
4. Para utilizar el workflow incluido `.github/workflows/azure-static-web-apps.yml`, agregar el token de despliegue de esa Static Web App como secreto de repositorio `AZURE_STATIC_WEB_APPS_API_TOKEN`. No pegar el token en archivos ni conversaciones.
5. Ejecutar manualmente el workflow o hacer push a `main`. La compilación se realiza con Node 22 y publica `dist/`.
6. Probar navegación, creación de campaña, revisión demo y refresco de la URL; comprobar que el fallback SPA funcione.

## Seguridad
- **No usar la URL de prueba para datos comerciales sensibles**: los datos demo se guardan en localStorage.
- La aplicación actual no tiene autenticación ni autorización real; no se debe confundir un repositorio privado con una web privada.
- Antes de dar acceso al equipo: habilitar control de acceso real (Entra ID o una capa de autenticación corporativa) y backend para permisos por rol.
- Nunca poner claves de IA, secretos de Azure o tokens de Microsoft Graph en `VITE_*` ni en el repositorio.
- Para producción, definir entornos dev/staging/prod, dominio, logs, políticas de datos y aprobaciones IT.
