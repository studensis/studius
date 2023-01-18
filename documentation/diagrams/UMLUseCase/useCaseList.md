**UC1 Prijava korisničkim podacima**

- Glavni sudionik: Klijent
- cilj: Pristupiti korisničkom računu
- sudionici: Baza podataka, Google
- preduvjet: -
- opis osnovnog tijeka:
  1.  Klijent odabire opciju za prijavu korisničkim podacima
  2.  Unese svoje korisničko ime i lozinku
  3.  Prijavi se na Studius
- opis mogućih odstupanja:
  1.  Uneseni podaci ne postoje u bazi

**UC2 Prijava putem Google računa**

- Glavni sudionik: Klijent
- cilj: Pristupiti korisničkom računu
- sudionici: Baza podataka, Google
- preduvjet: Klijent ima Studius račun
- opis osnovnog tijeka:
  1.  Klijent odabire opciju za prijavu putem Google računa
  2.  Prijavi se na Studius

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

**UC5 Pregledati popis oglasa svih nadolazecih seminara po predmetu**

- Glavni sudionik: Klijent
- cilj: Pregledati oglase nadolazećih seminara po predmetu
- sudionici: Baza podataka
- preduvjet: -
- opis osnovnog tijeka:
  1.  Klijent klikne na predmet
  2.  Prikaže mu se lista nadolazećih seminara za odabrani predmet

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

**UC7 Upisati korisnika na kolegij s određenom ulogom**

- Glavni sudionik: Studentska Služba i CIP
- cilj: Upisati korisnike na predmete s određenom ulogom
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun
- opis osnovnog tijeka:
  1.  Studentska služba otvori stranicu predmeta
  2.  Odabere opciju "Dodaj korisnika"
  3.  Dobije listu svih korisnika koji nisu vezani za taj predmet
  4.  Odabere za nekog korisnika ulogu na predmetu

**UC8 Detalji o kolegiju**

- Glavni sudionik: Student
- cilj: Pregledati detalje o kolegiju
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i prijavljen je u sustav
- opis osnovnog tijeka:
  1.  Student kad je prijavljen vidi listu aktivnih predmeta
  2.  Odabere željeni predmet
  3.  Vidi neke podatke o predmetu

**UC9 Prijedlog seminara**

- Glavni sudionik: Mentor
- cilj: Predložiti temu seminara
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i prijavljen je u sustav te je nositelj na nekom predmetu
- opis osnovnog tijeka:
  1.  Korisnik odabire predmet te studenta kojemu je mentor
  2.  Upisuje temu seminara
  3.  Šalje prijedlog studentu

**UC10 Popunjavanje seminara**

- Glavni sudionik: Student
- cilj: Popuniti sadržaj seminara i poslati mentoru na odobravanje
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i prijavljen je u sustav
- opis osnovnog tijeka:
  1.  Korisnik otvara stranicu seminara
  2.  Prikazuje mu se lista seminara koji su mu predloženi
  3.  Ispunjava sadržaj
  4.  Klikne na gumb "Send draft"

**UC11 Pregledati popis korisnika na predmetima**

- Glavni sudionik: Profesor
- cilj: Pregledati sve korisnike na predmetu
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i prijavljen je u sustav
- opis osnovnog tijeka:
  1.  Korisnik odabere jedan od predmeta
  2.  Dobije pregled svih korisnika upisanih na predmet

**UC12 Odobravanje prijavljenog seminara**

- Glavni sudionik: Profesor
- cilj: Odobriti prijavljeni seminar ovisno je li relevantan za upisan predmet
- sudionici: Baza podataka, Mentor
- preduvjet: Korsnik ima svoj račun i nositelj je na nekom predmetu
- opis osnovnog tijeka:
  1.  Korisnik otvori stranicu seminara
  2.  Odobri ili odbije ovisno je li seminar relevantan za taj predmet

**UC13 Uređivati opis kolegija**

- Glavni sudionik: Nositelj
- cilj: Urediti opis predmeta na kojima je nositelj
- sudionici: Baza podataka
- preduvjet: Korsnik ima svoj račun i prijavljen je u sustav sa statusom nositelja
- opis osnovnog tijeka:
  1.  Profesor odabere jedan predmet s liste na kojima ima nositeljska prava
  2.  Uredi opis ako želi

**UC14 Kreacija eventa vezanog za seminar**

