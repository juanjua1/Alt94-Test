# Alt94 Property Management System

Este repositorio contiene el sistema completo de gestión de propiedades Alt94, organizado en dos módulos principales:

## 📁 Estructura del Proyecto

```
Alt94-Test/
├── backend/     # API REST desarrollada con NestJS
├── frontend/    # Aplicación web desarrollada con Next.js
└── README.md    # Este archivo
```

## 🚀 Backend (API)

**Tecnologías:** NestJS, TypeScript, MongoDB, JWT Authentication

### Características
- Autenticación y autorización con JWT
- CRUD completo de propiedades
- Sistema de usuarios
- Validación de datos con DTOs
- Arquitectura modular con servicios separados

### Instalación y Ejecución
```bash
cd backend
npm install
npm run start:dev
```

La API estará disponible en `http://localhost:3000`

### Endpoints Principales
- `POST /auth/login` - Autenticación de usuarios
- `GET /products` - Listar propiedades
- `POST /products` - Crear nueva propiedad
- `GET /users` - Gestión de usuarios

## 🎨 Frontend (Aplicación Web)

**Tecnologías:** Next.js 14, TypeScript, Tailwind CSS, Context API

### Características
- Interfaz de usuario moderna y responsiva
- Sistema de autenticación integrado
- Gestión de favoritos
- Filtros avanzados de búsqueda
- Recomendaciones personalizadas
- Mapas interactivos con Google Maps

### Instalación y Ejecución
```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Funcionalidades Principales
- **Exploración de Propiedades:** Navegación intuitiva con filtros
- **Sistema de Favoritos:** Guardar propiedades de interés
- **Perfil de Usuario:** Gestión de información personal
- **Búsqueda Avanzada:** Filtros por precio, ubicación, tipo, etc.
- **Vista Detallada:** Información completa de cada propiedad

## 🔧 Configuración

### Variables de Entorno

#### Backend (.env)
```
DATABASE_URL=mongodb://localhost:27017/property-db
JWT_SECRET=your-jwt-secret
PORT=3000
```

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
```

## 📝 Documentación Adicional

- [Documentación del Backend](./backend/README.md)
- [Documentación del Frontend](./frontend/README.md)

## 🚀 Despliegue

### Backend
- Configurado para despliegue en Railway y Vercel
- Variables de entorno de producción incluidas

### Frontend
- Optimizado para despliegue en Vercel
- Configuración de Next.js para producción

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

**Alt94 Development Team**
- Email: contact@alt94.com
- Website: https://alt94.com

---

**Developed with ❤️ by Alt94 Team**
