Neregistriranom korisniku prikazuje se naslovna stranica s osnovnim informacijama vezanim za sustav radnog imena Studensis. Neregistrirani korisnik može se prijaviti u sustav sa svojim korisničkim podacima.

Registracijom u sustav korisnik dobiva razinu prava određenu ulogom u sustavu. Postojat će uloge administratora, fakultetskog osoblja (nositelja kolegija, profesora te asistenata), upisanih studenata, posjetitelja I razvojnog tima.

Svaka od ovih uloga daje pristup određenim funkcionalnostima I informacijama na sustavu.

Student prijavom u sustav dobiva prikaz glavne stranice. Na njoj su mu vidljivi njegovi predmeti za koje za svaki piše skupljeni broj bodova. Piše i lista položenih predmeta te prosjek ocjena koji je student ostvario u obrazovnoj ustanovi. Nadalje ima kratki prikaz nadolazećih obaveza, a klikom na tu sekciju, otvara se stranica sa svim obavezama, koje također imaju svaka svoju stranicu. Također ima vidljiv jedan manji kalendar, koje mu je inicijalno stanje da prikazuje dnevni kalendar, ali postoji mogućnost podešavanja na veće vremensko razdoblje. Klikom na kalendar otvara se zasebna stranica s kalendarom, s inicijalnim stanjem pregleda trenutnog tjedna. Također moguće su opcije podešavanja na veće i manje razdoblje. U kalendaru su vidljive sve nadolazeće obaveze, koje nude i daljnje informacije. Student također ima mogućnost dodavanja vlastitih zapisa u kalendar. Nadalje, na glavnoj stranici ispod manje verzije kalendara, vidljiv je popis upisanih predmeta. Klikom na neki od njih, otvara se stranica predmeta. Student ovdje može vidjeti osnovne informacije o predmetu te ima pristup materijalima i svojim rezultatima na predmetu. Dostupni materijali su mu prenesene prezentacije, videi i sl. Također na našoj platformi omogućili bismo pristup interaktivnim lekcijama. Njih kreirea profesor i to omogućuje studentima bolje usavršavanje gradiva, a profesorima opciju da temeljem rezultata daje određeni broj bodova. Slično, ali ne isto, napravili bismo odjeljak s funkcionalnostima sličnim aplikaciji Kahoot koja bi se mogla koristiti na predavanjima uživo, sa svrhom sličnom interaktivnim lekcijama. Studentu su vidljive obaveze vezane za otvoreni predmet. Na glavnoj stranici, ispod popisa predmeta, nalaze se najnovije novosti i obavijesti o fakultetu. Također će student imati pristup detaljnijim obavijestima koje može filtirati ili se na njih pretplaćivati.

Fakultetsko osoblje dijeli se na nositelje predmeta, predavače te asistente koji imaju ovisno o tome manja ili veća prava. Prijavom u sustav, osoblje također dobiva prikaz glavne stranice, drugačije od one kakvu vidi student. Vidljiv im je dnevni kalendar, kojem, kao i studenti, mogu podesiti vremenski interval na veći. U njemu su vidljive nadolazeće obavee. Klikom na kalendar otvara se zasebna stranica s većim, ali također podesivim, prikazom. Ovdje osoblje ima mogućnost unosa svojih zapisa, ali također i zapisa kojima mogu podesiti vidljivost. Recimo, žele održati konzultacije u određeno vrijeme za određenu grupu studentata. Na glavnoj stranici, ispod kalendara, nalazi se popis predmeta na kojima sudjeluju. Na njima imaju različite uloge. Za svaki predmet, postoji zasebna stranica. Na njoj imaju pristup listi studenata upisanih na odabrani predmet.

Daje im se mogućnost unosa bodova. Na ovoj stranici nalazit će se QR kod, koji će studenti moći skenirati te se na taj način može evidentirati dolaznost na predavanja. Naravno, imat će mogućnost i oduzimanja bodova za prisutnost u slučaju da primjete da je student napustio predavanje.

