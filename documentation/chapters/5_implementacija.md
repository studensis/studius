## 5.1 Korištene tehnologije i alati <a name = "5.1"> </a>

Komunikacija u timu je realizirana primarno aplikacijom _**Slack**_, te po potrebi i _**WhatsAppom**_. Za izradu dokumentacije korišten je jezik _**Markdown**_, ta za izradu UML dijagrama korišteni su programi Figma, _**Visual Paradigm**_, te kasnije i _**PlantUML**_.

Kao razvojno okruženje korišten je Microsoftov _**Visual Studio Code**_. Kao sustav za upravljanje izvornim kodom korislitli smo _**Git**_. Udaljeni repozitorij projekta je dostupan na web platformi _**GitLab**_.

Cijela platforma je pisana jezikom _**Typescript**_, frontend je realiziran uporabom razvojnog okvira _**NextJS**_ koji je nadogradnja okruženja _**React**_, backend uporabom okvira _**ExpressJS**_ unutar okruženja NodeJS, te HTTP komunikacija između klijenta, frontend i backend poslužitelja putem _**TRPC**_ tehnologije (Typescript Remote Procedure Call).

Dizajn platforme stvoren je uporabom alata _**Figma**_, te je razvoj izgleda komponenti u sklopu Reacta bio realiziran _**Tailwind CSS**_ bibliotekom.

Backend smo poslužili putem _**Railway**_ servisa, frontend putem _**Vercela**_, pohranu podataka u _**PostgreSQL**_ bazi putem _**Supabase**_ servisa, te komunikaciju između Backenda i Baze podataka putem _**Prisma**_ ORM-a.

### 5.1.1 Reference <a name="5.1.1"> </a>

