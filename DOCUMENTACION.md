# Documentación del Portafolio Web

Este documento explica cómo está construido este portafolio web, cómo funciona cada parte y cómo puedes modificarlo o extenderlo.

## 1. Visión General

Este portafolio es una **Single Page Application (SPA)** construida con:

| Tecnología | Propósito |
|------------|-----------|
| **React 19** | Biblioteca de JavaScript para crear interfaces de usuario |
| **Vite** | Herramienta de build y desarrollo rápido |
| **Tailwind CSS 4** | Framework de estilos CSS |
| **React Router** | Sistema de navegación entre páginas |
| **Lucide React** | Biblioteca de iconos |

### ¿Por qué estas tecnologías?

- **React**: Componentes reutilizables, estado reactivo, comunidad enorme
- **Vite**: Desarrollo ultra-rápido con Hot Module Replacement (HMR)
- **Tailwind CSS**: Estilos utility-first, rápido prototipado, fácil mantenimiento
- **React Router**: Navegación sin recargar la página (SPA)

---

## 2. Estructura del Proyecto

```
portafolio/
├── public/                  # Archivos estáticos (imágenes, fuentes)
├── src/
│   ├── assets/              # Recursos como imágenes importadas
│   ├── components/
│   │   ├── layout/          # Componentes de estructura (Navbar, Footer)
│   │   ├── sections/        # Secciones principales (Hero, TechStack, etc.)
│   │   └── ui/              # Componentes reutilizables (Button, Badge, etc.)
│   ├── data/                # Archivos JSON con datos (proyectos, skills)
│   ├── pages/               # Páginas completas
│   │   └── projects/        # Páginas individuales de cada proyecto
│   ├── App.jsx              # Componente principal con rutas
│   ├── main.jsx             # Punto de entrada de React
│   └── index.css            # Estilos globales y configuración de Tailwind
├── index.html               # HTML base
├── package.json             # Dependencias y scripts
└── vite.config.js           # Configuración de Vite
```

---

## 3. Conceptos Clave Explicados

### 3.1 Componentes

Los **componentes** son piezas reutilizables de UI. En React, todo es un componente.

**Tipos de componentes en este proyecto:**

- **Layout components**: Navbar (barra de navegación), Footer
- **Section components**: Hero, TechStack, ProjectsGallery, AboutTimeline
- **UI components**: Button, Badge, ProjectCard, SectionTitle, ImageComparisonViewer
- **Page components**: HomePage, ContactPage, CvPage, Project1-4

**Ejemplo de componente simple:**

```jsx
// src/components/ui/Button.jsx
const Button = ({ children, href, variant = "primary" }) => {
  return (
    <a href={href} className={`btn ${variant}`}>
      {children}
    </a>
  );
};
```

### 3.2 Props (Propiedades)

Los **props** son datos que se pasan de un componente padre a un componente hijo.

```jsx
// En ProjectsGallery.jsx
<ProjectCard 
  title="Mi Proyecto"        // prop: title
  description="Descripción"  // prop: description
  image="/ruta/imagen.jpg"    // prop: image
/>
```

### 3.3 Routing (Enrutamiento)

**React Router** permite tener múltiples "páginas" sin recargar el navegador.

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cv" element={<CvPage />} />
        <Route path="/proyecto/1" element={<Project1 />} />
      </Routes>
    </Router>
  );
}
```

- `path`: La URL que aparece en el navegador
- `element`: Qué componente mostrar en esa ruta

### 3.4 Estado (useState)

El **estado** permite que un componente "recuerde" datos y se actualice cuando cambian.

```jsx
const [isOpen, setIsOpen] = useState(false);  // Estado booleano
const [count, setCount] = useState(0);          // Estado numérico
```

En el Navbar, `isMobileMenuOpen` controla si el menú móvil está abierto o cerrado.

### 3.5 Efectos (useEffect)

El **useEffect** ejecuta código cuando algo cambia: al cargar el componente, al cambiar una variable, etc.

```jsx
useEffect(() => {
  // Se ejecuta al montar el componente
  console.log("¡Componente cargado!");
  
  // Cleanup: se ejecuta al desmontar
  return () => console.log("¡Componente eliminado!");
}, []);  // [] = solo una vez al inicio
```

En el Navbar, `useEffect` detecta el scroll para cambiar el estilo de la barra de navegación.

---

## 4. Cómo Funciona Cada Parte

### 4.1 Flujo Principal

1. **index.html** tiene un `<div id="root">`
2. **main.jsx** monta la app de React en ese div
3. **App.jsx** define las rutas y estructura base
4. Cada **Route** renderiza una página específica

### 4.2 Datos Externos (JSON)

Los datos como proyectos y skills están en archivos JSON:

```json
// src/data/projects.json
[
  {
    "id": 1,
    "title": "Solucionador de EDO",
    "tags": ["Python", "Math"]
  }
]
```

Estos se importan así:

```jsx
import projectsData from '../data/projects.json';
// projectsData es ahora un array de objetos
```

**¿Por qué JSON?** Separa los datos del código. Puedes cambiar proyectos sin modificar componentes.

### 4.3 Sistema de Estilos (Tailwind CSS)

Tailwind usa clases utility en el HTML:

```jsx
<div className="flex items-center justify-between p-4 bg-zinc-900">
  <h1 className="text-4xl font-bold text-white">Título</h1>
