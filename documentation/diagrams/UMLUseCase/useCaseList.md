**UC1 Prijava korisničkim podacima**

- Glavni sudionik: Klijent
- cilj: Pristupiti korisničkom računu
- sudionici: Baza podataka, Google
- preduvjet: -
- opis osnovnog tijeka:
  1.  Klijent odabire opciju za prijavu korisničkim podacima
  2.  Unese svoje korisničko ime i lozinku
  3.  Ulogira se na Studius
- opis mogućih odstupanja:
  1.  Uneseni podaci ne postoje u bazi

**UC2 Prijava putem Google računa**

- Glavni sudionik: Klijent
- cilj: Pristupiti korisničkom računu
- sudionici: Baza podataka, Google
- preduvjet: Klijent ima Studensis račun
- opis osnovnog tijeka:
  1.  Klijent odabire opciju za prijavu putem Google računa
  2.  Ulogira se na Studius

**UC3 Pregledati javne detalje o kolegiju**

- Glavni sudionik: Klijent
- cilj: Pregledati javne podatke o željenom kolegiju
- sudionici: Baza podataka
- preduvjet: -
- opis osnovnog tijeka:
  1.  Klijent zatraži jedan od kolegija
  2.  Klikne na taj kolegij
  3.  Prikažu mu se puno ime kolegija, njegov opis i što se ukratko uči na kolegiju

**UC4 Pregledati globalne obavijesti**

- Glavni sudionik: Klijent
- cilj: Pregledati globalne obavijesti
- sudionici: Baza podataka
- preduvjet: -
- opis osnovnog tijeka:
  1.  Klijent odabire opciju obavijesti
  2.  Prikaže mu se lista obavijesti (od najnovijih prema starijima)

**UC5 Pregledati popis oglasa svih nadolazecih predlozenih Seminara**

- Glavni sudionik: Klijent
- cilj: Pregledati oglase nadolazećih seminara
- sudionici: Baza podataka
- preduvjet: -
- opis osnovnog tijeka:
  1.  Klijent klikne na "nadolazeći seminari"
  2.  Prikaže mu se lista nadolazećih seminara

**UC6 Provjeriti javne detalje o korisnicima**

- Glavni sudionik: Klijent
- cilj: Provjeriti javne detalje o korisnicima
- sudionici: Baza podataka
- preduvjet: -
- opis osnovnog tijeka:
  1.  Klijent klikne na tražilicu
  2.  Pretražuje željeno ime i prezime
  3.  Sustav mu prikaže sve registrirane korisnike koji zadovoljavaju zahtjev
  4.  Klijent klikne na jednog od njih
  5.  Sustav mu prikaže stranicu s njegovim javnim podacima

**UC7 Upisati dostupni kolegij**

- Glavni sudionik: Student
- cilj: Upisati kolegije koje može
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom studenta
- opis osnovnog tijeka:
  1.  Student ode na aplikaciju za upis
  2.  Vidi listu ponuđenih predmete
  3.  Odabere predmete koje želi upisati (ako za neke predmete nema preduvjete sustav neće dopustiti odabir)

**UC9 Detalji o kolegiju**

- Glavni sudionik: Student
- cilj: Pregledati detalje o kolegiju
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom studenta
- opis osnovnog tijeka:
  1.  Student kad je prijavljen vidi listu aktivnih predmeta
  2.  Odabere željeni predmet
  3.  Vidi neke podatke koje registrirani korisnik ne vidi, svoji rezultati na predmetu, uvjeti polaganja i statistike ispita ako su objavljene

**UC9 Pregledati obavijesti vezanih uz kolegije na koje je povezan**

- Glavni sudionik: Student
- cilj: Pregledati obavijesti na aktivnim kolegijima
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom studenta
- opis osnovnog tijeka:
  1.  Student ode na listu aktivnih kolegija
  2.  Odabere željeni predmet
  3.  Odabere opciju obavijesti
  4.  Prikažu mu se obavijesti relevantne za taj predmet od najnovijih prema starijima

**UC10 Prijava seminara**

- Glavni sudionik: Doktorand
- cilj: Prijaviti seminar
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom doktoranda
- opis osnovnog tijeka:
  1.  Doktorand odabere opciju "prijava seminara"
  2.  Pošalje zahtjev za održavanje seminara sa željenom temom
  3.  Čeka profesora da odobri

**UC11 Pregled statistike ispita**

- Glavni sudionik: Profesor
- cilj: pregledati statistiku ispita
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom doktoranda
- opis osnovnog tijeka:
  1.  Profesor klikne na jedan od predmeta na kojima predaje
  2.  Zatim klikne na "statistika ispita"
  3.  Prikaže mu se statistika ispita

**UC12 Pregledati popis korisnika na predmetima koje predaje**

- Glavni sudionik: Profesor
- cilj: Pregledati sve korisnike na predmetu na kojem predaje
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom profesora
- opis osnovnog tijeka:
  1.  Profesor odabere jedan od predmeta na kojem predaje
  2.  Dobije pregled svih studenata upisanih na taj predmet

