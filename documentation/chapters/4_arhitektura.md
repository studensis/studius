Repozitorij Studiusa organiziran je kao `monorepo` što znači da su nam Frontend i Backend smješteni u poddirektorjima.

Arhitektura se može podijeliti na tri glavne cjeline:

1. Klijentska aplikacija
2. Frontend poslužitelj
3. Backend poslužitelj (API gateway)
4. Baza podataka

## Frontend

Klijentski poslužitelj je program koji korisniku poslužuje Klijentsku aplikaciju koja obavlja velik dio logike na samom računalu korisnika.

Klijentska aplikacija je načinjena od statički generirane HTML ljuske te uz poslani Javascript paket koji hidrira ljusku dobivena stranica poprima cijelu funkcionalnost. Dobivena stranica na klijentu pruža sučelje za komunikaciju s ostatkom sustava.

Frontend servis, zahvaljujući na korištenju NextJS-a kao radnog okvira, je optimizirana za što veće performanse i minimalno kašnjenje kroz uporabu caching metoda (Incremental Static Regeneration), Reactovim server-renderiranim komponentama, i mnoštvu drugih naprednih metoda.

Sam Next.JS je nadogradnja okruženja React koje omogućuje pisanje komponenti korištenjem specifičnog jezika koji se zove JSX. JSX omogućava pisanje kôda kao što je HTML, no može se kombinirati s JavaScriptom. React će pretvoriti kôd u virtualni DOM te na kraju isporučiti HTML za korisnika.

Sama klijentka aplikacija je dizajnirana po vizualnim načelima dobrog UX i UI dizajna kako bi korisnik imao što manje trenja u realizaciji svojih ideja. Stiliranje u frontendu olakšano je korištenjem **Tailwind** biblioteke za dinamičku uporabu CSS jezika.

Cijeli kod je pisan sa velikom pažnjom na integritet tipova podataka, pa je tako putem biblioteke **TRPC** (više o tome kasnije) realizirana sama komunikacija između frontenda i backenda.

## Backend

Backend je pisan u tehnologiji Node.JS, te su korištene i slijedeće biblioteke:

- Express.JS
  - Pomoću ove biblioteke je ostvarena sama HTTP komunikacija
- TRPC (Typescript Remote Procedure Call)
  - Kada se u frontendu stvara poziv na backend tradicionalna metoda podrazumijeva pozivanje HTTP zahtjeva na URL, pa ručno tumačenje dobevenog rezultata. Takav proces bi bio vremenski intenzivan i podložan greškama
  - Korištenjem ove biblioteke u frontendu importamo Typescript tipove svake metode na backendu, osiguravajući autmatsko tipiranje svakog metode zajedno s njenim parametrima i mogućim povratnim podacima
- Prisma (Object Relational Mapping Library)
  - Putem ove biblioteke backend komunicira s proizvoljnom bazom putem svojeg jezika.
  - Kroz Prismu je pisana shema baze, te smo odabrali Postgres kao bazu u kojoj je spomenuta shema realizirana

Struktura backenda je osmišljena na slijedeći način:

- unutar `src` direktorjia se nalazi cijeli kod
- unutar `controllers` direktorij se nalazi globalna logika, nepovezana uz neki pojedini entitet u sustavu
- unutar `domain` direktorija se nalazi svaki Entitet u sustavu
  - za primjer ovakvog entiteta uzmimo **Usera**
  - Userov direktorij sadrži poddirektorije `interactors`, `model`, `repository`, `tests`, `userRouter`
  - **Interactors** direktorij sadrži sve use caseove za usera, npr. "Stvori Usera" koji principom "dependency injectiona" poprima repozitorij, te na njega djeluje po nekoj "business logici" koja je sadržana u svakoj interactor datoteci.
  - **model** direktorij sadrži definiciju entiteta User i njegove članske varijable
  - **repository** direktorij sadrži datoteku s apstraktnim sučeljem za repozitorij, te njegovu implementaciju u proizvoljnoj tehnologiji (većinom putem Prisma biblioteke)
  - **tests** direktorij sadrži jedinične testove za svaki interaktor
  - **userRouter** direktorij sadrži uputstva za TRPC o metodama koje su definirane za User entitet

```
src/
├── config/
├── controllers/
│   ├── middleware/
│   ├── auth.ts
│   ├── router.ts
│   └── trpc.ts
├── services/
│   ├── authentication/
│   │   └── authRouter/
│   │   │   ├── index.ts
│   │   │   ├── loginRoutine.ts
│   │   │   ├── logoutRoutine.ts
│   │   │   └── meRoutine.ts
├── domain/
│   ├── User/
│   │   ├── interactors/
│   │   │   └── createUserInteractor.ts
│   │   ├── model/
│   │   │   └── UserEntity.ts
│   │   ├── repository/
│   │   │   └── UserRepository.ts
│   │   │   └── UserRepositoryPrisma.ts
│   │   ├── tests/
│   │   │   └── index.ts
│   │   └── userRouter/
│   │   │   └── index.ts
│   └── <EntityName>/
│       └── ...
├── utils/
└── index.ts
```

