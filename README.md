# 📋 Proyecto: **Mi Lista de Tareas (To-do App)**

Gestor de tareas desarrollado con Vue 3, Pinia y Supabase. Permite a usuarios registrados crear, editar, completar y eliminar tareas personales. Incluye autenticación segura y está desplegado en Netlify.

---

## 🚀 Demo en vivo

🔗 [Ver aplicación desplegada](https://tu-enlace.netlify.app)  
🔗 [Repositorio en GitHub](https://github.com/tu-usuario/mi-todo-app)

---

## 🛠️ Tecnologías utilizadas

- [Vue 3 (Composition API)](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Supabase](https://supabase.com/) (Base de datos + Auth)
- CSS puro (estilos responsive y accesibles)
- Netlify (despliegue)

---

## 📚 Funcionalidades

✅ Registro de usuario  
✅ Inicio y cierre de sesión  
✅ Página protegida con tareas personales  
✅ Añadir nuevas tareas  
✅ Editar tareas existentes  
✅ Marcar tareas como completadas/incompletas  
✅ Eliminar tareas  
✅ Filtrado automático por tareas pendientes y completadas  
✅ Estilos modernos y diseño responsive  
✅ Gestión del estado con Pinia  
✅ Manejo de errores con `try/catch` y loading states  

---

## 📁 Estructura del proyecto

```
src/
├── api/               # Lógica para Supabase (auth + queries)
├── assets/            # Estilos globales
├── components/        # Componentes reutilizables (auth, tasks)
│   └── auth/          # LoginForm, RegisterForm, LogoutButton
│   └── tasks/         # TaskForm, TaskList, TaskItem
├── router/            # Rutas protegidas
├── stores/            # Pinia (userStore, taskStore)
├── views/             # Vistas (AuthView, Dashboard)
├── App.vue
├── main.js
```

---

## 📦 Instalación local

```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/mi-todo-app.git
cd mi-todo-app

# 2. Instala dependencias
npm install

# 3. Crea un archivo .env con tus claves de Supabase
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

# 4. Ejecuta el proyecto
npm run dev
```

---

## 📌 Próximas mejoras

- Vista estilo Trello (drag & drop)
- Modo oscuro
- Filtro por etiquetas
- Animaciones y transiciones
- Login con Google

---


## 📄 Licencia

MIT
