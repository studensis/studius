This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

PROJECT INIT
npx create-next-app@latest --example with-tailwindcss --ts --use-npm <ime>
npm run dev

SUPABASE QUICKSTART
https://supabase.com/docs/guides/with-nextjs

GIT
git clone <link>
git remote add origin <link> // ne?
(editas sta treba)
git add .
git commit -m "poruka"
git push (al zapravo ovo dolje jer ovo nece dat)
git push --set-upstream origin main

POSTGRES & PRISMA
instaliraj dbadmin skupa s ostalim sranjima
instaliraj dependencies odavde, najbitnije prisma
npx prisma init
npx prisma db push // ak mijenjas modele onda bome izbrisi tablice i ovo opet pushaj
npx prisma studio

npx prisma generate // svaki put kad se schema promijeni
