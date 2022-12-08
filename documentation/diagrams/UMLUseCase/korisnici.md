@startuml

left to right direction

actor Klijent as Klijent #lightblue;line:blue;line.bold
actor "Registrirani Korisnik" as Reg #lightblue;line:blue;line.bold
actor Profesor as Prof #lightblue;line:blue;line.bold
actor "Studentska Sluzba" as Stuslu #lightblue;line:blue;line.bold
actor "Administrator Sustava" as Admin #lightblue;line:blue;line.bold
actor "Baza Podataka" as Baza #lightblue;line:blue;line.bold

Klijent <|- Reg
Reg <|- Prof
Reg <|- Stuslu
Stuslu <|- Admin

rectangle test {
usecase "Autentikacija" as UC1
usecase "Prijava u sustav" as UC2
usecase "Registracija putem linka" as UC3
usecase "Provjeriti javne detalje o korisnicima" as UC4
usecase "Urediti svoj opis" as UC5
usecase "Pregledati popis korisnika na predmetima koje predaje" as UC6

rectangle {

    usecase "Updavljanje bazom" as UC7
    usecase "Citanje iz baze" as UC8
    usecase "Pisanje u bazu" as UC9
    usecase "Izmjena u bazi" as UC10
    usecase "Brisanje u bazi" as UC11
    usecase "Kreirati linkove za registraciju" as UC12
    usecase "Promjena prava pristupa" as UC13

}

}

UC3 ---> Baza
UC5 ---> Baza

UC7 <|-- UC8
UC7 <|-- UC9
UC7 <|-- UC10
UC7 <|-- UC11

UC1 <|-- UC2
UC1 <|-- UC3

Klijent ---> UC1
Reg ---> UC4
Reg ---> UC5
Prof ---> UC6
Stuslu ---> UC7
Stuslu ---> UC12
Admin ---> UC13

@enduml

<!-- destroy B -->

<!-- https://plantuml.com/ -->
