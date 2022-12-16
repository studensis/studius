**Neregistriranom korisniku** prikazuje se naslovna stranica s osnovnim informacijama vezanim za sustav radnog imena Studensis. Isti se može prijaviti u sustav sa svojim korisničkim podacima.

Registracijom u sustav korisnik dobiva razinu prava određenu ulogom u sustavu. Postojat će uloge administratora, fakultetskog osoblja (nositelja kolegija, profesora te asistenata), upisanih studenata, posjetitelja I razvojnog tima.

Svaka od ovih uloga daje pristup određenim funkcionalnostima I informacijama na sustavu.

**Student** prijavom u sustav dobiva prikaz glavne stranice. Na njoj su mu vidljivi njegovi predmeti za koje za svaki piše skupljeni broj bodova. Piše i lista položenih predmeta te prosjek ocjena koji je student ostvario u obrazovnoj ustanovi. Nadalje ima kratki prikaz nadolazećih obaveza, a klikom na tu sekciju, otvara se stranica sa svim obavezama, koje također imaju svaka svoju stranicu. Također ima vidljiv jedan manji kalendar, koje mu je inicijalno stanje da prikazuje dnevni kalendar, ali postoji mogućnost podešavanja na veće vremensko razdoblje. Klikom na kalendar otvara se zasebna stranica s kalendarom, s inicijalnim stanjem pregleda trenutnog tjedna. Također moguće su opcije podešavanja na veće i manje razdoblje. U kalendaru su vidljive sve nadolazeće obaveze, koje nude i daljnje informacije. Student također ima mogućnost dodavanja vlastitih zapisa u kalendar. Nadalje, na glavnoj stranici ispod manje verzije kalendara, vidljiv je popis upisanih predmeta. Klikom na neki od njih, otvara se stranica predmeta. Student ovdje može vidjeti osnovne informacije o predmetu te ima pristup materijalima i svojim rezultatima na predmetu. Dostupni materijali su mu prenesene prezentacije, videi i sl. Također na našoj platformi omogućili bismo pristup interaktivnim lekcijama. Njih kreirea profesor i to omogućuje studentima bolje usavršavanje gradiva, a profesorima opciju da temeljem rezultata daje određeni broj bodova. Slično, ali ne isto, napravili bismo odjeljak s funkcionalnostima sličnim aplikaciji Kahoot koja bi se mogla koristiti na predavanjima uživo, sa svrhom sličnom interaktivnim lekcijama. Studentu su vidljive obaveze vezane za otvoreni predmet. Na glavnoj stranici, ispod popisa predmeta, nalaze se najnovije novosti i obavijesti o fakultetu. Također će student imati pristup detaljnijim obavijestima koje može filtirati ili se na njih pretplaćivati.

Fakultetsko osoblje dijeli se na **nositelje** predmeta, **asistente** te **demonstratore** koji imaju ovisno o tome manja ili veća prava. Prijavom u sustav, osoblje također dobiva prikaz glavne stranice, drugačije od one kakvu vidi student. Vidljiv im je dnevni kalendar, kojem, kao i studenti, mogu podesiti vremenski interval na veći. U njemu su vidljive nadolazeće obavee. Klikom na kalendar otvara se zasebna stranica s većim, ali također podesivim, prikazom. Ovdje osoblje ima mogućnost unosa svojih zapisa, ali također i zapisa kojima mogu podesiti vidljivost. Recimo, žele održati konzultacije u određeno vrijeme za određenu grupu studentata. Na glavnoj stranici, ispod kalendara, nalazi se popis predmeta na kojima sudjeluju. Na njima imaju različite uloge. Za svaki predmet, postoji zasebna stranica. Na njoj imaju pristup listi studenata upisanih na odabrani predmet.

Daje im se mogućnost unosa bodova. Na ovoj stranici nalazit će se QR kod, koji će studenti moći skenirati te se na taj način može evidentirati dolaznost na predavanja. Naravno, imat će mogućnost i oduzimanja bodova za prisutnost u slučaju da primjete da je student napustio predavanje.

Za svaki predmet, postojat će repozitorij materijala, koji se mogu dodavati, brisati te uređivati. Daljim razvojem servisa, omogućili bismo neke funkcionalnosti inspirirane alatom Notion. Nudili bismo prijepis materijala na način da ga profesor može uređivati, a studenti mogu na svaki odlomak ostavljati komentare, te na taj način dobivati povratne informacije od profesora ili od drugih studenata. Time bismo omogućili bolju i lakšu komunikaciju, a time i usvajanje gradiva. Osim materijala, postojao bi pristup kreaciji, brisanju i uređivanju interaktivnih lekcija te ranije navedenim funkcionalnostima sličnim Kahootu. Osoblje ima pristup popisu održavanih provjera na predmetu, te unos bodova za svaku od njih. Nadalje, mogu slati obavijesti vezane za predmet. Ispod popisa predmeta na glavnoj stranici, osoblju se prikazuju obavijesti, slično kao i studentima.

Ulogu posjetitelja dobivaju studenti upisani na fakultet, ali oni koji nisu upisani na određeni predmet. Njima se na stranici tog predmeta prikazuju osnovne informacije o predmetu.

Administrator ima najviša prava, te ih dodjeljuje drugim ulogama.

## Funkcionalni zahtjevi

## Ostali zahtjevi

