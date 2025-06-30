# Property Frontend

Aplicación web frontend construida con Next.js para gestión y visualización de propiedades inmobiliarias.

## Descripción

Interfaz web moderna con sistema de recomendaciones inteligente, filtros avanzados y experiencia de usuario optimizada para la gestión de propiedades.

## Características

- � Sistema de filtros avanzado
- 🤖 Recomendaciones inteligentes con algoritmo de similitud
- 📱 Diseño responsive y mobile-first
- 🗺️ Integración con Google Maps
- 🧭 Sistema de navegación con sidebar
- ⚡ Optimización de rendimiento con paginación
- 🎨 UI moderna con componentes reutilizables

## Tecnologías

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Estado**: React Hooks y Context API
- **Herramientas**: ESLint, PostCSS

## Instalación

```bash
npm install
```

## Configuración

Crear archivo `.env.local` con las siguientes variables:

```env
PORT=3001
```

## Arquitectura

```
src/
├── app/                 # Rutas y páginas (Next.js App Router)
│   ├── auth/           # Páginas de autenticación
│   ├── favorites/      # Página de favoritos  
│   ├── profile/        # Página de perfil
│   └── property/[id]/  # Página dinámica de detalle
├── components/          # Componentes React organizados
│   ├── auth/           # Componentes de autenticación
│   ├── layout/         # Componentes de layout
│   ├── properties/     # Componentes de propiedades
│   └── ui/             # Componentes base reutilizables
├── contexts/           # Context API para estado global
├── hooks/              # Custom hooks
├── services/           # Lógica de negocio y APIs
├── types/              # Definiciones TypeScript
└── utils/              # Funciones utilitarias
```

**Patrón de arquitectura**: Componentes modulares con separación de responsabilidades
- **Pages**: Rutas de Next.js con App Router
- **Components**: Componentes reutilizables organizados por funcionalidad
- **Services**: Lógica de negocio y comunicación con APIs
- **Hooks**: Lógica de estado reutilizable
- **Contexts**: Estado global de la aplicación

## Ejecución

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm run start
```

## Funcionalidades principales

### Propiedades
- `GET /` - Listado de propiedades con filtros
- `GET /property/[id]` - Detalle de propiedad específica

### Autenticación    *(Próximamente)*
- `GET /auth/login` - Página de login
- `GET /auth/register` - Página de registro

### Usuarios    *(Próximamente)*
- `GET /profile` - Perfil de usuario
- `GET /favorites` - Propiedades favoritas

### Sistema de Recomendaciones
- Algoritmo de similitud basado en múltiples criterios
- Score ponderado por ciudad, tipo, precio y ambientes
- Máximo 3 recomendaciones por propiedad

## Modelo de datos

```typescript
interface Property {
  id: number;
  titulo: string;
  ciudad: string;
  tipo: string;           // "Casa" | "Departamento"
  precio: number;
  ambientes: number;
  metros_cuadrados: number;
  imagen: string;
}
```
