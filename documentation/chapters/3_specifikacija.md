**Neregistriranom korisniku** prikazuje se naslovna stranica s osnovnim informacijama vezanim za sustav radnog imena "Studius". Isti se može prijaviti u sustav sa svojim korisničkim podacima.

Registracijom u sustav korisnik dobiva razinu prava određenu ulogom u sustavu. Postojat će uloge administratora, fakultetskog osoblja (nositelja kolegija, profesora te asistenata), upisanih studenata, posjetitelja I razvojnog tima.

Svaka od ovih uloga daje pristup određenim funkcionalnostima I informacijama na sustavu.

**Student** prijavom u sustav dobiva prikaz glavne stranice. Na njoj su mu vidljivi njegovi predmeti za koje za svaki piše skupljeni broj bodova. Piše i lista položenih predmeta te prosjek ocjena koji je student ostvario u obrazovnoj ustanovi. Nadalje ima kratki prikaz nadolazećih obaveza, a klikom na tu sekciju, otvara se stranica sa svim obavezama, koje također imaju svaka svoju stranicu. Također ima vidljiv jedan manji kalendar, koje mu je inicijalno stanje da prikazuje dnevni kalendar, ali postoji mogućnost podešavanja na veće vremensko razdoblje. Klikom na kalendar otvara se zasebna stranica s kalendarom, s inicijalnim stanjem pregleda trenutnog tjedna. Također moguće su opcije podešavanja na veće i manje razdoblje. U kalendaru su vidljive sve nadolazeće obaveze, koje nude i daljnje informacije. Student također ima mogućnost dodavanja vlastitih zapisa u kalendar. Nadalje, na glavnoj stranici ispod manje verzije kalendara, vidljiv je popis upisanih predmeta. Klikom na neki od njih, otvara se stranica predmeta. Student ovdje može vidjeti osnovne informacije o predmetu te ima pristup materijalima i svojim rezultatima na predmetu. Dostupni materijali su mu prenesene prezentacije, videi i sl. Također na našoj platformi omogućili bismo pristup interaktivnim lekcijama. Njih kreirea profesor i to omogućuje studentima bolje usavršavanje gradiva, a profesorima opciju da temeljem rezultata daje određeni broj bodova. Slično, ali ne isto, napravili bismo odjeljak s funkcionalnostima sličnim aplikaciji Kahoot koja bi se mogla koristiti na predavanjima uživo, sa svrhom sličnom interaktivnim lekcijama. Studentu su vidljive obaveze vezane za otvoreni predmet. Na glavnoj stranici, ispod popisa predmeta, nalaze se najnovije novosti i obavijesti o fakultetu. Također će student imati pristup detaljnijim obavijestima koje može filtirati ili se na njih pretplaćivati.

Fakultetsko osoblje dijeli se na **nositelje** predmeta, **asistente** te **demonstratore** koji imaju ovisno o tome manja ili veća prava. Prijavom u sustav, osoblje također dobiva prikaz glavne stranice, drugačije od one kakvu vidi student. Vidljiv im je dnevni kalendar, kojem, kao i studenti, mogu podesiti vremenski interval na veći. U njemu su vidljive nadolazeće obavee. Klikom na kalendar otvara se zasebna stranica s većim, ali također podesivim, prikazom. Ovdje osoblje ima mogućnost unosa svojih zapisa, ali također i zapisa kojima mogu podesiti vidljivost. Recimo, žele održati konzultacije u određeno vrijeme za određenu grupu studentata. Na glavnoj stranici, ispod kalendara, nalazi se popis predmeta na kojima sudjeluju. Na njima imaju različite uloge. Za svaki predmet, postoji zasebna stranica. Na njoj imaju pristup listi studenata upisanih na odabrani predmet.

Daje im se mogućnost unosa bodova. Na ovoj stranici nalazit će se QR kod, koji će studenti moći skenirati te se na taj način može evidentirati dolaznost na predavanja. Naravno, imat će mogućnost i oduzimanja bodova za prisutnost u slučaju da primjete da je student napustio predavanje.

Za svaki predmet, postojat će repozitorij materijala, koji se mogu dodavati, brisati te uređivati. Daljim razvojem servisa, omogućili bismo neke funkcionalnosti inspirirane alatom Notion. Nudili bismo prijepis materijala na način da ga profesor može uređivati, a studenti mogu na svaki odlomak ostavljati komentare, te na taj način dobivati povratne informacije od profesora ili od drugih studenata. Time bismo omogućili bolju i lakšu komunikaciju, a time i usvajanje gradiva. Osim materijala, postojao bi pristup kreaciji, brisanju i uređivanju interaktivnih lekcija te ranije navedenim funkcionalnostima sličnim Kahootu. Osoblje ima pristup popisu održavanih provjera na predmetu, te unos bodova za svaku od njih. Nadalje, mogu slati obavijesti vezane za predmet. Ispod popisa predmeta na glavnoj stranici, osoblju se prikazuju obavijesti, slično kao i studentima.

Ulogu posjetitelja dobivaju studenti upisani na fakultet, ali oni koji nisu upisani na određeni predmet. Njima se na stranici tog predmeta prikazuju osnovne informacije o predmetu.

Administrator ima najviša prava, te ih dodjeljuje drugim ulogama.

## 3.1 Funkcionalni zahtjevi <a name="3.1"> </a>

