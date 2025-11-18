# ⚔️ Warrior's Codex - Albion Build Builder

 Warrior's Codex, un proyecto web diseñado para jugadores de Albion Online para crear, guardar y compartir sus configuraciones de equipamiento.


## ✨ Características Principales

* **Autenticación de Usuario:** Registro e inicio de sesión seguro con Firebase Authentication.
* **Creación de Builds:** Interfaz visual para seleccionar equipos T8 (Armas y Armaduras).
* **Guardado Persistente:** Las *builds* se guardan en **Firestore Database** y están vinculadas al ID único del usuario.
* **Manejo de Roles:** Posibilidad de guardar *builds* como **Privadas** (solo visibles por el dueño) o **Públicas** (visibles en la Comunidad).
* **Navegación Dinámica:** Uso de `react-router-dom` para el manejo de rutas protegidas y navegación por hash (`#`).
* **Secciones Protegidas:** Acceso a Dashboard, My Builds y Build Creator solo para usuarios autenticados.

## 🛠️ Tecnologías Utilizadas

### Frontend & Core
* **React:** Biblioteca principal para la construcción de la interfaz de usuario.
* **Vite:** Herramienta de *bundling* rápida para desarrollo.
* **React Router DOM:** Para el manejo de rutas y navegación.
* **Lucide React:** Colección de iconos ligeros.
* **CSS Puro / Tailwind CSS:** Para estilos y estructura visual temática de Albion.

### Backend & Servicios
* **Firebase Authentication:** Manejo de usuarios (registro, login y sesiones).
* **Firebase Firestore:** Base de datos NoSQL para el almacenamiento persistente y filtrado eficiente de las *builds*.

## 🚀 Instalación y Uso

Sigue estos pasos para configurar y ejecutar el proyecto localmente.

### 1. Requisitos Previos

Necesitas tener [Node.js](https://nodejs.org/en) (versión LTS) y npm o yarn instalados.

### 2. Clonar e Instalar Dependencias

```bash
# Clonar el repositorio (asumiendo que está en un repo)
# git clone [URL_DEL_REPOSITORIO]
# cd warrior-codex

# Instalar dependencias de React y Firebase
npm install
# o
# yarn install