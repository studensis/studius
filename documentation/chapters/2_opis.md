### O timu Studius

Okupljena je ekipa od sedmero visoko motivirana člana, od kojih svaki doprinosi svojim usmjerenjem tako da pokrivamo cjeloukupan stack potreban za razvoj platforme.

## 2.0 Opis projektnog zadatka

Projekt “Studius” je osmišljen kao platforma koja objedinjuje set alata potrebnih za rad proizvoljne obrazovne ustanove, prvenstveno fakulteta, na velikom broju studenata, kolegija i posebnih programa. Cilj projekta je kontribuirati boljem iskustvu svakog studenta i profesora diljem Sveučilišta. Posebno smo motivirani da omogućimo fakultetima pored FER-a kvalitetnije rješenje za upravljanje kolegijima i pružimo bolje načine komunikacije profesora i studenata. S obzirom da je to iznimno težak u dugotrajan proces u sklopu kolegija "programsko inženjerstvo" implementirat ćemo samo dio tog većeg projekta. Što ćemo i kako ćemo to implementirati opisano je u nastavku.

Naš sustav ima više uloga, početna uloga od koje sve kreće je klijent Prilikom pokretanja sustava klijentu prikazuju se log in forma s kojom se može prijaviti u sustav. Može se prijaviti putem korisničkih podataka uz korisničko ime i lozinku ili pomoću Google accounta. Ako se klijent želi prijaviti putem Google accounta on mora već biti registriran putem korisničkih podataka. Ova mjera služi kako se nebi svatko mogao registrirati u Studius i kako bi se korisnicima Studiusa ubrzala prijava. Pored log in forme ponuđena je tražilica za kolegije gdje se može pronaći određene kolegije. Na temelju korisnikovog upita sustav generira kolegije. Kad korisnik pronađe kolegij za koji je zainteresiran može kliknuti na njega i prikazat će mu se javni detalji o tom kolegiju. Na sličan način mogu se pretraživati i studenti, doktorandi i djelatnici fakulteta. Takodžer postoje mogućnosti odabira za globalne obavijesti, dakle obavijesti relevantne za cijeli fakultet. Uz to, moguć je i pregled nadolazećih seminara. Seminare su radovi o nekoj istraživačkoj temi i njih održavaju doktorandi. S obzirom da su ti radovi javni, svaki klijent može prisustvovati na njima ako želi. Na dalje, osim klijenta postoje uloge

- Student
- Doktorand
- Profesor
- Nositelj
- Studentska služba
- Administrator sustava

Svaka od tih uloga ima iste mogućnosti kao i klijent uz još neke nadodane.

Na primjer, **student** može upisati dostupni kolegij uz dopuštenje studentske službe ili nositelja predmeta. Jednom kad upiše predmet može pregledati detaljnije obavijesti vezane uz kolegije na koje je upisan koje običan klijent ne može vidjeti. Takodžer mu se nudi i pregled detalja o kolegiju kojima bez prijave u sustav nebi imao pristup. Nakon studenta slijedi doktorand koji ima još neke mogućnosti koje student nema.

**Doktorand** kako bi uspješno položio neke predmete treba odrađivati seminare. Neke mora napraviti i održati sam, a na nekima mora samo prisustvovati. Teme za one koje planira održati može samoinicijativno smisliti i prijaviti pa ju kasnije mentor odobri ili odbije ovisno o tome je li relevantna za njegov predmet. Alternativno, može uzeti neku od tema koja je već predložena na tom predmetu od strane nositelja jer je relevantna za taj predmet.

S druge strane imamo fakultetsko osoblje koje čine: **profesor**, **nositelj**, **studentska služba**, **administrator sustava**. Profesor. može pregledati popis studenata i/ili doktoranada na predmetima kojima predaje, takodžer i njihove statistike ispita. Doktoranadima koje mentorira je zadužen za bilježenje evidencije dolaska, jer je svakom doktorandu propisan broj obaveznih dolaska na seminare drugih doktoranada. Osim toga zadužen je i za odobravanje tema seminara tim doktorandima ovisno o tome je li tema relevantna za njegov predmet

**Nositelj** na svojim predmetima postavlja je li kolegij dostupan za upisivanje. Na tim predmetima može i uređivati opis kolegija, posebno ako dođe do promjena kolegija. S obzirom da je glavni na predmetu zadužen je i za predlaganje tema seminara doktorandima na tom predmetu

**Studentska služba** ima pravo upravljati bazom, tu spada čitanje iz baze, pisanje u bazu, brisanje podataka u bazi i ažuriranje baze svih tablica osim mijenjanja uloge Uz to studentska služba je zadužena za kreiranje računa studentima, doktorandima, i zaposlenicima fakulteta. U aplikaciji nemamo registraciju jer se ona obavlja preko studentske službe, a podaci za prijavu moraju biti doneseni uživo. Prilikom izrade računa dužna je obavijestiti novoizrađenog korisnika mailom. Osim toga ima pravo i na kreiranje kolegija. Kad profesorsko vijeće osmisli novi predmet Studentska služba je ta koja će staviti podatke na stranicu fakulteta sa svim traženim podacima.

Administrator sustava
Studentska služba ima skoro sve, ali zbog potreba sigurnosti treba rola jača od nje a to je administrator sustava. Samo jedan korisnik može imati ulogu administratora.
Ta uloga ima sve mogućnosti kao i studentska služba uz dodatnu mogućnost promjene role korisnicima.

## 2.1 Komponente sustava <a name="2.1"> </a>

### 2.1.1 Alat za upravljanje korisnicima <a name="2.1.1"> </a>

Poseban alat koji bi pretežno djelovao automatski, ali i uz mogućnost ručnih izmjena je alat za upravljanje korisnicima na razini samog sustava.

### 2.1.2 Alat za upravljanje kolegijima <a name="2.1.2"> </a>

Neregistrirani korisnici bi imali uvid u javne informacije za svaki kolegij kao sto su opis predmeta, način bodovanja, popis profesora, asistenata i ostalih službenih sudionika.

Registrirani korisnici, kojima su dodijeljena prava dubljeg pregleda u kolegij, bi mogli prolaziti kroz sam sadržaj kolegija u obliku lekcija, materijala, te kvizova i zadataka za vježbu.

Posebno za svaki kolegij određuju se registrirani korisnici koji bi dobili ulogu Editora. Svaki editor bi mogao mijenjati javno dostupne stranice, te sam sadržaj lekcija unutar kolegija. Pored sadržaja, editori (ili potencijalno još neka visa rola) bi mogli mijenjati i samu listu registriranih korisnika kojima je dano pravo dubljeg pregleda.

### 2.1.3 Sustav za sadržaj <a name="2.1.3"> </a>

Od profila korisnika do sadržaja lekcija unutar kolegija, sustav za sadržaj pobrinuo bi se da se diljem stranice sadržaj organizira na što pregledniji način, te bi olakšavao i pregled i uređivanje, naravno sa širokim mogućnostima proširenja kroz ekstenzije.

### 2.1.4 Sustav za seminare <a name="2.1.4"> </a>
