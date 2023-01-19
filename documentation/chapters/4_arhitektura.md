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
slika baze podataka <a name = "4.1 slika1"> </a>

### User

**User** entitet sadrži važne informacije o korisnicima sustava. Vezom One-to-many vezano je za entitet Content, te je refleksivno vezan One-to-Many vezan za User entitet (Mentor – Mentee veza).

| Naziv polja | Tip podatka | Opis polja                                             |
| ----------- | ----------- | ------------------------------------------------------ |
| **id**      | VARCHAR     | Jedinstveni identifikacijski string korisnika, uuid()  |
| Password    | VARCHAR     | Lozinka korisnika                                      |
| Firstname   | VARCHAR     | Ime korisnika                                          |
| Lastname    | VARCHAR     | Prezime korisnika                                      |
| Jmbag       | VARCHAR     | Za sve korisnike osim studenata ima vrijednost NULL    |
| ContentId   | VARCHAR     | Content.id                                             |
| Email       | VARCHAR     | e-mail korisnika                                       |
| userRole    | Role        | Korisnikova uloga na sustavu                           |
| mentorId    | VARCHAR     | ID mentora koji može biti dodijeljen studentu(user.id) |
| avatar      | VARCHAR     | URI profilne slike koju korisnik koristi               |

### Subject

**Subject** entitet sadržava bitne informacije o kolegijima na fakultetu. Vezom One-to-many vezan je za entitet Content

| Naziv polja | Tip podatka | Opis polja                                                         |
| ----------- | ----------- | ------------------------------------------------------------------ |
| **Id**      | VARCHAR     | Jedinstveni identifikacijski string kolegija, uuid()               |
| title       | VARCHAR     | Naziv kolegija                                                     |
| description | VARCHAR     | Kratki opis kolegija                                               |
| ectsBod     | VARCHAR     | ects opterecenje kolegija                                          |
| Semester    | Semester    | Kojem semestru pripada kolegij (SUMMER,WINTER)                     |
| Status      | VARCHAR     | Status kolegija, da li ga je moguće upisati ili se više ne predaje |
| contentId   | VARCHAR     | Content.id                                                         |

### Enrollment

**Enrollment** entitet predstavlja instancu upisa na određeni kolegij. Povezan je sa Many-to-one vezama za User I Subject entitete.

| Naziv polja     | Tip podatka | Opis polja                                              |
| --------------- | ----------- | ------------------------------------------------------- |
| **Id**          | VARCHAR     | Jedinstveni identifikacijski string enrollmenta, uuid() |
| userId          | VARCHAR     | User.ID                                                 |
| subjectId       | VARCHAR     | Subject.Id                                              |
| roleTitle       | SubjectRole | Uloga koju upisani korisnik ima na kolegiju             |
| Enrollment_date | DATETIME    | Datum ostvarenja upisa                                  |
| Status          | VARCHAR     | Označava status pojedinog upisa (aktivan, arhiviran)    |

### Seminar

**Seminar** entitet sadrži važne informacije o seminarima koji doktorandi predaju na sustav. Povezan je One-to-one vezom sa entitetom Content, Many-to-one vezom sa entitetom Subject, te Many-to-One sa Userom

| Naziv polja | Tip podatka   | Opis polja                                                |
| ----------- | ------------- | --------------------------------------------------------- |
| **Id**      | VARCHAR       | Jedinstveni identifikacijski string seminara, uuid()      |
| Title       | VARCHAR       | Naslov seminara                                           |
| Description | VARCHAR       | Kratki opis seminara                                      |
| mentorId    | VARCHAR       | Jedinstveni identifikacijski broj mentora (user.mentorId) |
| Status      | SeminarStatus | Status seminara                                           |
| contentId   | VARCHAR       | Content seminara (content.id)                             |
| subjectId   | VARCHAR       | Subject.id                                                |
| userId      | VARCHAR       | User.id                                                   |

### Event

**Event** entitet sadrzi vazne informacije o događajima na fakultetu (seminari, predavanje, talkovi,…).