Za svaki predmet, postojat će repozitorij materijala, koji se mogu dodavati, brisati te uređivati. Daljim razvojem servisa, omogućili bismo neke funkcionalnosti inspirirane alatom Notion. Nudili bismo prijepis materijala na način da ga profesor može uređivati, a studenti mogu na svaki odlomak ostavljati komentare, te na taj način dobivati povratne informacije od profesora ili od drugih studenata. Time bismo omogućili bolju i lakšu komunikaciju, a time i usvajanje gradiva. Osim materijala, postojao bi pristup kreaciji, brisanju i uređivanju interaktivnih lekcija te ranije navedenim funkcionalnostima sličnim Kahootu. Osoblje ima pristup popisu održavanih provjera na predmetu, te unos bodova za svaku od njih. Nadalje, mogu slati obavijesti vezane za predmet. Ispod popisa predmeta na glavnoj stranici, osoblju se prikazuju obavijesti, slično kao i studentima.

Ulogu posjetitelja dobivaju studenti upisani na fakultet, ali oni koji nisu upisani na određeni predmet. Njima se na stranici tog predmeta prikazuju osnovne informacije o predmetu.

Administrator ima najviša prava, te ih dodjeljuje drugim ulogama.

Studenti i osoblje imaju pristup funkcionalnosti chata, putem kojeg mogu komunicirati s ostalim osobljem ili studentima.

## Funkcionalni zahtjevi

## Obrasci uporabe

:[usecases](../../images/usecase.html)
![usecases](./diagrams/UMLUseCase/Kolegiji.svg)
![usecases](./diagrams/UMLUseCase/Korisnici.svg)
![usecases](./diagrams/UMLUseCase/Obavijesti.svg)
![usecases](./diagrams/UMLUseCase/Seminari.svg)

## Sekvencijski dijagrami

:[sekvencijski](../../diagrams/UMLSequence/loginSequence.pu)
![sek2](../../diagrams/UMLSequence/Registracija.png)
![sek3](../../diagrams/UMLSequence/Seminar_i_predlaganje.png)

### Dionici

1. Klijent
2. Registrirani korisnik
3. Student
4. Profesor
5. Nositelj
6. Doktorand
7. Studentska služba
8. Administrator sustava

### Aktori i njihovi funkcionalni zahtjevi

1. Klijent
   - Prijava u sustav
   - Registriracija putem linka
   - Pregledati globalne obavijesti
   - Pregledati popis oglasa svih nadolazecih predlozenih Seminara
2. Registrirani korisnik
   - Uređivanje opisa
   - Provjeriti javne detalje o korisnicima
   - Najava dolaska na seminar
3. Student
   - Upisati dostupni kolegij
   - Pregledati popis kolegija na koje je upisan
   - Detalji o kolegiju
   - Pregledati obavijesti vezanih uz kolegije na koje je povezan
4. Pofesor

   - Pregledati popis korisnika na predmetima koje predaje
   - Postavljanje obavijesti vezanih uz kolegije na koje je povezan
   - Evidencija dolaska
   - Odobravanje prijavljenog seminara
   - Pregled statistike
   - Najava i prethodno izlaganje radova za konferencije (generalna proba)

5. Nositelj

   - Postavljanje rola korisnika na kolegiju
   - Postavljanje uvjeta na kolegiju
   - Postavljanje materijala na kolegiju
   - Postaviti kolegij je li dostupan za upisivanje
   - Uredivati opis kolegija na kojima ima nositeljska prava
   - Prikaz i rasprava istraživačkih postignuća (novoobjavljeni radovi vlastiti i tuđi)
   - Predlaganje seminara na svojem predmetu

6. Doktorand

   - Prikaz i rasprava istraživačkih postignuća (novoobjavljeni radovi vlastiti i tuđi)
   - Najava i prethodno izlaganje radova za konferencije (generalna proba)

7. Studentska služba

   - Čitanje iz baze
   - Pisanje u bazu
   - Izmjena u bazi
   - Brisanje u bazi
   - Kreiranje linkova za upis
   - Kreirati kolegij
   - Odobravanje kolegija
   - Postavljanje globalnih obavijesti
   - Kvalifikacijski ispiti za studente
   - Razgovor o temi i doprinosu znanstvenog rada

8. Administrator sustava
   - Promjena prava pristupa