- Glavni sudionik: Program
- cilj: izrada evenata za seminare
- sudionici: Baza podataka
- preduvjet: Mentor je odobrio draft seminara
- opis osnovnog tijeka:
  1.  Program kreira event vezan za seminar i prikazuje ga u kalendaru

**UC15 Čitanje iz baze**

- Glavni sudionik: Studentska služba ili CIP
- cilj: Pregledati podatke iz baze
- sudionici: Baza podataka
- preduvjet: Korisnik je prijavljen kao admin ili superadmin
- opis osnovnog tijeka:
  1.  Član studentske službe odabere opciju upravljanje bazom
  2.  Pregleda željene podatke iz baze

**UC16 Pisanje u bazu**

- Glavni sudionik: Studentska služba ili CIP
- cilj: Zapisati potadke u bazu
- sudionici: Baza podataka
- preduvjet: Korsnik je prijavljen kao admin ili superadmin
- opis osnovnog tijeka:
  1.  Član studentske službe odabere opciju upravljanje bazom
  2.  Zapiše željene podatke u bazu

**UC17 Izmjena u bazi**

- Glavni sudionik: Studentska služba ili CIP
- cilj: Izmjeniti podatke u bazi
- sudionici: Baza podataka
- preduvjet: Korsnik je prijavljen kao admin ili superadmin
- opis osnovnog tijeka:
  1.  Član studentske službe odabere opciju upravljanje bazom
  2.  Izmjeni željene podatke u bazi

**UC18 Brisanje u bazi**

- Glavni sudionik: Studentska služba
- cilj: Izbrisati podatke iz baze
- sudionici: Baza podataka
- preduvjet: Korsnik je prijavljen kao admin ili superadmin
- opis osnovnog tijeka:
  1.  Član studentske službe odabere opciju upravljanje bazom
  2.  Izbriše željene podatke iz baze

**UC19 kreiranje računa za korisnika**

- Glavni sudionik: Studentska služba ili CIP
- cilj: Kreirati račun
- sudionici: Baza podataka
- preduvjet: Korsnik je prija kao admin ili superadmin
- opis osnovnog tijeka:
  1.  Član studentske službe odabere opciju za kreiranje računa
  2.  Ukuca željeno ime, prezime, jmbag, email, lozinku
  3.  Spremi račun u bazu

**UC20 Kreirati kolegij**

- Glavni sudionik: Studentska služba ili CIP
- cilj: Kreirati kolegij
- sudionici: Baza podataka
- preduvjet: Korsnik je prijavljen kao admin ili superadmin
- opis osnovnog tijeka:
  1.  Član studentske službe klikne na opciju za izradu kolegija
  2.  Kreira željeni kolegij

**UC21 Postavljanje globalnih obavijesti**

- Glavni sudionik: Studentska služba ili CIP
- cilj: Postavljanje globalnih obavijesti
- sudionici: Baza podataka
- preduvjet: Korsnik je prijavljen kao admin ili superadmin
- opis osnovnog tijeka:
  1.  Član studentske službe klikne na opciju za postavljanje globalnih obavijesti
  2.  Postavi željeni sadržaj ako je relevantan za cijeli fakultet

**UC22 Promjena prava pristupa**

- Glavni sudionik: Studentska služba ili CIP
- cilj: Promjeniti prava pristupa
- sudionici: Baza podataka
- preduvjet: Korsnik je prijavljen kao admin ili superadmin
- opis osnovnog tijeka:
  1.  Administrator sustava odabere opciju za promjenu prava pristupa
  2.  Administrator sustava mijenja role po potrebi (npr iz studenta u doktoranda, iz doktoranda u asistenta itd.)

**UC23 Promjena teme na tamnu i obrnuto**

- Glavni sudionik: Registrirani korisnik
- cilj: Promjeniti prava pristupa
- sudionici: Baza podataka
- preduvjet: Korsnik je prijavljen
- opis osnovnog tijeka:
  1.  Korisnik otvara izbornik za navigaciju
  2.  Klik na gumb za promjenu teme

**UC24 Odjava iz sustava**

- Glavni sudionik: Registrirani korisnik
- cilj: Promjeniti prava pristupa
- sudionici: Baza podataka
- preduvjet: Korsnik je prijavljen
- opis osnovnog tijeka:
  1.  Korisnik otvara izbornik za navigaciju
  2.  Klik na gumb za odjavu