| Naziv polja    | Tip podatka  | Opis polja                                         |
| -------------- | ------------ | -------------------------------------------------- |
| **Id**         | VARCHAR      | Jedinstveni identifikacijski string eventa, uuid() |
| Title          | VARCHAR      | Ime eventa                                         |
| Description    | VARCHAR      | Kratki opis eventa                                 |
| LinkedEntity   | LinkedEntity | Entitet za koji je Event vezan                     |
| LinkedEntityId | VARCHAR      | Id entiteta za koji je Event vezan                 |
| Status         | Status       | Status eventa                                      |

### Room

**Room** entitet sadrži važne informacije o dvoranama I prostorijama na fakultetu. One-to-Many vezom je spojen sa entitetom RoomTimeEvent.

| Naziv polja | Tip podatka | Opis polja                                           |
| ----------- | ----------- | ---------------------------------------------------- |
| **Id**      | VARCHAR     | Jedinstveni identifikacijski broj prostorije, uuid() |
| Title       | VARCHAR     | Naziv prostorije                                     |
| Capacity    | INT         | Kapacitet prostorije                                 |

### RoomTimeEvent

**RoomTimeEvent** entitet sadrži važne informacije o održavanju događaja na fakultetu. Spaja događaj sa prostorom I vremenom održavanja. Many-to-one vezama je spojen sa entitetima Room I Event.

| Naziv polja | Tip podatka | Opis polja                                                      |
| ----------- | ----------- | --------------------------------------------------------------- |
| **Id**      | VARCHAR     | Jedinstveni identifikacijski string održavanja događaja, uuid() |
| dateStart   | DATETIME    | Vrijeme početka događaja                                        |
| dateEnd     | DATETIME    | Vrijeme završetka događaja                                      |
| Status      | Status      | Status RoomTimeEventa                                           |
| Event_ID    | INT         | Event.event_ID                                                  |
| Room_ID     | INT         | Room.room_ID                                                    |

### PinnedEvent

**PinnedEvent** entitet koji sadržava bitne informacije o seminaru koji nositelji odabiru kao prijedlog za studente svojeg predmeta. Vezom One-to-one vezan je za entitete Seminar I Subject

| Naziv polja | Tip podatka | Opis polja                                              |
| ----------- | ----------- | ------------------------------------------------------- |
| **Id**      | VARCHAR     | Jedinstveni identifikacijski broj oglasa eventa, uuid() |
| subjectId   | VARCHAR     | Seminar.id                                              |
| eventId     | VARCHAR     | Event.id                                                |

### EventUserPresence

**EventUserPresence** entitet sadrži bitne informacije o prisutnosti studenata na događajima gdje se njihova prisutnost očekuje. Many-to-one vezom je spojena sa User entitetom te Many-to-One vezom je spojena na RoomTimeEvent entitet.

| Naziv polja     | Tip podatka | Opis polja                               |
| --------------- | ----------- | ---------------------------------------- |
| **Id**          | VARCHAR     | Identifikacijski broj evidencije, uuid() |
| presenceStatus  | BOOL        | True/False, je li student bio prisutan   |
| RoomTimeEventId | VARCHAR     | RoomTimeEvent.id                         |
| userId          | VARCHAR     | User.id                                  |

### Content

| Naziv polja    | Tip podatka  | Opis polja                                                                                     |
| -------------- | ------------ | ---------------------------------------------------------------------------------------------- |
| **Id**         | VARCHAR      | Identifikacijski string sadržaja, uuid()                                                       |
| Markdown_text  | VARCHAR      | Sadržaj obavijesti ili informacije o predmetu zapisane u Markdown alatu za formatiranje teksta |
| plainText      | VARCHAR      | Zapis sadržaja u običnom text formatu                                                          |
| Date           | DATETIME     | Datum stvaranja sadržaja                                                                       |
| LinkedEntity   | LinkedEntity | Za koji od entiteta (Subject, Seminar, User) je content vezan                                  |
| LinkedEntityId | VARCHAR      | Id entiteta za koji je content vezan                                                           |

**Content** entitet sadržava relevantne podatke o sadržaju, te sam sadržaj obavijesti te informacija o kolegijima I seminarima.

### Post

