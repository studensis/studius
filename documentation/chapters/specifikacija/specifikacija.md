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

### Dionici

1. Klijent
2. Registrirani korisnik
3. Student
4. Profesor
5. Nositelj
6. Studentska služba
7. Administrator sustava

### Aktori i njihovi funkcionalni zahtjevi

1. Klijent
   1. Prijaviti se u sustav
   2. Registrirati se putem linka
   3. Pregledati javne detalje o kolegiju
   4. Provjeriti javne detalje o svakom korisniku
2. Registrirani korisnik
   1. Urediti svoj opis
   2. Pregledati globalnih obavijesti ili obavijesti vezanih uz kolegije na koje je povezan
3. Student može
   1. Upisati dostupni kolegij
   2. Pregledati popis kolegija na koje je upisan
4. Nositelj kolegija može
   1. Postavljanje obaveza na kolegiju
   2. Postavljanje materijala na kolegiju
   3. Pregledati popis kolegija na koje ima nositeljska prava
   4. Uredivati opis kolegija na kojima ima nositeljska prava
   5. Postaviti kolegij na koji ima nositeljska prava je li dostupan za upisivanje
5. Administrator sustava
   1. Kreirati linkove za registraciju u sustav
   2. Čitanje iz svih tablica iz baze podataka
   3. Pisanje u sve tablica iz baze podataka
   4. Uređivanje svih tablica iz baze podataka
   5. Brisanje u svim tablica iz baze podataka
   6. Kreiranje kolegija
   7. Promjena prava pristupa
   8. Pregled statistike

@startuml
Nositelj -[#000000]> Aplikacija : 1.Odabir opcije pregleda predmeta
Nositelj -[#000000]> Aplikacija : 2.Zahtjev o podacima
Nositelj -[#000000]> Aplikacija : 3.Odabir predmeta
Nositelj -[#000000]> Aplikacija : 5.Odabir opcije prikaza statistike na ispitima

Bob -[#red]> Alice : hello2()
Tester -[#red]> Bob : hello2()
Alice -[#0000FF]->Bob : ok
@enduml
