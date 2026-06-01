# Inmobiliaria Cilleros — Web

Next.js + TypeScript + Tailwind. Modo demo: propiedades en `src/data/properties.ts`, sin base de datos.

## Desarrollo local

```bash
npm install
cp .env.example .env   # opcional: ADMIN_PASSWORD
npm run dev
```

- Web: [http://localhost:3000](http://localhost:3000)
- Admin: `/admin` (contraseña `ADMIN_PASSWORD`)

## Despliegue

Repositorio: **https://github.com/carloszr24/ap-real-estate**

Conectado a Vercel (`ap-real-estate.vercel.app`). Variables recomendadas:

- `ADMIN_PASSWORD` — acceso al panel `/admin`

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