1. [https://www.whatsapp.com/](https://www.whatsapp.com/)
1. [https://www.slack.com/](https://www.slack.com/)
1. [https://www.markdownguide.org/](https://www.markdownguide.org/)
1. [https://www.visual-paradigm.com/](https://www.visual-paradigm.com/)
1. [https://plantuml.com/](https://plantuml.com/)
1. [https://code.visualstudio.com/](https://code.visualstudio.com/)
1. [https://git-scm.com/](https://git-scm.com/)
1. [https://gitlab.com/](https://gitlab.com/)
1. [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
1. [https://nextjs.org/](https://nextjs.org/)
1. [https://reactjs.org/](https://reactjs.org/)
1. [https://expressjs.com/](https://expressjs.com/)
1. [https://trpc.io/](https://trpc.io/)
1. [https://www.figma.com/](https://www.figma.com/)
1. [https://www.tailwindcss.com/](https://www.tailwindcss.com/)
1. [https://railway.app/](https://railway.app/)
1. [https://vercel.com/](https://vercel.com/)
1. [https://supabase.com/](https://supabase.com/)
1. [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
1. [https://www.prisma.io/docs](https://www.prisma.io/docs)

## 5.2 Ispitivanje programskog rješenja <a name="5.2"> </a>

Svi unit testovi pisani su uporabom biblioteke _**Jest**_. Ispitivanje se radilo po use caseovima koji se temelje na osnovnim funkcijama kreiranja, čitanja, uređivanja i brisanja svakog entiteta u sustavu. (UC6, UC7, UC10, UC19, UC20, UC21, UC22, UC23, UC24, UC26, UC27, te ostale metode manipulacije entiteta u sustavu, brojeći 63 u totalu).

Testovi su se pokazali korisni u koraku prije deploymenta na udaljena računala jer su male promjene u sustavu znale uzrokovat pojavu grešaka u nepovezanom dijelu koji je koristio zajednički dio koda. Temeljito pisanim testovima, ovakve greške su se vrlo brzo identificirale i popravile.

### 5.2.1 Automatizirani ispitni slučaj 1: Upis dostupnog kolegija <a name = "2.0"> </a>

Ulaz:

1. Stvaranje korisnika
2. Stvaranje kolegija
3. Upis korisnika u kolegij
4. Ponovni upis korisnika u kolegij

Očekivani rezultat:

1. Metoda vraća kreiranog korisnika
2. Metoda vraća kreiran kolegij
3. Metoda vraća instancu upisa (Enrollment object)
4. Metoda vraća pogrešku jer je korisnik već upisan

Rezultat: Očekivani rezultat (4.) nije zadovoljen obzirom da nije vraćena greška već je korisnik dvaput upisan na predmet

## 5.3 Dijagram razmještaja <a name="5.3"> </a>

Obzirom da nismo imali svoja računala za pokretanje poslužitelja, morali smo pronaći odgovarajuća rješenja u oblaku. Kako sama platforma sadrži Backend poslužitelj, Frontend poslužitelj, te Poslužitelj baze podataka, svaki dio zahtjeva određenu okolinu kako bi mogla nesmetano operirati.

:[class](../diagrams/UMLComponent/component.pu)
_[slika 5.1] slika dijagrama razmještaja_ <a name = "s5.1"> </a>

### 5.3.1 Razmještaj baze podataka

U samom početku razvoja nismo imali potrebu za razmještenje ni frontend ni backend poslužitelja na udaljena računala obzirom da smo sustav pokretali isključivo lokalno u svrhu razvoja.

Kako bismo lakše surađivali i mogli raditi na istim značajkama paralelno, odlučili smo upogoniti udaljenu bazu podataka. Na internetu smo naišli na Supabase koji nam se za našu veličinu platforme u trenutnoj fazi činio prikladan obzirom na manjak naplate.

### 5.3.2 Razmještaj backenda

Idući nam je korak bio, kako je platforma postajala sve kompleksnija, poslužiti i sam backend na udaljenom računalu. Nismo imali vlastito računalo na kojem je mogao poslužitelj raditi 24h dnevno. Ponovo smo se konzultirali s internetom, te naišli na servis pod imenom Railway.

Slično kao Supabase, Railway je pružao osnovne funkcionalnosti besplatno, pa smo tamo otvorili račun, spojili ga s Gitlabom putem Gitlab CI/CD pipelinea, i imali smo udaljen backend server koji je nesmetano radio i odazivao se na naredbe.

Pri svakom commitu na `main` branch, promjene bi propagirale i do Railwaya.

### 5.3.3 Razmještaj frontenda

Pred kraj projekta, morali smo i frontend poslužiti udaljeno. Frontend se od backenda razlikuje po tom što smo od samog početka znali servis na koji bismo ga poslužili, te je sama aplikacija bila pisana specifično na način da se posluži na Vercelovu serverless mrežu.

Tvorci razvojnog okruženja - Next.js - u kojem je pisan frontend, upravo je Vercel, time smo osigurali prvoklasnu potporu za upravljanje udaljenim poslužiteljem, što uključuje i motrenje prometa, inačicu za svaki commit, i još mnoštvo značajki. Najvažnija prednost je upravo i statička generacija HTML ljuski, što ubrzava pristup korisnika frontendu.

### 5.3.4 Međukomunikacija svih podsustava

U konačnici, sa svim podsustavima postavljenim na svoje okruženje imali smo funkcionirajuću platformu na koju se može pristupiti diljem svijeta.

Kada korisnik pristupi domeni definiranoj Vercelovim servisom, u radnu memoriju njegovog web preglednika se sprema React aplikacija, koja ima mogućnosti direktne komunikacije s backendom, koji pak služi kao posrednik između klijenta (ili frontend poslužitelja) i baze podataka.

## 5.4 Izvođenje razvoja <a name="5.4"> </a>

U dogovoru s cijelom ekipom koja je radila na projektu (i pripadnim mentorima), radili bismo prateći tjedne sprintove uz prilagođen oblik SCRUM-a u alatu Notion

![Notion glavna stranica](./images/notion1.png)
_[slika 5.2] slika alata Notion_ <a name = "s5.2"> </a>

![Notion stranica sa zadacima](./images/notion2.png)
_[slika 5.3] slika alata Notion_ <a name = "s5.3"> </a>

Način organizacije koji smo odlučili koristiti kao razvojni tim je SCRUM.

### 5.4.1 Sprintovi <a name="5.4.1"> </a>

Sprintovi su tjedna ili dvotjedna razdoblja na čijem se početku određuje niz zadataka i tema na koje se fokusira većina razvojnog procesa.

### 5.4.2 Dnevnik sastanaka <a name="5.4.2"> </a>

**1. Sastanak**

- Datum: 3.10.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fućek
- Teme sastanka:
  - Okvirno određivanje projekta

**2. Sastanak**

- Datum: 21.10.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fućek
- Teme sastanka:
  - Razgovor o projektu s profesorom

**3. Sastanak**

- Datum:21.10.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fućek, Hary Samardžić, Luka Čulav
- Teme sastanka:
  - Podjela rada
  - Dogovor oko materijala za istraživanje

**4. Sastanak**

- Datum: 27.10.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Matija Fućek
- Teme sastanka:
  - Razgovor s profesorom

**5. Sastanak**

- Datum: 28.10.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fućek, Hary Samardžić
- Teme sastanka: - organizacija oko dovršetka MVP
  -Komentiranje nacrta baze

**6. Sastanak**

- Datum: 4.11.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fućek, Hary Samardžić, Luka Čulav
- Teme sastanka:
  - problemi sa Supabaseom, prelazak na Postgress
  - problemi s backendom (errori)

**7. Sastanak**

- Datum: 7.11.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fućek, Hary Samardžić
- Teme sastanka:
  - Arhitektura sustava
  - Potencijalno uvođenje mikroservisa

**8. Sastanak**

- Datum: 9.11.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fućek, Hary Samardžić, Luka Čulav
- Teme sastanka:
  - Razgovor s profesorom kako sustav funkcionira

**9. Sastanak**

- Datum: 11.11.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fućek, Hary Samardžić, Luka Čulav
- Teme sastanka:
  - Raspodjela poslova oko dokumentacije (obrasci uporabe, sekvencijskih dijagrami i baza)

**10. Sastanak**

- Datum: 8.12.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fućek, Hary Samardžić, Luka Čulav
- Teme sastanka:
  - Kritika dokumentacije
  - Mjesta za unaprijeđenje

**11. Sastanak**

- Datum: 12.12.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fućek, Hary Samardžić, Luka Čulav
- Teme sastanka: - Kritika dokumentacije
  - Mjesta za unaprijeđenje

**12. Sastanak**

- Datum: 15.12.2022
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fućek, Hary Samardžić, Luka Čulav
- Teme sastanka:
  - Planiranje popisa značajki po prioritetu koje treba implementirati do kraja ciklusa

**13. Sastanak**

- Datum: 18.1.2023
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fućek, Hary Samardžić, Luka Čulav
- Teme sastanka:
  - Nadopunjivanje dokumentacije kako bi se upotpunila kvota prisutnih materijala; Raspodjela posla

**14. Sastanak**

- Datum: 19.1.2023
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fućek, Hary Samardžić, Luka Čulav
- Teme sastanka:
  - Predaja projekta i konzultacije oko nastavka rada na platformi

### 5.4.3 Tjedni / dvotjedni sastanci <a name="5.4.3"> </a>

Obično traju oko sat vremena. Cilj je imati viši pregled nad onime što je dovršeno u prethodnom sprintu te koji će zadaci ući u sljedeći sprint.

Kraj svakog sprinta obilježen je ovakvim sastankom, gdje gledamo koliko su uspješno bili postavljeni zadaci, koji su sve ciljevi postignuti te se reflektiramo na sam proces (što bi moglo biti bolje)

Bilješke ovakvih sastanaka vodimo kroz alat **Notion** te na temelju tih zapisnika na mjesečnoj bazi stvaramo dokument koji proslijeđujemo svim mentorima vezanim uz projekt.

### 5.4.4 Dnevni sastanci <a name="5.4.4"> </a>

Dnevni bi sastanci trebali trajati manje od 10 minuta svaki dan i nisu obavezni. Cilj je uskladiti zadatke koje svaki član rješava.

### 5.4.5 Mjesečni sastanci <a name="5.4.5"> </a>

Cilj ovih sastanaka je usklađivanje s mentorima iz raznih zavoda, te iznošenje i skupno razmišljanje o napretku te idućim koracima.

## 5.5 Upute za puštanje u pogon <a name = "5.5"> </a>

### 5.5.1 Preuzimanje repozitorija lokalno <a name = "5.5.1"> </a>

Odlaskom na Gitlab sjedište projekta Studius moguće je preuzeti lokalno cijeli repozitorij u obliku ZIP datoteke. Nakon preuzimanja, odpakirajte projekt na proizvoljno mjesto na Vašem osobnom računalu te pratite daljnja uputstva za postavljanje i pokretanje platforme.

### 5.5.2 Postavljanje baze podataka <a name = "5.5.2"> </a>

Prvi korak u pokretanju platforme je postavljanje baze podataka. Odabir baze podataka je proizvoljan, no obzirom da je odabir ekipa tijekom razvoja bio PostgreSQL, preporučili bismo korištenje istog.

Način posluživanja baze isto je tako proizvoljan, no u slijedećim koracima opisat ćemo kako pokrenuti PostgreSQL bazu putem servisa Supabase, te kako ju povezati na backend putem varijabla okruženja _Environment Variables_

**Otvaranja Supabase Računa**

U Vaš pretraživač upišite adresu [https://supabase.com/](https://supabase.com/), te slijedite korake za registraciju.

![Supabase 1](./images/supa1.png)
_[slika 5.4] slika otvaranja Supabase računa_ <a name = "s5.4"> </a>

**Stvaranje projekta**

Pritiskom na "New Project" stvorimo novi projekt unutar kojeg ćemo smjestiti bazu.

![Supabase 2](./images/supa2.png)
_[slika 5.5] slika1 stvaranja projekta u Supabase-u_ <a name = "s5.4"> </a>

Odabir imena je proizvoljan, no imajte na umu da odabir lozinke projekta će se kasnije koristiti pri spajanju na pazu. Odabir regije također je proizvoljan, no preporuča se odabir što bliže lokacije kako bi vrijeme odgovora bilo što kraće.

![Supabase 3](./images/supa3.png)
_[slika 5.6] slika1 stvaranja projekta u Supabase-u_ <a name = "s5.6"> </a>

**Spajanje backenda s bazom**

Nakon što smo uspješno stvorili projekt, i pričekali da se sam projekt automatski inicijalizira, možemo posjetiti Postavke projekta ili "Project Setting" za koje se link nalazi na lijevoj kontrolnoj površini, te pod sekcijom "Database" možemo pronaći "Connection string".

Postavljanjem "Connection Stringa" na URI, te izmjenom _[YOUR-PASSWORD]_ dijela niza znakova sa lozinkom kojom smo stvorili projekt, imamo spremnu poveznicu kojom će se backend spajati na bazu.

![Supabase 4](./images/supa4.png)
_[slika 5.7] slika spajanja backenda s bazom_ <a name = "s5.5"> </a>

### 5.5.3 Postavljanje backend i frontend poslužitelja <a name = "5.5.3"> </a>

Nakon što je repozitorij preuzet te je postavljana baza podataka, možemo krenuti s postavljanjem samog Backenda.

Unutar korijenskog direktorija, potvrdimo da postoje direktoriji backend i frontend. Unutar backend direktorija bi se trebala nalaziti `.env` datoteka, unutar koje se nalaze varijable `DATABASE_URL` i `JWT_SECRET_KEY`. DATABASE_URL je potrebno postaviti na URI koji smo u prethodnoj pod-cjelini izvadili iz Supabasea-a, te JWT_SECRET_KEY je potrebno postaviti na proizvoljan niz nasumičnih znakova (koji se koriste u ovjeravanju JWT tokena pri autentifikaciji).

Postavljanje za lokalno okruženje je ovim korakom dovršeno, jedino je preostalo preuzeti programsku potporu kako bismo bili spremni pokrenuti platformu.

### 5.5.4 Postavljanje programske potpore <a name = "5.5.4"> </a>

Prije instalacije programske podrške potrebno je instalirati Node.JS, te menadžer paketa za Node.js okruženje. Krenimo prvo s samim Node.js-om.

**Instaliranje Node.js-a i Yarna**

Prateći ovu poveznicu: [https://nodejs.org/en/](https://nodejs.org/en/) posjećujemo službeno web sjedište Node organizacije. Ovdje nam se generalno nude dvije opcije _LTS_, te _Current_, bitno je preuzeti Node verziju 18.8 ili višu kako bi se sve komponente sustava uobičajeno ponašale. Naputak: preporučamo instalaciju LST verzije obzirom da je stabilnija te je osigurana višegodišnja podrška.

![Supabase 3](./images/node1.png)
_[slika 5.8] slika instalacije Node.js-a_ <a name = "s5.8">

Osim Nodea, potrebno je odabrati i menadžer paketa za Node ekosustav. Danas postoje tri najčešće opcije: NPM, Yarn, te PNPM. Mi smo se odlučili za Yarn zbog prethodnog iskustva rada u istom.

Instalacija Yarna, nakon instalacije Nodea je prilično jednostavna. Potrebno je samo upisati slijedeću naredbu u naredbeni redak.

```
npm install --global yarn
```

Kada je Yarn uspješno instaliran, unutar naredbenog retka se treba pozicionirati u korijenski direktorij, te pokrenuti naredbu

```
yarn
```

te

```
yarn rebuild
```

### 5.5.5 Pokretanje platforme <a name = "5.5.5"> </a>

Kada su obje naredbe iz prethodnog koraka završile s obradom, potrebno je stvoriti jednog _SUPERADMIN_ korisnika koji će predstavljati vlasnika platforme s najvišom razinom prava.

Kako bismo ubacili korisnika u bazu dovoljno je napisati naredbu

```
yarn studio
```

te unutar korisničkog sučelja navigirati u tablicu _"Users"_

![Pokretanje 1](./images/node2.png)
_[slika 5.9] slika popisa modela u bazi_ <a name = "s5.9"> </a>

Zatim stvoriti korisnika s _"userRole"_ stavkom postavljenom na "SUPERADMIN", te s ostalim proizvoljno odabranim podacima. Nakon izmjena, potrebno ih je potvrditi pritiskom na dugme "Save 1 change"

![Pokretanje 2](./images/node3.png)
![Pokretanje 3](./images/node4.png)
_[slika 5.10] slika prikaza Usera u bazi_ <a name = "s5.10"> </a>

Spremni smo pokrenuti platformu!

Pokretanjem naredbe

```
yarn dev
```

u korijenskom direktoriju uspješno je pokrenuta platforma na adresi `http://localhost:3000`, te možemo u naredbenom retku pratiti promet.

![Pokretanje 4](./images/term1.png)
_[slika 5.11] slika pokretanje backenda naredbom yarn_ <a name = "s5.11"> </a>

![Pokretanje 4](./images/term2.png)
_[slika 5.12] slika stranice za prijavu_ <a name = "s5.12"> </a>
![Pokretanje 4](./images/term3.png)
_[slika 5.13] slika početne stranice_ <a name = "s5.13"> </a>
