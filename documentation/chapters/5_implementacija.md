## 5.1 Korištene tehnologije i alati

Development frontenda bi bio baziran na dizajnu izrađenom u **Figmi**. Definiran bi bio kompletan Design System, i svaka nova komponenta bi bila dokumentirana.

Frontend bi bio implementiran koristeći React, posebno **NextJS** uz **Typescript**. Za stilove bi bio korišten **Tailwind** CSS.

Backend bi bio pisan u **Nodeu** kroz Typescript, te bismo koristili **Supabase** kao rješenje za pohranu podataka.

Većina funkcionalnosti na frontu bi bila zamotana kroz **Serverless** APIje, koje nam omogućuje hostanje preko **Vercela** (kreatori NextJS-a)

Komunikacija u time je realizirana korištenjem aplikacija WhatsApp i Slack. Za izradu UML dijagrama korišteni su alati Figma, Visual Paradigm u početku, a kasnije smo se prebacili na PlantUML radi efikasnosti. Kao sustav za upravljanje izvornim kodom Git. Repozitorij projekta je dostupan na web platformi GitLab. Kao razvojno okruzenje korišten je Microsoft Visual Studio - integrirano je razvojno okruzenje (IDE) tvrtke Microsoft. Prvenstveno se koristi za razvoj računalnih programa za operacijski sustav Windows, kao i za web-stranice, web-aplikacije, web-usluge i mobilne aplikacije. Visual Studio za razvoj softvera koristi Microsoftove platforme kao sto su Windows API, Windows Forms, Windows Presentation Foundation, Windows Store i Microsoft Silverlight. Aplikacija je napisana koristeci radni okvir Express, Node.js framework za izradu backenda te Nextjs, Javascript framework za izradu frontenda. Nextjs, je biblioteka u JavaScriptu za izgradnju korisnickih sucelja. Ima sve identično kao React uz još neke nadodane funkcionalnosti. React se najčešćce koristi kao osnova u razvoju web ili mobilnih aplikacija. Složene aplikacije u Reactu obično zahtijevaju korištenje dodatnih biblioteka za interakciju s API-jem. Baza podataka se nalazi na posluzitelju u oblaku Microsoft Azure ˇ

### 5.1.1 Reference <a name="5.1.1"> </a>

1. https://www.whatsapp.com/
2. https://www.visual-paradigm.com/
3. https://gitlab.com/
4. https://visualstudio.microsoft.com/
5. https://reactjs.org/
6. https://www.javascript.com/
7. https://supabase.com/
8. https://www.w3schools.com/js/
9. https://nextjs.org/docs
10. https://next-auth.js.org/
11. https://www.prisma.io/docs
12. https://www.postgresql.org/docs/

## 5.2 Ispitivanje programskog rješenja <a name="5.2"> </a>

## 5.3 Dijagram razmještaja <a name="5.3"> </a>

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

## 5.7 Upute za puštanje u pogon

### 5.7.1 Lokalno puštanje u pogon

![Konzola](./images/konzola.jpg)
Slika: Konzola u Visual Studio Code

Najpopularniji paket menadžer je Node Package Manager - NPM, no mi smo koristili Yarn. Smatramo da je brži i jednostavniji za korištenje.
U konzoli smo imali 4 terminala, za pokretanje backend poslužitelja, frontend poslužitelja, Prisma poslužitelja te za korištenje Gita. Backend i Frontend poslužitelj pokreću se naredbom yarn dev.
