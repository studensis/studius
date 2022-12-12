Glavni sudionik: Klijent

- cilj: Pristupiti korisničkom računu
- sudionici: Baza podataka, Google
- preduvjet: -
- opis osnovnog tijeka:
  1.  Klijent ode na stranicu Studius i klikne na "prijava"
  2.  Unese svoje korisničko ime i lozinku
  3.  Ulogira se na Studius
  4.  Opis mogucih odstupanja: Uneseni podaci ne postoje u bazi

**UC2 Registracija putem linka**

- Glavni sudionik: Klijent
- cilj: Stvoriti korisnički račun
- sudionici: Baza podataka, Google
- preduvjet: -
- opis osnovnog tijeka:
  1.  Klijent ode na stranicu Studius i klikne "registracija"
  2.  Unese ime, prezime, jmbag, email i lozinku
  3.  Podaci se spremaju u bazu i stvara se novi korisnički račun

**UC3 Pregledati javne detalje o kolegiju**

- Glavni sudionik: Klijent
- cilj: Pregledati javne podatke o željenom kolegiju
- sudionici: Baza podataka
- preduvjet: -
- opis osnovnog tijeka:
  1.  Klijent ode na stranicu Studius i zatraži jedan od kolegija
  2.  Klikne na taj kolegij
  3.  Prikažu mu se puno ime kolegija, njegov opis, način bodovanja i opterećenje (ECTS)
- Glavni sudionik: Klijent
- cilj: Pregledati globalne obavijesti
- sudionici: Baza podataka
- preduvjet: -
- opis osnovnog tijeka:
  1.  Klijent ode na stranicu Studius i klikne na "obavijesti"
  2.  Prikaže mu se lista obavijesti (od najnovijih prema starijima)

**UC5 Pregledati popis oglasa svih nadolazecih predlozenih Seminara**

- Glavni sudionik: Klijent
- cilj: Pregledati oglase nadolazećih seminara
- sudionici: Baza podataka
- preduvjet: -
- opis osnovnog tijeka:

1. Klijent ode na stranicu Studius i klikne na "nadolazeći seminari"
2. Prikaže mu se lista nadolazećih seminara

**UC6 Uređivanje opisa**

- Glavni sudionik: Registrirani korisnik
- cilj: Urediti svoj opis
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav
- opis osnovnog tijeka:
  1.  Korisnik klikne na "uredi svoj opis"
  2.  Zapiše svoje titule, radove, područja interesa
- Glavni sudionik: Registrirani korisnik
- cilj: Provjeriti javne detalje o željenom korisniku
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav
- opis osnovnog tijeka:
  1.  Korisnik klikne na tražilicu za korisnike
  2.  Pretraži željenog korisnik tako što utipka njegovo ime i prezime

**UC8 Najava dolaska na seminar**

- Glavni sudionik: Registrirani korisnik
- cilj: Najaviti dolazak na seminar u svrhu prebrojavanja ljudi i napomeni o premašenom
- kapacitetu dvorane
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav
- opis osnovnog tijeka:
  1.  Korisnik pregleda oglase javnih seminara
  2.  Zabilježi da će doći na željeni seminar

**UC9 Pregledati popis korisnika na predmetima koje predaje**

- Glavni sudionik: Profesor
- cilj: Pregledati sve korisnike na predmetu na kojem predaje
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom profesora
- opis osnovnog tijeka:
  1.  Profesor odabere jedan od predmeta na kojem predaje
  2.  Dobije pregled svih studenata upisanih na taj predmet
- Glavni sudionik: Profesor
- cilj: Obaviještavati studente s događanjima relevantnih za predmet
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom profesora
- opis osnovnog tijeka:
  1.  Profesor odabere jedan od predmeta na kojem predaje
  2.  Postavi obavijest relevantnu za taj predmet

**UC11 Evidencija dolaska**

