# Nuvex Cloud — Landing page

Página estática: HTML, CSS y JavaScript, lista para GitHub Pages.
Incluye el logo y las fichas comerciales originales de Nuvex suministradas en Google Drive.

## Publicar en GitHub Pages
1. Descomprime este ZIP.
2. Sube index.html, style.css, app.js, la carpeta assets y .nojekyll a la raíz del repositorio.
3. En Settings > Pages elige Deploy from a branch, rama main y carpeta / (root).
4. Guarda y espera a que GitHub muestre la URL.

No requiere npm, compilación, API ni base de datos.
Para vista local, abre index.html o usa `python -m http.server 8000`.

## Editar
- index.html: textos, precios, planes, teléfono y enlaces.
- style.css: colores, tipografía y diseño adaptable.
- app.js: pestañas y preparación de la solicitud por WhatsApp.
- assets/: logo y material comercial.

El formulario no guarda datos: prepara un mensaje en WhatsApp que el visitante decide enviar.
La selección del plan viaja en ese mensaje. Teléfono configurado: +52 614 515 3676.
Precios tomados del material compartido: Lite $3,500, Premium $4,500, Enterprise $5,500 MXN/mes.
La página remite a cotización para tratamiento de IVA y condiciones.
Las licencias CONTPAQi las proporciona el cliente.

## Dependencias externas
Google Fonts (Manrope, con Arial de respaldo); WhatsApp y Facebook al abrir sus enlaces.
El contenido de Drive está incluido como archivos estáticos; cambios futuros en Drive no se sincronizan automáticamente.

## Migración controlada (NUVEX Migration Assurance)
La landing incluye una sección de seis etapas en `#migracion`: diagnóstico, preparación de respaldos y plan de reversa, configuración del entorno, restauración, validación técnica/funcional y entrega. Es la **metodología propuesta**, no un sistema de tickets o un portal de cliente ya implementado.

### Diagnóstico previo
`#diagnostico` contiene un formulario local para recopilar orientación sobre aplicación, usuarios concurrentes, entorno actual, condición de respaldos, empresas, volumen de datos y versión de software (opcional).

- El navegador muestra observaciones preliminares de capacidad y respaldos, **sin dimensionar automáticamente** un plan ni garantizar compatibilidad.
- Al pulsar el botón se prepara un mensaje para WhatsApp del usuario; no hay backend, base de datos, cuentas ni carga de archivos.
- No se solicitan contraseñas, certificados de e.firma ni archivos contables.
- Se define alcance, ventana, retención de respaldos, RPO/RTO y responsabilidades por propuesta comercial antes de ejecutar una migración.
- La migración inicial se anuncia sujeta al alcance y compatibilidad acordados; no se establece un tiempo universal de una semana.

### Vista previa
`preview.html` se sincroniza manualmente como copia con estilos y JavaScript embebidos. El despliegue principal usa `index.html`, `style.css` y `app.js`. El dominio personalizado sigue declarado en `CNAME` y la publicación se realiza desde la rama `main`.