**Post** entitet sadrži sve relevantne podatke o obavijestima unutar sustava. Povezan je One-to-One vezom sa entitetom Content, te Many-to-one vezom sa entitetom User.

| Naziv polja    | Tip podatka  | Opis polja                                                     |
| -------------- | ------------ | -------------------------------------------------------------- |
| **Id**         | VARCHAR      | Identifikacijski string objave, uuid()                         |
| Title          | VARCHAR      | Naslov objave                                                  |
| Date           | DATETIME     | Datum stvaranja objave                                         |
| LinkedEntity   | LinkedEntity | Za koji od entiteta (Subject, Seminar, User) je objava vezana  |
| LinkedEntityID | VARCHAR      | Identifikacijski broj (uuid) entiteta za koji je objava vezana |
| ContentId      | VARCHAR      | Content.id                                                     |
| OwnerId        | VARCHAR      | User.id korisnika koji je napravio Post                        |

## 4.2 Dijagram razreda <a name="4.2"> </a>

Razred Content predstavlja vidljiv sadržaj u aplikaciji (opise, slike...). Razred subject predstavlja kolegij na fakultetu, ima enumeraciju "semester" koja sadrži zimski i ljetni semestar.

Razred status predstavlja predaje li se taj predmet trenutno ili je npr. iz starog programa.

Razred Enrollment predstavlja vezu između predmeta i korisnika, ima enumeraciju "subjectRole" koja definira koju ulogu korisnik ima s predmetom, dali je student, demonstrator, asistent, profesor ili nositelj.

Razred User predstavlja korisnika, ima enumeraciju "userType" koja sadrži stavke default(primjerice studenti i profesori), admin(primjerice članovi studentske službe) te superadmin(programeri koji su odgovorni za uzdržavanje sustava).

Razred Seminar predstavlja seminare koji se izvode na nekom predmetu, može ih biti proizvoljan broj na jednom predmetu, povezan je s prijedlogom za seminar (razred SeminarSuggestion).

Seminar je povezan 1:1 vezom s Razredom Event koji predstavlja događaj. Event je povezan s Razredom RoomTimeEvent koji opisuje koji se događaj izvodi u koje vrijeme u kojoj dvorani.

Dvorane su opisane razredom Room. Seminar mora imati doktoranda koji ga izvodi (Razred Doktorand), on mora imati mentora.

Razred Post predstavlja objavu, sadrži svoj Content. Koji može među ostalim tematski pripadati predmetu ili seminaru, što se vidi u enumeraciji "LinkedEntity".

:[class](../diagrams/UMLClass/class.pu)
slika dijagrama razreda <a name = "4.2 slika1"> </a>

## 4.3 Dijagram stanja <a name = "4.3"> </a>

Dijagram stanja prikazuje stanja objekta te prijelaze iz jednog stanja u drugo temeljene na dogadajima. Na slici je prikazan dijagram stanja za superadmina.
Nakon prijave, superadminu se prikazuje početna stranica na kojoj može pregledati nadolazeće eventove, podatke o korisnicima i popis svih predmeta.
Bitno je naglasiti da se iz bilo kojeg stanja može doći na bilo koje od većih stanja kao što su: "Homepage", "Events", "Seminars", "Workspace tools" te sliku profila.
"Events" dodatno prikazuje vlastiti kalendar i nadolazeće eventove, "Seminars" prikazuje listu nadolazećih seminara, klik na sliku profila nudi "log out", paljenje i gašenje dark mode, i "view profile" vraća podatke o korisniku, upisane predmete i mogućnost brisanja računa. "Workspace tools" kao najkompleksnije stanje ima mogućnost ćitanja, unosa, brisanja i uređivanja baze.

![class](./diagrams/UMLState/DijagramStanja.vpd.svg)
slika dijagrama stanja <a name = "4.3"> </a>

## 4.4 Dijagram aktivnosti <a name="4.4"> </a>

