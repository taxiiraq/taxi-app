# Aplicación de Taxi para Móvil 📱

Una aplicación React Native completa para gestionar servicios de taxi y entrega con interfaces separadas para clientes, conductores y administradores.

## 🚀 Características

### 🚗 Para Clientes
- ✅ Inicio de sesión y creación de cuenta
- ✅ Nueva solicitud de entrega
- ✅ Seguimiento del estado del pedido
- ✅ Ver pedidos anteriores
- ✅ Contactar con el conductor
- ✅ Soporte técnico

### 🚘 Para Conductores
- ✅ Inicio de sesión y creación de cuenta
- ✅ Ver nuevos pedidos
- ✅ Aceptar pedidos
- ✅ Gestionar estado de entrega
- ✅ Contactar con el cliente
- ✅ Soporte técnico

### 👨‍💼 Para Administradores
- ✅ Panel de control completo
- ✅ Gestión de pedidos
- ✅ Gestión de usuarios
- ✅ Gestión de conductores
- ✅ Sistema de soporte técnico

## 🛠 Tecnologías Utilizadas

- **React Native** - Framework principal
- **Expo** - Plataforma de desarrollo y despliegue
- **TypeScript** - Escritura de código seguro
- **React Navigation** - Navegación entre pantallas
- **React Native Paper** - Componentes de interfaz
- **React Native Elements** - Componentes adicionales

## 📱 Pantallas Desarrolladas

### Pantallas de Cliente
1. **Pantalla de inicio** - Logo de la aplicación y botones de inicio de sesión/registro
2. **Pantalla de inicio de sesión** - Inicio de sesión con email y contraseña
3. **Pantalla de registro** - Creación de nueva cuenta con selección de rol
4. **Pantalla principal del cliente** - Pedidos anteriores y botón de nueva solicitud
5. **Pantalla de crear pedido** - Entrada de detalles del nuevo pedido
6. **Pantalla de seguimiento de pedido** - Estado del pedido e información del conductor

### Pantallas de Conductor
1. **Pantalla principal del conductor** - Nuevos pedidos y estado de conexión
2. **Pantalla de pedido del conductor** - Detalles del pedido y botones de control

### Pantallas de Administrador
1. **Panel de administración** - Pestañas para gestionar pedidos, usuarios, conductores y soporte

### Pantalla de Soporte
- Interfaz para enviar mensajes y consultas

## 🚀 Instalación y Configuración

### Requisitos
- Node.js (versión 16 o posterior)
- npm o yarn
- Expo CLI

### Pasos de Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar la aplicación:
```bash
npm start
```

3. Abrir la aplicación en tu teléfono:
- Instalar la aplicación Expo Go en tu teléfono
- Escanear el código QR que aparece en el navegador

## 📁 Estructura del Proyecto

```
src/
├── screens/
│   ├── SplashScreen.tsx          # Pantalla de inicio
│   ├── LoginScreen.tsx           # Pantalla de inicio de sesión
│   ├── RegisterScreen.tsx        # Pantalla de registro
│   ├── SupportScreen.tsx         # Pantalla de soporte
│   ├── customer/
│   │   ├── CustomerHomeScreen.tsx    # Pantalla principal del cliente
│   │   ├── CreateOrderScreen.tsx     # Pantalla de crear pedido
│   │   └── TrackOrderScreen.tsx      # Pantalla de seguimiento de pedido
│   ├── driver/
│   │   ├── DriverHomeScreen.tsx      # Pantalla principal del conductor
│   │   └── DriverOrderScreen.tsx     # Pantalla de pedido del conductor
│   └── admin/
│       └── AdminPanelScreen.tsx      # Panel de administración
└── types/
    └── index.ts                      # Tipos de TypeScript
```

## 🗄 Esquema de Base de Datos Sugerido

```sql
-- Tabla de usuarios
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role ENUM('customer', 'driver', 'admin') NOT NULL,
    status ENUM('active', 'banned', 'inactive') DEFAULT 'active',
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pedidos
CREATE TABLE orders (
    id VARCHAR(255) PRIMARY KEY,
    customer_id VARCHAR(255) NOT NULL,
    driver_id VARCHAR(255),
    address TEXT NOT NULL,
    description TEXT NOT NULL,
    notes TEXT,
    status ENUM('pending', 'accepted', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (driver_id) REFERENCES users(id)
);

-- Tabla de mensajes de soporte
CREATE TABLE support_messages (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de notificaciones
CREATE TABLE notifications (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    type ENUM('order_accepted', 'order_started', 'order_completed', 'new_order', 'order_cancelled') NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🔔 Sistema de Notificaciones

### Para Clientes:
- "Tu pedido ha sido aceptado"
- "El conductor ha comenzado la entrega"
- "Entrega completada exitosamente"

### Para Conductores:
- "Nuevo pedido recibido"
- "Tu pedido ha sido cancelado"
- "Nuevos detalles del pedido"

## 🌐 Despliegue en Netlify

Para la aplicación web (si se agrega soporte web):

1. Construir la aplicación:
```bash
npm run web:build
```

2. Subir la carpeta `web-build` a Netlify

## 🤝 Contribución

1. Fork el proyecto
2. Crear una nueva rama para la funcionalidad
3. Commit de los cambios
4. Push a la rama
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 📞 Soporte

Para obtener soporte, por favor contactar vía:
- Email: support@taxi-app.com
- Teléfono: +966-XXX-XXXX

---

**Esta aplicación fue desarrollada usando las últimas tecnologías y mejores prácticas en desarrollo de aplicaciones móviles.** 