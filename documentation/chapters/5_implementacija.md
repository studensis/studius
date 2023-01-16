## 5.1 Korištene tehnologije i alati

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

### Automatizirani ispitni slučaj 1: Upis dostupnog kolegija

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

:[class](../diagrams/UMLComponent/component.pu)

## 5.4 Upute za puštanje u pogon <a name="5.4"> </a>

## 5.5 Izvođenje razvoja <a name="5.5"> </a>

U dogovoru s cijelom ekipom koja je radila na projektu (i pripadnim mentorima), radili bismo prateći tjedne sprintove uz prilagođen oblik SCRUM-a u alatu Notion

![Notion glavna stranica](./images/notion1.png)
![Notion stranica sa zadacima](./images/notion2.png)

Način organizacije koji smo odlučili koristiti kao razvojni tim je SCRUM.

### 5.5.1 Sprintovi <a name="5.5.1"> </a>

Sprintovi su tjedna ili dvotjedna razdoblja na čijem se početku određuje niz zadataka i tema na koje se fokusira većina razvojnog procesa.

### 5.5.2 Dnevnik sastanaka <a name="5.5.2"> </a>

**1. Sastanak**

- Datum: 3.10.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fuček
- Teme sastanka:
  - Okvirno određivanje projekta

**2. Sastanak**

- Datum: 21.10.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fuček
- Teme sastanka:
  - Razgovor o projektu s profesorom

**3. Sastanak**

- Datum:21.10.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fuček, Hary Samardžić, Luka Čulav
- Teme sastanka:
  - Podjela rada
  - Dogovor oko materijala za istraživanje

**4. Sastanak**

- Datum: 27.10.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Matija Fuček
- Teme sastanka:
  - Razgovor s profesorom

**5. Sastanak**

- Datum: 28.10.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fuček, Hary Samardžić
- Teme sastanka: - organizacija oko dovršetka MVP
  -Komentiranje nacrta baze

**6. Sastanak**

- Datum: 4.11.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fuček, Hary Samardžić, Luka Čulav
- Teme sastanka:
  - problemi sa Supabaseom, prelazak na Postgress
  - problemi s backendom (errori)

**7. Sastanak**

- Datum: 7.11.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fuček, Hary Samardžić
- Teme sastanka:
  - Arhitektura sustava
  - Potencijalno uvođenje mikroservisa

**8. Sastanak**

- Datum: 9.11.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fuček, Hary Samardžić, Luka Čulav
- Teme sastanka:
  - Razgovor s profesorom kako sustav funkcionira

**9. Sastanak**

- Datum: 11.11.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fuček, Hary Samardžić, Luka Čulav
- Teme sastanka:
  - Raspodjela poslova oko dokumentacije (obrasci uporabe, sekvencijskih dijagrami i baza)

**10. Sastanak**

- Datum: 8.12.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fuček, Hary Samardžić, Luka Čulav
- Teme sastanka:
  - Kritika dokumentacije
  - Mjesta za unaprijeđenje

**11. Sastanak**

- Datum: 12.12.2022.
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fuček, Hary Samardžić, Luka Čulav
- Teme sastanka: - Kritika dokumentacije
  - Mjesta za unaprijeđenje

**12. Sastanak**

- Datum: 15.12.2022
- Prisustvovali: Marko Supičić, Adrian Aničić, Franko Budimir, Matija Fuček, Hary Samardžić, Luka Čulav
- Teme sastanka:
  - Još nije održan

### 5.5.3 Tjedni / dvotjedni sastanci <a name="5.5.3"> </a>

Obično traju oko sat vremena. Cilj je imati viši pregled nad onime što je dovršeno u prethodnom sprintu te koji će zadaci ući u sljedeći sprint.

Kraj svakog sprinta obilježen je ovakvim sastankom, gdje gledamo koliko su uspješno bili postavljeni zadaci, koji su sve ciljevi postignuti te se reflektiramo na sam proces (što bi moglo biti bolje)

Bilješke ovakvih sastanaka vodimo kroz alat **Notion** te na temelju tih zapisnika na mjesečnoj bazi stvaramo dokument koji proslijeđujemo svim mentorima vezanim uz projekt.

### 5.5.6 Dnevni sastanci <a name="5.5.6"> </a>

Dnevni bi sastanci trebali trajati manje od 10 minuta svaki dan i nisu obavezni. Cilj je uskladiti zadatke koje svaki član rješava.

### 5.5.7 Mjesečni sastanci <a name="5.5.7"> </a>

Cilj ovih sastanaka je usklađivanje s mentorima iz raznih zavoda, te iznošenje i skupno razmišljanje o napretku te idućim koracima.

## 5.6 Proces izvedbe razvoja <a name="5.6"> </a>

Dijelovi projekta su već započeti, naime Korisničko Putovanje (User Journey), model baze podataka za osnovni set funkcionalnosti, te istraživanje tehnologija koje bismo primjenjivali.

### 5.6.1 Frontend tijek <a name="5.6.1"> </a>