Dijagram aktivnosti primjenjuje se za opis modela toka upravljanja ili toka podataka. U
modeliranju toka upravljanja svaki novi korak poduzima se nakon zavrsenog prethodnog, a naglasak je na jednostavnosti.
Na dijagramu aktivnosti je prikazan proces dogovaranja seminara. Mentor se prijavi u sustav, odabere jedan od predmeta
na kojima predaje i jednog studenta na tom predmetu. Zatim predloži temu seminara koji će student odraditi. Nakon toga se student ulogira i za temu koju mu je profesor predložio
preda sadržaj seminara. Na posljetku mentor odobri taj seminar.

![class](./diagrams/UMLActivity/DijagramAktivnosti.vpd.svg)
slika dijagrama aktivnosti <a name = "4.4 slika1"> </a>

## 4.5 Dijagram komponenti <a name="4.5"> </a>

Dijagram komponenti prikazan na slici opisuje organizaciju i ovisnost pojedinih komponenti. Sustav je podijeljen na 4 cjeline: Baza podataka, Backend server, Frontend server, i dio aplikacije koji se vrti na računalu korisnika.

### Backend server

Backend server se isključivo bavi dodjeljivanjem pristupa određenim podatcima ovisno o ulozi korisnika. Podatci su definirani kroz domenu sustava koja predstavlja skup entiteta: User, Subject, Event, ... Svaki od navedenih entiteta ima definirana četiri sloja koji ima svoju ulogu.

**Model** entiteta je definiran pomoću Prisma biblioteke automatski temeljeno na shemi baze podataka, te se koristi u slijedećim slojevima.

**Interactor** entiteta, preuzima ulogu tradicionalnog "Controllera" te je u njemu definirana "business logika" putem koje se određuje koje su akcije dopuštene ovisno o primjerice ulozi korisnika koji ju pokušava obaviti. Interactori su definirani putem svakog Use Casea spomenutog u prethodnim poglavljima.

**Repository** entiteta je sučelje putem kojeg se u proizvoljnom Interactoru pristupa bazi podataka. Sam Repository nasljeđuje sučelje definirano za svaki model (UserRepository), te je implementirano da ili koristi prismu kao način pristupa bazi pod imenom npr. (UserRepositoryPrisma) ili ako pristupa simulaciji baze u memoriji bi bilo pod imenom UserRepositoryInMemory, što se pokazalo korisno u pokretanju testova.

Posljednji dio svakog entiteta je **TRPC Procedures** koji je u biti riječnik koji sadrži svaku metodu za dan entity pod imenom koje bi se koristilo pri zvanju metode. Primjerice `domena.com/user.getAllUsers`

TRPC router svakog entiteta je povezan u glavni AppRouter (TRPC Router) koji je povezan s Express.JS bibliotekom putem koje se ostvaruje HTTP komunikacija.

### Frontend server

Frontend server je zadužen za dostavljanje svih resursa Web Browseru. Skup svih stranica dostupnih korisniku je ovdje definiran unutar NextJS-ovog routera.

Također je unutar Frontend servera sadržan i TRPC klijent. Razlog zašto postoji TRPC klijent i na frontend serveru i u Web browseru je kako bi sam Frontend server mogao prikupljati podatke s backenda periodično i spremati "zapečene" stranice kako bi bile korisniku puno brže dostupne. Više o ovoj tehnologiji možete pročitati ovdje: [https://nextjs.org/docs/advanced-features/automatic-static-optimization](https://nextjs.org/docs/advanced-features/automatic-static-optimization)

### Web browser

Inicijalnim zahtjevom korisnika za pristup Frontend serveru se učitava Javascript bundle koji se na računalo sprema u memoriji te sadrži React kako bi navigacija stranicom bila dinamičnija i brža.

Inicijalni i svaki idući zahtjev dostavlja HTML ljusku Web browseru (sa zapečenim dijelovima kao što su popis svih Predmenta), te se naknadno dobiva i novi Javascript bundle putem kojeg se HTML ljuska hidrira i podatci se mogu obnoviti.

Obzirom da svaki zahtjev podatcima ovisi o samom korisniku i njegovu računu, TRPC klijent koji se nalazi u Web browseru, pomoću session kolačića direknto komunicira s Backendom i tamo se dalje gleda koji podatci i akcije su omogućene korisniku.

![class](./diagrams/UMLComponent/cmp.svg)
slika dijagrama komponenti <a name = "4.5 slika1"> </a>