**UC13 Evidencija dolaska doktoranda**

- Glavni sudionik: Profesor
- cilj: Evidentirati dolazak doktorandima kako bi mogli uspješno položiti predmet
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom profesora
- opis osnovnog tijeka:
  1.  Profesor na seminaru da listić za potpisivanje doktorandima
  2.  Zapisana imena zabilježi u sustav

**UC14 Odobravanje prijavljenog seminara**

- Glavni sudionik: Profesor
- cilj: Odobriti ili odbiti prijavljeni seminar ovisno je li relevantan za upisan predmet
- sudionici: Baza podataka, doktorand
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom profesora
- opis osnovnog tijeka:
  1.  Profesor klikne na "prijavljeni seminari"
  2.  Odobri ili odbije ovisno je li seminar relevantan za taj predmet

**UC15 Pregled statistike ispita**

- Glavni sudionik: Profesor
- cilj: Pregledati statistiku
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom nositelja
- opis osnovnog tijeka:
  1.  Profesor pregleda listu predmeta na kojima predaje
  2.  Dobije pregled svih statistika od svih godina

**UC16 Postaviti je li kolegij dostupan za upisivanje**

- Glavni sudionik: Nositelj
- cilj: Postaviti je li kolegij dostupan za upisivanje
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom nositelja
- opis osnovnog tijeka:
  1.  Profesor odabere kolegij s liste na kojima ima nositeljska prava
  2.  Dopusti izvanredno upisivanje nekolicini ili svim studentima ako je potrebno

**UC17 Uređivati opis kolegija na kojima ima nositeljska prava**

- Glavni sudionik: Nositelj
- cilj: Urediti opis predmeta na kojima je nositelj
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom nositelja
- opis osnovnog tijeka:
  1.  Profesor odabere jedan predmet s liste na kojima ima nositeljska prava
  2.  Uredi opis ako želi

**UC18 Predlaganje seminara na svojem predmetu**

- Glavni sudionik: Nositelj
- cilj: Predložiti seminare na svojem predmetu
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom nositelja
- opis osnovnog tijeka:
  1.  Nositelj odabere opciju za oglase seminara
  2.  Predloži doktorandima da dođe na seminare koji su vezani za njegov predmet

**UC19 Čitanje iz baze**

- Glavni sudionik: Studentska služba
- cilj: Pregledati podatke iz baze
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe odabere opciju upravljanje bazom
  2.  Pregleda željene podatke iz baze

**UC20 Pisanje u bazu**

- Glavni sudionik: Studentska služba
- cilj: Zapisati potadke u bazu
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe odabere opciju upravljanje bazom
  2.  Zapiše željene podatke u bazu

**UC21 Izmjena u bazi**

- Glavni sudionik: Studentska služba
- cilj: Izmjeniti podatke u bazi
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe odabere opciju upravljanje bazom
  2.  Izmjeni željene podatke u bazi

**UC22 Brisanje u bazi**

- Glavni sudionik: Studentska služba
- cilj: Izbrisati podatke iz baze
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe odabere opciju upravljanje bazom
  2.  Izbriše željene podatke iz baze

**UC23 kreiranje računa**

- Glavni sudionik: Studentska služba
- cilj: Kreirati račun
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe odabere opciju za kreiranje računa
  2.  Ukuca željeno ime, prezime, jmbag, email, lozinku
  3.  Spremi račun u bazu

**UC24 Kreirati kolegij**

- Glavni sudionik: Studentska služba
- cilj: Kreirati kolegij
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe klikne na opciju za izradu kolegija
  2.  Kreira željeni kolegij

**UC25 Slanje aktivacijskog maila korisniku**

- Glavni sudionik: Studentska služba
- cilj: Poslati aktivacijski mail korisniku
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun, ulogiran je u sustav sa statusom člana studentske službe i kreirao je račun
- opis osnovnog tijeka:
  1.  Član studentske službe odabere opciju za slanje maila članu nakon kreiranja računa
  2.  U mailu napiše njegove

**UC26 Postavljanje globalnih obavijesti**

- Glavni sudionik: Studentska služba
- cilj: Postavljanje globalnih obavijesti
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom člana studentske službe
- opis osnovnog tijeka:
  1.  Član studentske službe klikne na opciju za postavljanje globalnih obavijesti
  2.  Postavi željeni sadržaj ako je relevantan za cijeli fakultet

**UC27 Promjena prava pristupa**

- Glavni sudionik: Administrator sustava
- cilj: Promjeniti prava pristupa
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i ulogiran je u sustav sa statusom administratora sustava
- opis osnovnog tijeka:
  1.  Administrator sustava odabere opciju za promjenu prava pristupa
  2.  Administrator sustava mijenja role po potrebi (npr iz studenta u doktoranda, iz doktoranda u asistenta itd.)