- Sustav treba omoguciti rad više korisnika u stvarnom vremenu
- Korisnicko sučelje i sustav moraju podržavati hrvatsku abecedu (dijakritičke znakove) pri unosu i
- prikazu tekstualnog sadrzaja
- Izvršavanje dijela programa u kojem se pristupa bazi podataka ne smije trajati duže od nekoliko sekundi
- Sustav treba biti implementiran kao web aplikacija koristeci objektno-orijentirane jezike
- Neispravno korištenje korisničkog sučelja ne smije narušiti funkcionalnost i rad sustava
- Sustav treba biti jednostavan za korištenje
- Nadogradnja sustava ne smije narušavati postojeće funkcionalnosti sustava
- Veza s bazom podataka mora biti otporna na vanjske greške
- Pristup sustavu mora biti omogućen iz javne mreže pomoću HTTPS.

## Obrasci uporabe

![usecases](./diagrams/UMLUseCase/Kolegiji.svg)
![usecases](./diagrams/UMLUseCase/Korisnici.svg)
![usecases](./diagrams/UMLUseCase/Obavijesti.svg)
![usecases](./diagrams/UMLUseCase/Seminari.svg)

## Sekvencijski dijagrami

:[sekvencijski](../diagrams/UMLSequence/loginSequence.pu)
![sek2](./diagrams/UMLSequence/Registracija.png)
![sek3](./diagrams/UMLSequence/Seminar_i_predlaganje.png)

### Prijava korisničkim podacima

Korisnik na početnoj stranici odabire opciju “Prijava”. Web aplikacija mu otvara stranicu prijave, koja ima dvije opcije, prijavu korisničkim podacima te prijavu Google računom. Odabirom opcije “Prijava korisničkim podacima”, otvara mu se forma u koju unosi svoje korisničke podatke. Predajom forme, aplikacija u bazi provjerava ispravnost podataka. U slučaju netočnih podataka, korisnik dobiva error. U slučaju ispravnih podataka, korisnik dobiva token I redirektiran je na početnu stranicu. Odabirom opcije “Prijava putem Google računa”, korisniku Google prikazuje dostupne gmail adrese. Korisnik odabire jednu, odvija se provjera s Google-om te korisnik dobiva token I redirektiran je na početnu stranicu.

### Kreiranje računa

Studentski službenik otvara formu za registraciju studenta u koju upisuje sve potrebne podatke. Forma traži ponovni upis ukoliko je jedan ili više podataka neispravno te ispisuje razlog neispravnosti pojedinog podatka. Prilikom pravilno ispunjene forme, web aplikacija šalje podatke u bazu podataka te ih veže uz novoizrađenog studenta. Uspjeh o izradi studenta se šalje natrag studentskom službeniku, a mail s podatcima za prijavu se šalje korisniku kojemu pripadaju.

### Prijava putem Google računa

Unaprijed prijavljeni student, pritiskom na, za to predodređen, gumb, zahtjeva web aplikaciju da mu dohvati Google-ovu formu kojom se prijavljuje u svoj postojeći Google račun. Nakon što se uspješno prijavi u svoj Google račun, uspjeh u prijavi se dojavljuje web aplikaciji i studentu. Web aplikacija potom sprema podatke o Google poveznici i dojavljuje studentu uspjeh u povezivanju Google računa nakon čega se web aplikacija vraća na prijašnju stranicu.

### Prijava seminara

Doktorand, pritiskom na, za to predodređen, gumb, zahtjeva web aplikaciju da mu dohvati formu za prijavu seminara. Dok ideja nije prihvaćena sa strane doktorandovog mentora, doktorand, preko web aplikacije, šalje mentoru nacrt seminara na koju mentor može odgovoriti odobrenjem. Nakon što mentor prihvati nacrt seminara, preko web aplikacije najavljuje predaju istog seminara nakon čega web aplikacija pohranjuje nacrt i datum predaje u bazu podataka. Predaja seminara mora biti najavljena najmanje 7 dana prije same predaje. Prilikom najave predaje seminara, web aplikacija izrađuje oglas seminara na stranici predmeta povezanog s mentorom koji se potom arhivira u bazu podataka. Oglas je vidljiv sve do same predaje seminara. Nositelj predmeta, koji ne mora nužno biti povezan sa seminarom, odluči predložiti seminar na stranici svojeg predmeta te web aplikaciji šalje zahtjev kojom ona hvata oglas. Predlaganje seminara također se pohranjuje u bazu podataka. Prilikom predavanja seminara, mentor predavača boduje seminar preko web aplikacije. Podatci o predaji i bodovanju seminara se pohranjuju u bazu podataka i oglas za isti seminar se briše.

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
   - Prijava korisničkim podacima
   - Prijava putem Google računa
   - Pregledati javne detalje o kolegiju
   - Pregledati globalne obavijesti
   - Pregledati popis oglasa svih nadolazecih predlozenih Seminara
   - Provjeriti javne detalje o korisnicima
2. Student
   - Upisati dostupni kolegij
   - Detalji o kolegiju
   - Pregledati obavijesti vezanih uz kolegije na koje je povezan
3. Doktorand
   - Prijava seminara
   - Predlaganje seminara na svojem predmetu
4. Profesor
   - Pregled statistike ispita
   - Pregledati popis korisnika na predmetima koje predaje
   - Evidencija dolaska doktoranda
   - Odobravanje prijavljenog seminara
   - Pregled statistike ispita
5. Nositelj
   - Postaviti je li kolegij dostupan za upisivanje
   - Uređivati opis kolegija na kojima ima nositeljska prava
   - Predlaganje seminara na svojem predmetu
6. Studentska služba
   - Čitanje iz baze
   - Pisanje u bazu
   - Izmjena u bazi
   - Brisanje u bazi
   - Kreiranje računa
   - Kreirati kolegij
   - Slanje aktivacijskog maila korisniku
   - Postavljanje globalnih obavijesti
7. Administrator sustava
   - Promjena prava pristupa
8. Baza podataka

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
