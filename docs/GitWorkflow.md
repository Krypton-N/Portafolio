# Flujo de Trabajo con Git y Despliegue (Git Workflow)

Guía de referencia rápida para gestionar ramas (branches), fusionar cambios (merge) y desplegar el portafolio en GitHub Pages.

---

## 📌 1. Flujo de Trabajo con Ramas (Recomendado para cambios grandes/rediseños)
Utiliza este flujo cuando vayas a agregar una sección nueva, rediseñar la interfaz o hacer cambios importantes. Esto te permite experimentar de manera segura sin alterar el código estable en la rama `main`.

### Paso 1: Crear una nueva rama y cambiarse a ella
Si ya tienes cambios locales sin guardar, Git los llevará automáticamente a la nueva rama.
```powershell
git checkout -b nombre-de-tu-rama
```
*(Ejemplo: `git checkout -b mejora-interfaz`)*

### Paso 2: Trabajar y probar localmente
Realiza tus cambios en el código. Siempre prueba que todo funcione en tu computadora ejecutando el servidor de desarrollo local:
```powershell
npm run dev
```

### Paso 3: Guardar y confirmar (Commit) los cambios
Una vez que verifiques que el código funciona localmente, guarda tus cambios en el historial de Git:
```powershell
git add .
git commit -m "Feature: descripción breve del cambio"
```

### Paso 4: Subir la rama a GitHub
Sube tu rama al repositorio remoto en GitHub:
```powershell
git push -u origin nombre-de-tu-rama
```

### Paso 5: Desplegar a Producción (GitHub Pages)
Compila el proyecto y súbelo a la web en vivo. El comando generará la carpeta `dist` y la subirá a la rama `gh-pages` de tu repositorio de GitHub:
```powershell
npm run deploy
```
> ⚠️ **Nota:** El comando `npm run deploy` actualiza la web de producción directamente. Asegúrate de haber probado todo en local (`npm run dev`) antes de ejecutarlo.

### Paso 6: Fusionar (Merge) a la rama principal (`main`)
Una vez que confirmes que la web en producción funciona correctamente, debes integrar tus cambios de vuelta a la rama principal (`main`) para que tu código fuente definitivo esté sincronizado.

Hay dos formas de hacer esto:

#### Opción A: A través de la web de GitHub (Recomendado)
1. Ve a tu repositorio en GitHub.
2. Verás un botón para crear un **Pull Request (PR)** de tu nueva rama.
3. Revisa los cambios y haz clic en **Merge pull request** para integrarlos a `main`.
4. En tu terminal local, regresa a `main` y descarga los cambios integrados:
   ```powershell
   git checkout main
   git pull origin main
   ```

#### Opción B: A través de la terminal local
Si prefieres no usar la web de GitHub y hacer la fusión directamente en tu computadora:
```powershell
git checkout main
git merge nombre-de-tu-rama
git push origin main
```

Una vez fusionados los cambios, puedes eliminar la rama de trabajo si ya no la necesitas:
```powershell
git branch -d nombre-de-tu-rama
```

---

## ⚡ 2. Flujo de Trabajo Rápido (Cambios menores en `main`)
Si solo vas a corregir un texto pequeño o realizar un cambio menor directo en la rama `main`:

```powershell
# 1. Asegúrate de estar en main y tener lo último de GitHub
git checkout main
git pull origin main

# 2. Haz el cambio y pruébalo en local
npm run dev

# 3. Guarda y sube a GitHub
git add .
git commit -m "Fix: corregir ortografía en contacto"
git push origin main

# 4. Despliega a producción
npm run deploy
```

---

## 🛠️ Comandos de Utilidad

| Comando | Propósito |
|---------|-----------|
| `git status` | Ver el estado de los archivos (modificados, nuevos, borrados) |
| `git branch` | Listar las ramas locales (la que tiene `*` es la actual) |
| `git log --oneline` | Ver el historial reciente de commits de forma resumida |
| `git checkout <rama>` | Cambiarse a una rama existente |
| `git diff` | Ver los cambios detallados en el código antes de guardarlos |
| `git restore <archivo>` | Descartar los cambios locales no guardados de un archivo específico |