- Glavni sudionik: Profesor
- cilj: Evidentirati dolazak doktorandima kako bi mogli uspješno položiti predmet
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom profesora
- opis osnovnog tijeka:
  1.  Profesor na seminaru da listić za potpisivanje doktorandima
  2.  Zapisana imena zabilježi u sustav

**UC12 Odobravanje prijavljenog seminara**

- Glavni sudionik: Profesor, doktorand
- cilj: Odobriti ili odbiti prijavljeni seminar ovisno je li relevantan za upisan predmet
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom profesora
- opis osnovnog tijeka:
  1.  Doktorand prijavi da želi održati određen seminar kako bi mogao uspješno položiti predmet
  2.  Profesor može odobriti ili odbiti ovisno je li relevantan za taj predmet
- Glavni sudionik: Profesor
- cilj: Pregledati statistiku
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom nositelja
- opis osnovnog tijeka:
  1.  Profesor pregleda listu predmeta na kojima predaje
  2.  Dobije pregled svih statistika od svih godina

**UC14 Najava i prethodno izlaganje radova za konferencije (generalna proba)**

- Glavni sudionik: Profesor, doktorand
- cilj: Napraviti probu seminara prije službenog izlaganja
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom nositelja
- opis osnovnog tijeka:
  1.  Nositelj se dogovori s doktorandom za termin s određenim datumom vremenom i mjestom
  2.  Termin se zabilježi u bazu
  3.  Održe probu

**UC15 Upisati dostupni kolegij**

- Glavni sudionik: Student
- cilj: Upisati kolegije koje može
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom studenta
- opis osnovnog tijeka:
  1.  Student ode na aplikaciju za upis
  2.  Vidi listu ponuđenih predmete
  3.  Odabere predmete koje želi upisati (ako za neke predmete nema preduvjete sustav neće dopustiti odabir)
- Glavni sudionik: Student
- cilj: Pregledati popis kolegija na koje je upisan
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom studenta
- opis osnovnog tijeka:
  1.  Student kad je ulogiran vidi listu aktivnih predmeta

**UC17 Detalji o kolegiju**

- Glavni sudionik: Student
- cilj: Pregledati detalje o kolegiju
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom studenta
- opis osnovnog tijeka:
  1.  Student ode na listu aktivnih predmeta
  2.  Odabere željeni predmet
  3.  Vidi neke podatke koje registrirani korisnik ne vidi, svoji rezultati na predmetu, uvjeti polaganja i statistike ispita ako su objavljene

**UC18 Pregledati obavijesti vezanih uz kolegije na koje je povezan**

- Glavni sudionik: Student
- cilj: Pregledati obavijesti na aktivnim kolegijima
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom studenta
- opis osnovnog tijeka:
  1.  Student ode na listu aktivnih kolegija
  2.  Odabere željeni predmet
  3.  Pregleda obavijesti na predmetu
- Glavni sudionik: Studentska služba
- cilj: Pregledati podatke iz baze
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe pregleda željene podatke iz baze

**UC20 Pisanje u bazu**

- Glavni sudionik: Studentska služba
- cilj: Zapisati potadke u bazu
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe zapiše željene podatke u bazu

**UC21 Izmjena u bazi**

- Glavni sudionik: Studentska služba
- cilj: Izmjeniti podatke u bazi
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe izmjeni željene podatke u bazi

**UC22 Brisanje u bazi**

- Glavni sudionik: Studentska služba
- cilj: Izbrisati podatke iz baze
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe izbriše željene podatke iz baze
- Glavni sudionik: Studentska služba
- cilj: Kreirati linkove za upis
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe kreira linkove za upis predmeta ili studija

**UC24 Kreirati kolegij**

- Glavni sudionik: Studentska služba
- cilj: Kreirati kolegij
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe kreira kolegij

**UC25 Odobravanje kolegija**

- Glavni sudionik: Studentska služba
- cilj: Odobravanje kolegija
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe potvrdi studentu upis na kolegij

**UC26 Postavljanje globalnih obavijesti**

