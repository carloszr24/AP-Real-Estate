# PlenoCasa — Inmobiliaria Web

Next.js + TypeScript + Tailwind + Prisma + PostgreSQL ([Supabase](https://supabase.com))

---

## Setup en local

### 1. Instalar dependencias
```bash
npm install
```

### 2. Supabase y entorno
1. Crea un proyecto en Supabase → **Settings → Database**.
2. `cp .env.example .env` y rellena en `.env`:
   - **DATABASE_URL**: URI de **Connection pooling** (modo **Transaction**, puerto **6543**). Si no incluye `pgbouncer=true`, añádelo al final de la URL.
   - **DIRECT_URL**: **Connection string** directa (puerto **5432**) para migraciones y Prisma Studio.
   - **ADMIN_PASSWORD**: contraseña del panel `/admin` (solo servidor; no uses `NEXT_PUBLIC_`).

En Postgres local sin pooler puedes usar la **misma** URL en `DATABASE_URL` y `DIRECT_URL`.

### 3. Tablas y datos de ejemplo
```bash
npx prisma migrate dev    # primera vez: crea tablas a partir de prisma/migrations
npm run db:seed           # opcional: propiedades de ejemplo
```

### 4. Desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El panel admin está en `/admin` (contraseña = `ADMIN_PASSWORD`).

---

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home con hero y propiedades destacadas |
| `/propiedades` | Catálogo con filtros |
| `/propiedades/[id]` | Detalle de propiedad |
| `/sobre-nosotros` | Presentación y servicios |
| `/contacto` | Formulario de contacto |
| `/admin` | Panel de gestión (sesión por cookie tras login) |

---

## Despliegue en Vercel

1. Sube el repo a GitHub y conecta el proyecto en [vercel.com](https://vercel.com).
2. En **Settings → Environment Variables** añade las mismas variables que en `.env` (`DATABASE_URL`, `DIRECT_URL`, `ADMIN_PASSWORD`).
3. El archivo `vercel.json` ejecuta `prisma migrate deploy` antes del build para aplicar migraciones en Supabase.

Tras el primer deploy, si quieres datos de ejemplo, desde tu máquina (con `.env` apuntando a Supabase):

```bash
npm run db:seed
```

---

## Personalización

### Datos de contacto y branding
Edita `src/components/layout/Footer.tsx` y `src/app/contacto/page.tsx`. Busca "Pleno Casa" / "PlenoCasa" para el nombre.

### Imágenes
En el admin, pega URLs (Unsplash, Cloudinary, imgBB, etc.), una por línea.

---

## Stack

- **Framework**: Next.js 14 (App Router)
- **Base de datos**: PostgreSQL (Supabase) via Prisma
- **Estilos**: Tailwind CSS
- **Fuentes**: Cormorant Garamond + Inter
