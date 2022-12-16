Arhitektura se može podijeliti na tri glavne cjeline:

1. Klijentska aplikacija
2. Frontend servis
3. Backend podsustavi

Klijentska aplikacija je program koji korisniku pruža sučelje za komunikaciju s ostatkom sustava. Sama aplikacija je dizajnirana po vizualnim načelima dobrog UX i UI dizajna kako bi korisnik imao što manje trenja u realizaciji svojih ideja.

Frontend servis, zahvaljujući na korištenju NextJS-a kao radnog okvira, sama web aplikacija bi bila optimizirana za što veće performanse i minimalno kašnjenje kroz uporabu caching metoda i pre-renderiranim komponentama.

Backend podsustavi su najkompleksnija podcjelina same arhitekture. Backend je po uzoru na moderne mikroservisne arhitekture

## 4.1 Baza podataka <a name="4.1"> </a>

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

## 4.4 Dijagram aktivnosti <a name="4.4"> </a>

## 4.5 Dijagram komponenti <a name="4.5"> </a>
