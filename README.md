# CBA Creative Studio — MVP navegable v0.1

Prototipo React + TypeScript para el equipo creativo de **Casino Buenos Aires Online**.

## Requisitos
- Node.js 20.19+ o 22+
- npm

## Ejecutar
```bash
npm install
npm run dev
```
Abrí la URL indicada por Vite (normalmente http://localhost:5173).

## Compilar
```bash
npm run build
npm run preview
```
El resultado estático queda en `dist/`.

## Módulos funcionales
- Dashboard: métricas y campañas recientes.
- Campaign Manager: listado, búsqueda y creación de briefs.
- Creative Workspace: campaña activa, formatos, recursos y cambios de estado.
- Approval Center: aprobación o solicitud de cambios por versión, con historial.
- Brand Brain: reglas confirmadas de tipografía, logo y comunicación.
- Asset Library: catálogo de recursos, registro de metadatos y descarga de captura original.
- Configuración: estado de conectores y restablecimiento de datos.

Los datos de prueba se guardan en `localStorage` y **no se comparten entre usuarios ni dispositivos**. Los roles se simulan con el selector superior. Los permisos de la demo no constituyen seguridad real. La carga de nuevos archivos, generación de imágenes por IA y conexiones a Microsoft 365 **no están implementadas**.

## Campaña demo
«Nuestra App Oficial», con la captura aportada por el usuario en `public/app-oficial-captura.png`. El recurso se muestra sin redibujar la interfaz.

## Reglas de marca
- Titulares y CTA: **Agrandir Extended**.
- Bajadas y cuerpo: **Encode Sans**.
- No generar ni recrear el logotipo. Insertar solamente un archivo original aprobado.
- No reutilizar campañas anteriores como referencia visual automática.
- No inventar condiciones promocionales, beneficios o textos legales.
- Emails: hero principal cuadrado 1:1, módulos reutilizables.

**Fuentes:** el código declara las familias oficiales pero **no distribuye archivos de fuentes**. Para renderización fiel, el equipo deberá incorporar los archivos licenciados y sus `@font-face`, con pesos verificados contra el manual.

## Arquitectura y puntos de integración
- `src/types.ts`: entidades y estados.
- `src/services.ts`: `CreativeStudioService` y adaptador `demoService` basado en `localStorage`.
- `Microsoft365Integration`: contrato propuesto para backend, **no implementación real**.
- `src/main.tsx`: interfaz y lógica del MVP.
- `src/style.css`: sistema visual responsive.

### Integración real sugerida
1. Configurar aplicación en Microsoft Entra ID y autenticación OIDC/MSAL.
2. Desplegar backend FastAPI con PostgreSQL y políticas RBAC comprobadas en servidor.
3. Implementar `CreativeStudioService` sobre endpoints `/api/campaigns`, `/api/assets`, `/api/reviews`.
4. Microsoft Graph: crear carpetas y subir archivos en SharePoint; crear y actualizar tareas Planner. Usar permisos mínimos aprobados por IT.
5. Power Automate: aprobaciones con identificador de asset, versión inmutable, usuario y resultado.
6. Teams: notificaciones posteriores a confirmación de operaciones.
7. Auditoría, control de acceso, antireplay/idempotencia, reintentos y pruebas de integración.
8. Incorporar motor de generación de propuestas visuales y compositor determinista para textos, logos originales y recursos de terceros.

**No guardar secretos, tokens de Graph ni claves de IA en variables `VITE_` o en el frontend.**

## Límites conocidos
- La paleta de la interfaz es una propuesta de producto, no una extracción certificada del manual de marca.
- Los assets sin `url` son fichas de seguimiento, no archivos descargables.
- La aprobación demo puede efectuarse sin un archivo binario: en producción deberá bloquearse.
- El estado de campaña puede modificarse manualmente en la demo; en producción será una máquina de estados validada por backend.

## GitHub y Azure (preparado para despliegue)
- `.github/workflows/ci.yml`: verificación de compilación en pushes y pull requests.
- `.github/workflows/azure-static-web-apps.yml`: despliegue opcional a Azure Static Web Apps con secreto `AZURE_STATIC_WEB_APPS_API_TOKEN`.
- `public/staticwebapp.config.json`: fallback SPA y cabeceras básicas.
- `AZURE_DEPLOY.md`: guía de despliegue y advertencias de seguridad.
- `.gitignore` y `.env.example`: estructura segura para el repositorio.

**Verificación local pendiente:** en el entorno de preparación, `npm install` falló por falta de resolución DNS hacia registry.npmjs.org (`EAI_AGAIN`). El pipeline de GitHub será la primera comprobación real de compilación.