## 4.1 Baza podataka <a name="4.1"> </a>

Za potrbe našeg projekta smo koristili biblioteku zvanu Prisma, te Postgres bazu podataka.

Za rad sa prismom potreban je `prisma.schema` datoteka unutar koje su popisani svi entiteti u bazi, te njihovi atributi zajedno s tipom podatka te defaultnom vrijednosti.

Prisma pri pokretanju određenog skupa naredbi generira SQL kod putem kojeg komunicira s bazom koja je poslužena na proizvoljnom URL-u.

Naša shema opisana je u slijedećem dijagramu baze.

![baza_podataka](./images/skica_bp.png)

:[html_baza](../images/Baza-raspisano.html)

## 4.2 Dijagram razreda <a name="4.2"> </a>

:[class](../diagrams/UMLClass/class.pu)

Razred Content predstavlja vidljiv sadržaj u aplikaciji (opise, slike...). Razred subject predstavlja kolegij na fakultetu, ima enumeraciju "semester" koja sadrži zimski i ljetni semestar.

Razred status predstavlja predaje li se taj predmet trenutno ili je npr. iz starog programa.

Razred Enrollment predstavlja vezu između predmeta i korisnika, ima enumeraciju "subjectRole" koja definira koju ulogu korisnik ima s predmetom, dali je student, demonstrator, asistent, profesor ili nositelj.

Razred User predstavlja korisnika, ima enumeraciju "userType" koja sadrži stavke default(primjerice studenti i profesori), admin(primjerice članovi studentske službe) te superadmin(programeri koji su odgovorni za uzdržavanje sustava).

Razred Seminar predstavlja seminare koji se izvode na nekom predmetu, može ih biti proizvoljan broj na jednom predmetu, povezan je s prijedlogom za seminar (razred SeminarSuggestion).

Seminar je povezan 1:1 vezom s Razredom Event koji predstavlja događaj. Event je povezan s Razredom RoomTimeEvent koji opisuje koji se događaj izvodi u koje vrijeme u kojoj dvorani.

Dvorane su opisane razredom Room. Seminar mora imati doktoranda koji ga izvodi (Razred Doktorand), on mora imati mentora.

Razred Post predstavlja objavu, sadrži svoj Content. Koji može među ostalim tematski pripadati predmetu ili seminaru, što se vidi u enumeraciji "LinkedEntity".

## 4.3 Dijagram stanja <a name="4.3"> </a>

![class](./diagrams/UMLState/DijagramStanja.vpd.svg)

Dijagram stanja prikazuje stanja objekta te prijelaze iz jednog stanja u drugo temeljene na dogadajima. Na slici je prikazan dijagram stanja za superadmina.
Nakon prijave, superadminu se prikazuje početna stranica na kojoj može pregledati nadolazeće eventove, podatke o korisnicima i popis svih predmeta.
Bitno je naglasiti da se iz bilo kojeg stanja može doći na bilo koje od većih stanja kao što su: "Homepage", "Events", "Seminars", "Workspace tools" te sliku profila.
"Events" dodatno prikazuje vlastiti kalendar i nadolazeće eventove, "Seminars" prikazuje listu nadolazećih seminara, klik na sliku profila nudi "log out", paljenje i gašenje dark mode, i "view profile" vraća podatke o korisniku, upisane predmete i mogućnost brisanja računa. "Workspace tools" kao najkompleksnije stanje ima mogućnost ćitanja, unosa, brisanja i uređivanja baze.

## 4.4 Dijagram aktivnosti <a name="4.4"> </a>

![class](./diagrams/UMLActivity/DijagramAktivnosti.vpd.svg)

Dijagram aktivnosti primjenjuje se za opis modela toka upravljanja ili toka podataka. U
modeliranju toka upravljanja svaki novi korak poduzima se nakon zavrsenog prethodnog, a naglasak je na jednostavnosti.
Na dijagramu aktivnosti je prikazan proces dogovaranja seminara. Mentor se prijavi u sustav, odabere jedan od predmeta
na kojima predaje i jednog studenta na tom predmetu. Zatim predloži temu seminara koji će student odraditi. Nakon toga se student ulogira i za temu koju mu je profesor predložio
preda sadržaj seminara. Na posljetku mentor odobri taj seminar.

## 4.5 Dijagram komponenti <a name="4.5"> </a>
