# Dziennik odżywiania - InFit

## Interfejs
[Projekt interfejsu / widoki](https://marvelapp.com/prototype/c6fj0f3/screens)

[Prototyp](https://marvelapp.com/prototype/c6fj0f3/screen/94319244)

## Opis aplikacji
Dziennik Odżywiania to aplikacja internetowa przeznaczona do liczenia kalorii i śledzenia posiłków. Umożliwia użytkownikom wprowadzanie codziennych posiłków, przekąsek i napojów w celu monitorowania spożycia kalorii.  Użytkownik zakłada własne konto w aplikacji podając przy tym ile kalorii chce dziennie spożywać oraz jakie są jego cele. Aplikacja będzie codziennie sprawdzać czy użytkownik odpowiednio trzyma swoją dietę oraz czy nie brakuje mu jakiś makro i mikroskładników. Jeśli użytkownik nie będzie trzymał się własnych celów, aplikacja będzie wysyłać mu powiadomienia o jego zaniedbaniach. Dzięki spersonalizowanym dziennym celom dotyczącym kalorii użytkownicy mogą ustalać i śledzić swoje postępy w realizacji celów zdrowotnych i sprawnościowych. 

## Opis techniczny

Aplikacja dziennik odżywiania  zostanie napisana z użyciem Vue 3, najnowszej wersji popularnego frameworka JavaScript. 

W celu zarządzania stanem aplikacji oraz nawigacji między różnymi widokami, zostaną wykorzystane Vue Router oraz Vuex. Vue Router umożliwi użytkownikom łatwą nawigację między widokami, natomiast Vuex posłuży do przechowywania stanu aplikacji.

Do zbudowania komponentów aplikacji wykorzystamy Composition API, które pozwoli na czytelne i zorganizowane zarządzanie logiką komponentów poprzez hooki. 

Responsywność aplikacji będzie zapewniona dzięki wykorzystaniu Bootstrapa. Skorzystamy z gotowych komponentów i klasy CSS udostępnianych przez Bootstrapa, co umożliwi dostosowanie wyglądu interfejsu użytkownika do różnych urządzeń oraz ułatwi implementację responsywnego układu.


### Dziennik odżywiania będzie składał się z następujących widoków:
- widoku rejestracji
- widoku logowania
- widoku profilu
- widoku ustawień
- widoku dodawania produktów 
- widoku szczegółowego raportu kalorycznego oraz mikro-makro składnikowego z danego dnia

### Aplikacja będzie miała funkcjonalności takie jak:
- możliwość rejestracji
- możliwość logowania
- możliwość sprawdzenia i zmiany danych profilu
- możliwość dodawania lub szukania produktów
- sprawdzanie ilości kalorii
- możliwość ustawienia powiadomień
- możliwość zmiany ustawień