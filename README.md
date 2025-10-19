# 🐾 Sistema de Gestión de Clínicas Veterinarias

API REST creada con **Node.js + Express** y **Turso/libSQL** para la gestión de pacientes, dueños y citas en clínicas veterinarias.

## 🚀 Características

- Gestión de **mascotas**, **clientes** y **citas**.
- Autenticación con **JWT**.
- Conexión a base de datos **Turso/libSQL**.
- Estructura escalable con **Models**, **Services**, **Controllers** y **Middlewares**.
- Seguridad con ayuda de **helmet**.
- Documentación de la api por **swagger**

---

## 📂 Estructura de Carpetas

```bash
src/
├── app.js # Configuración principal de Express
├── config/ # Configuración (base de datos, etc.)
├── routes/ # Definición de rutas
├── controllers/ # Lógica de entrada/salida HTTP
├── models/ # Acceso directo a la base de datos
├── middlewares/ # Middlewares personalizados
└── utils/ # Funciones auxiliares
```

## ▶ Scripts Disponibles

```bash
pnpm run dev     # Ejecuta el servidor en modo desarrollo (se actualiza con cada guardado)
pnpm start       # Ejecuta el servidor en modo producción (no se actualiza)
```

## 📌 Endpoints

```bash
GET /           # raiz del proyecto
```
