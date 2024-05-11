# Dziennik odżywiania - InFit

## Hosting
[bai-infit.web.app](https://bai-infit.web.app/)

## Interfejs
[Projekt interfejsu / widoki](https://marvelapp.com/prototype/c6fj0f3/screens)

[Prototyp](https://marvelapp.com/prototype/c6fj0f3/screen/94319244)

## Opis aplikacji
Dziennik Odżywiania to aplikacja internetowa przeznaczona do liczenia kalorii i śledzenia posiłków. Umożliwia użytkownikom wprowadzanie codziennych posiłków i napojów w celu monitorowania spożycia kalorii oraz innych wartości odżywczych. Użytkownik zakłada własne konto w aplikacji oraz wypełnia krótką ankietę ważnych danych w celu określenia zalecanego celu kalorycznego oraz mikro/makro składnikowego. Aplikacja będzie codziennie sprawdzać czy użytkownik odpowiednio trzyma swoją dietę oraz czy nie brakuje mu jakiś makro i mikroskładników. Użytkownicy mogą ustalać i śledzić swoje postępy w realizacji celów zdrowotnych. Mogą przeglądać bazę produktów, jak i czytać oraz dodawać posty na blogu. 

## Opis techniczny

Aplikacja dziennik odżywiania  została napisana z użyciem Vue 3, najnowszej wersji popularnego frameworka JavaScript. 
W celu zarządzania stanem aplikacji oraz nawigacji między różnymi widokami, został wykorzystany Vue Route. Vue Router umożliwi użytkownikom łatwą nawigację między widokami oraz pozwolił na stworzenie dynamicznego routingu.
Do zbudowania komponentów aplikacji wykorzystano Composition API, które pozwoliło na czytelne i zorganizowane zarządzanie logiką komponentów między innymi skorzystaliśmy z: Reactivity API, Lifecycle Hooks i setup().
Responsywność aplikacji jest zapewniona dzięki wykorzystaniu Tailwind css oraz własne style. Skorzystaliśmy z kilku gotowych komponentów i klas CSS udostępnianych przez Tailwinda, co umożliwiło dostosowanie wyglądu interfejsu użytkownika oraz ułatwiło implementację responsywnego układu. Wykorzystano firebase API oraz skożystano z takich usług jak storage, hosting, firestore database oraz authentication.


### Dziennik odżywiania składa się z następujących widoków:
- widoku startowego
- widoku rejestracji
- widoku logowania
- widoku profilu
- widoku formularza danych o użytkowniku
- widoku produktów 
- widoku szczegółowego każdego produktu
- widoku informacji o twórcach
- widok bloga

### Aplikacja posiada funkcjonalności takie jak:
- możliwość rejestracji
- możliwość logowania
- możliwość sprawdzenia i zmiany danych profilu
- możliwość szukania produktów 
- możliwosć sprawdzania ilości kalorii produktów
- możliwość sprawdzenia ilości spożytych w danym posiłku w danym dniu 
- możliwość dodania posta dotyczącego odżywiania
- możliwość dodawania oraz usuwania produktów spożywczych do określonych posiłków w danej dacie
- możliwość śledzenia swoich celów kalorycznych dzięki paskowi postępu
  