- Glavni sudionik: Studentska služba
- cilj: Postavljanje globalnih obavijesti
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Postavljanje obavijesti relevantne za cijeli fakultet

**UC27 Kvalifikacijski ispiti za studente**

- Glavni sudionik: Studentska služba
- cilj: Odobriti kvalifikacijske ispite studentima
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe pregleda zahtjev za kvalifikacijski ispit
  2.  Odobri ga ili odbije

**UC28 Razgovor o temi i doprinosu znanstvenog rada**

- Glavni sudionik: Studentska služba
- cilj: Porazgovarati o temi i doprinosu znanstvenog rada sa doktorandom
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe se dogovori sa doktorandom termin za razgovor
  2.  Zabilježe datum, vrijeme i mjesto održavanja

**UC29 Postavljanje rola korisnika na kolegiju**

- Glavni sudionik: Nositelj
- cilj: Postaviti role korisnicima na kolegiju
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom nositelja
- opis osnovnog tijeka:
  1.  Nositelj odredi profesore i asistente što će predavati na predmetu i držati laboratorijske vježbe i organizira rad

**UC30 Postavljanje uvjeta na kolegiju**

- Glavni sudionik: Nositelj
- cilj: Postaviti uvjete polaganja na kolegiju
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom nositelja
- opis osnovnog tijeka:
  1.  Profesor odabere kolegij s liste na kojima ima nositeljska prava
  2.  Promjeni uvjete za izlazak na ispit
- Glavni sudionik: Nositelj
- cilj: Postaviti materijale na kolegiju
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom nositelja
- opis osnovnog tijeka:
  1.  Profesor odabere kolegij s liste na kojima ima nositeljska prava
  2.  Postavi materijale za učenje studentima

**UC32 Postaviti kolegij je li dostupan za upisivanje**

- Glavni sudionik: Nositelj
- cilj: Postaviti kolegij je li dostupan za upisivanje
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom nositelja
- opis osnovnog tijeka:
  1.  Profesor odabere kolegij s liste na kojima ima nositeljska prava
  2.  Dopusti izvanredno upisivanje nekolicini ili svim studentima ako je potrebno

**UC33 Uredivati opis kolegija na kojima ima nositeljska prava**

- Glavni sudionik: Nositelj
- cilj: Urediti opis predmeta na kojima je nositelj
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom nositelja
- opis osnovnog tijeka:
  1.  Profesor odabere jedan predmet s liste na kojima ima nositeljska prava
  2.  Uredi opis ako želi

**UC34 Prikaz i rasprava istraživačkih postignuća (novoobjavljeni radovi vlastiti i tuđi)**

- Glavni sudionik: Nositelj
- cilj: Prikazati i raspraviti o istraživačkim postignućima novoobjavljenih radova
- sudionici: Baza podataka, doktorand
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom nositelja
- opis osnovnog tijeka:
  1.  Nositelj se dogovori s doktorandom za termin s određenim datumom vremenom i mjestom
  2.  Termin se zabilježi u bazu
  3.  Raspravi o istraživačkim postignućima novoobjavljenih radova

**UC35 Predlaganje seminara na svojem predmetu**

- Glavni sudionik: Nositelj
- cilj: Predložiti seminare na svojem predmetu
- sudionici: Baza podataka, doktorand
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom nositelja
- opis osnovnog tijeka:
  1.  Nositelj pregleda listu oglasa seminara
  2.  Predloži doktorandima da dođe na seminare koji su vezani za njegov predmet

**UC36 Promjena prava pristupa**

- Glavni sudionik: Administrator sustava
- cilj: Promjeniti prava pristupa
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom administratora sustava
- opis osnovnog tijeka:
  1.  Administrator sustava može bilo kojem korisniku zabraniti pristup određenom sadržaju
  2.  ako smatra da je to potrebno zbog sigurnosti Administrator sustava može mijenjati role kad zatreba (npr iz studenta u doktoranda, iz doktoranda u asistenta itd.)