## 3.2 Ostali zahtjevi <a name="3.2"> </a>

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

## 3.3 Obrasci uporabe <a name="3.3"> </a>

![usecases](./diagrams/UMLUseCase/Kolegiji.svg)
slika obrazaca uporabe kolegija <a name = "3.3-slika1"> </a>
![usecases](./diagrams/UMLUseCase/Korisnici.svg)
slika obrazaca uporabe korisnika <a name = "3.3-slika2"> </a>
![usecases](./diagrams/UMLUseCase/Obavijesti.svg)
slika obrazaca uporabe obavijesti <a name = "3.3-slika3"> </a>
![usecases](./diagrams/UMLUseCase/Seminari.svg)
slika obrazaca uporabe seminara <a name = "3.3-slika4"> </a>

:[useCaseList](../diagrams/UMLUseCase/useCaseList.md)

## 3.4 Sekvencijski dijagrami <a name="3.4"> </a>

### 3.4.1 Prijava korisničkim podacima <a name="3.4.1"> </a>

:[sekvencijski](../diagrams/UMLSequence/loginSequence.pu)
slika sekvencijskog dijagrama prijave korisničkim podacima <a name = "3.4.1-slika1"> </a>

Korisnik na početnoj stranici odabire opciju “Prijava”. Web aplikacija mu otvara stranicu prijave, koja ima dvije opcije, prijavu korisničkim podacima te prijavu Google računom. Odabirom opcije “Prijava korisničkim podacima”, otvara mu se forma u koju unosi svoje korisničke podatke. Predajom forme, aplikacija u bazi provjerava ispravnost podataka. U slučaju netočnih podataka, korisnik dobiva error. U slučaju ispravnih podataka, korisnik dobiva token I redirektiran je na početnu stranicu. Odabirom opcije “Prijava putem Google računa”, korisniku Google prikazuje dostupne gmail adrese. Korisnik odabire jednu, odvija se provjera s Google-om te korisnik dobiva token I redirektiran je na početnu stranicu.

### 3.4.2 Kreiranje računa <a name="3.4.2"> </a>

![sek2](./diagrams/UMLSequence/Registracija.png)
slika sekvencijkog dijagrama kreiranja računa <a name = "3.4.2-slika1"> </a>

Studentski službenik otvara formu za registraciju studenta u koju upisuje sve potrebne podatke. Forma traži ponovni upis ukoliko je jedan ili više podataka neispravno te ispisuje razlog neispravnosti pojedinog podatka. Prilikom pravilno ispunjene forme, web aplikacija šalje podatke u bazu podataka te ih veže uz novoizrađenog studenta. Uspjeh o izradi studenta se šalje natrag studentskom službeniku, a mail s podatcima za prijavu se šalje korisniku kojemu pripadaju.

### 3.4.3 Prijava putem Google računa <a name="3.4.3"> </a>

Unaprijed prijavljeni student, pritiskom na, za to predodređen, gumb, zahtjeva web aplikaciju da mu dohvati Google-ovu formu kojom se prijavljuje u svoj postojeći Google račun. Nakon što se uspješno prijavi u svoj Google račun, uspjeh u prijavi se dojavljuje web aplikaciji i studentu. Web aplikacija potom sprema podatke o Google poveznici i dojavljuje studentu uspjeh u povezivanju Google računa nakon čega se web aplikacija vraća na prijašnju stranicu.

### 3.4.4 Prijava seminara <a name="3.4.4"> </a>

![sek3](./diagrams/UMLSequence/sdIzradaSeminara.png)
![sek4](./diagrams/UMLSequence/sdPredlaganjeSeminara.png)
slika sekvencijskog dijagrama izrade seminara <a name = "3.4.4-slika1">

Doktorand, pritiskom na, za to predodređen, gumb, zahtjeva web aplikaciju da mu dohvati formu za prijavu seminara. Dok ideja nije prihvaćena sa strane doktorandovog mentora, doktorand, preko web aplikacije, šalje mentoru nacrt seminara na koju mentor može odgovoriti odobrenjem. Nakon što mentor prihvati nacrt seminara, preko web aplikacije najavljuje predaju istog seminara nakon čega web aplikacija pohranjuje nacrt i datum predaje u bazu podataka. Predaja seminara mora biti najavljena najmanje 7 dana prije same predaje. Prilikom najave predaje seminara, web aplikacija izrađuje oglas seminara na stranici predmeta povezanog s mentorom koji se potom arhivira u bazu podataka. Oglas je vidljiv sve do same predaje seminara. Nositelj predmeta, koji ne mora nužno biti povezan sa seminarom, odluči predložiti seminar na stranici svojeg predmeta te web aplikaciji šalje zahtjev kojom ona hvata oglas. Predlaganje seminara također se pohranjuje u bazu podataka. Prilikom predavanja seminara, mentor predavača boduje seminar preko web aplikacije. Podatci o predaji i bodovanju seminara se pohranjuju u bazu podataka i oglas za isti seminar se briše.

## 3.5 Dionici <a name="3.5"> </a>

1. Klijent
2. Registrirani korisnik
3. Student
4. Profesor
5. Nositelj
6. Doktorand
7. Studentska služba
8. Administrator sustava

## 3.6 Aktori i njihovi funkcionalni zahtjevi <a name="3.6"> </a>

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
