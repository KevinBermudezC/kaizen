# Kaizen

Kaizen es una aplicación web para gestionar hábitos diarios y de largo plazo. El objetivo es ayudar a los usuarios a crear, seguir y mantener hábitos positivos, con métricas de progreso y recordatorios.

## Características actuales
- Gestión de hábitos diarios y de largo plazo
- Métricas de progreso
- Recordatorios
- Autenticación (Auth.js)
- Interfaz moderna con componentes UI personalizados

## Estructura del proyecto
- `app/` - Páginas principales y layout
- `components/` - Componentes reutilizables de UI
- `lib/` - Utilidades
- `public/` - Archivos estáticos e imágenes
- `.env.local` - Variables de entorno (ejemplo: conexión a base de datos PostgreSQL)

## Instalación
1. Clona el repositorio
2. Instala las dependencias:
	```bash
	npm install
	```
3. Configura las variables de entorno en `.env.local`
4. Inicia la aplicación:
	```bash
	npm run dev
	```

## Tecnologías utilizadas
- Next.js
- TypeScript
- Drizzle
- PostgreSQL
- Auth.js
- Shadcn UI

## Próximos pasos
- Implementar CRUD de hábitos
- Mejorar las métricas y visualizaciones
- Notificaciones push
- Personalización de recordatorios

---

> Proyecto en desarrollo por Kevin Bermudez