</div>
```

**Claves usadas en este proyecto:**

| Prefijo | Significado |
|---------|-------------|
| `flex`, `grid` | Layout |
| `p-`, `m-` | Padding, Margin |
| `text-` | Tamaño/color de texto |
| `bg-` | Color de fondo |
| `w-`, `h-` | Ancho, Alto |
| `md:`, `lg:` | Responsive (media queries) |

**Colores del tema:** El proyecto usa `zinc` (gris oscuro) como base y `rose` (rosa/rojo) como color de acento.

### 4.4 Componentes Principales Explicados

#### Navbar.jsx
- Barra de navegación fija
- Usa `useState` para rastrear scroll y menú móvil
- Usa `useLocation` para detectar cambios de ruta
- Links con comportamiento de "scroll suave" a secciones

#### Hero.jsx
- Sección principal de bienvenida
- Fondo con efectos de "orbes" animados
- Título con gradiente de texto

#### ProjectsGallery.jsx
- Muestra todos los proyectos desde `projects.json`
- Renderiza una lista de `ProjectCard`
- Filtra por categoría (opcional)

#### NeuralBackground.jsx
- Fondo animado tipo "red neuronal"
- Canvas con partículas conectadas

---

## 5. Cómo Ejecutar el Proyecto

### Requisitos Previos
- Node.js instalado (versión 18+)

### Comandos

```bash
# Instalar dependencias (solo la primera vez)
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Verificar código (lint)
npm run lint
```

### Puertos
- Servidor de desarrollo: `http://localhost:5173`
- Preview: `http://localhost:4173`

---

## 6. Cómo Personalizar

### 6.1 Cambiar Datos

Edita los archivos en `src/data/`:
- `projects.json` → Proyectos del portafolio
- `skills.json` → Habilidades técnicas
- `contact.json` → Información de contacto

### 6.2 Agregar Nuevo Proyecto

1. Añade el proyecto a `projects.json`
2. Opcional: crea una página exclusiva en `src/pages/projects/ProjectX.jsx`
3. Agrega la ruta en `App.jsx`:

```jsx
<Route path="/proyecto/5" element={<Project5 />} />
```

### 6.3 Modificar Estilos

- **Colores globales**: Edita `src/index.css`
- **Tema Tailwind**: Las clases `bg-zinc-*` y `text-rose-*` definen la paleta
- **Efectos**: Busca animaciones en `tailwind.config` o clases como `animate-pulse`, `blur-*`

### 6.4 Agregar Componente

1. Crea el archivo en `src/components/`
2. Impórtalo donde lo necesites:

```jsx
import MiNuevoComponente from '../components/MiNuevoComponente';
```

---

## 7. Arquitectura de Archivos Clave

### main.jsx
Punto de entrada. Monta el componente `App` dentro del elemento con id "root". Envuelve todo en `React.StrictMode` para detectar errores en desarrollo.

### App.jsx
Contiene el **Router** (navegación), el **Layout** (Navbar + Footer) y las **Routes** (definición de páginas).

### index.css
- Importa Tailwind con `@import "tailwindcss"`
- Define variables de tema (`--color-neuron`)
- Configura scrollbar personalizada
- Establece el tema oscuro global

---

## 8. Glosario Rápido

| Término | Significado |
|---------|-------------|
| **Component** | Pieza reutilizable de UI |
| **Props** | Datos que se pasan entre componentes |
| **State** | Datos internos de un componente |
| **Hook** | Función especial de React (useState, useEffect) |
| **Route** | Ruta URL asociada a un componente |
| **SPA** | Single Page Application (una página que simula muchas) |
| **HMR** | Hot Module Replacement (actualización sin recargar) |
| **Build** | Proceso de preparar para producción |

---

## 9. Próximos Pasos Sugeridos

Si quieres extender el portafolio:

1. **Agregar más páginas**: Sigue el patrón de las existentes
2. **Animaciones**: Instala `framer-motion` para transiciones
3. **Formulario de contacto**: Integra un servicio como Formspree o EmailJS
4. **Modo claro**: Añade un theme toggle
5. **SEO**: Agrega react-helmet para meta tags

---

*Documentación generada para el portafolio de Alan Noe Rodríguez Flor*
