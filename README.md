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
- widok startowy
- widoku rejestracji
- widoku logowania
- widoku profilu
- widok formularza
- widok dziennika produktów 
- widoku bazy produktów
- widok informacji o założycielach
- widok bloga

### Aplikacja będzie miała funkcjonalności takie jak:
- możliwość rejestracji
- możliwość logowania
- możliwość sprawdzenia i zmiany danych profilu
- możliwość dodawania lub szukania produktów
- sprawdzanie ilości kalorii
- możliwość dodania posta dotyczącego odżywiania

### WIDOK STARTOWY "Home" (/)

Zawiera stronę startową projektu, skonfigurowanego vievBoxa z klasami stylów, w którym znajdują się przyciski z linkami przekierowujące do komponentu rejestracji oraz komponentu z informacjami o firmie. 

### WIDOK REJESTRACJI "Register"

Template - zawiera zdefiniowany w htmlu arkusz za pomocą CSS, w którym znajduje się formularz rejestracji, z odpowiednimi przyciskami rejestracji i logowania oraz polami do uzupełnienia przez użytkownika (e-mail oraz hasło)

Script - znajdują się tutaj importy składni VUE3 "ref" dla reaktywnych zmiennych, funkcja "getAuth" dla autentykacji z FireBase, "createUserWithEmailAndPassword" do rejestracji użytkownika za pomocą adresu e-mail i hasła, "GoogleAuthProvider" do autentykacji za pomocą konta Google, "signInWithPopup" do logowania za pomocą okna pop-up oraz "collection" i "addDoc" do dodawania dokumentów do bazy danych FireBase. 

Metoda register: jest wywoływana po kliknięciu przycisku "Submit" w formularzu. Wywołuje ona createUserWithEmailAndPassword z Firebase, aby zarejestrować nowego użytkownika. Po pomyślnym zarejestrowaniu użytkownika, dodaje również dokument do kolekcji "users" w bazie danych Firestore, zawierający informacje o nowym użytkowniku. Po zakończeniu rejestracji, przekierowuje użytkownika na stronę "/info".

Reaktywne zmienne: "ref", "e-mail", "password", które odpowiadają polom wprowadzanym przez użytkownika

Routing dynamiczny do przekierowywania użytkownika po zarejestrowaniu do innych komponentów za pomocą router.push oraz alerty o błędach rejestracji

### WIDOK LOGOWANIA "SignIn"

Template podobny do poprzednika z różnicą w buttonach. Pozostawiony tylko przycisk do logowania.

Importy - dodanie importów "setPersistence" do ustawienia zachowania sesji autentykacji oraz "browserSessionPersistence" do przechowywania sesji autentykacji w przeglądarce.

Zmienne - dodanie rekatywnej zmiennej ErrMsg do wyświetlania błędów logowania

Metoda login po kliknięciu przycisku "Sign in" w formularzu logowania, wywołuje ona setPersistence z Firebase, aby ustawić zachowanie sesji autentykacji na trwałe przechowywanie sesji w przeglądarce. Następnie wywołuje się signInWithEmailAndPassword z Firebase, aby zalogować użytkownika. Po pomyślnym zalogowaniu przekierowuje użytkownika na stronę "/feed".

### WIDOK FORMULARZA "Info"

Template: Zawiera HTML formularza, który wykorzystuje v-model do powiązania danych zmiennych z elementami formularza. Użytkownik może wprowadzać dane do różnych pól formularza, takich jak wiek, płeć lub makroskładniki diety (białko, węglowodany, tłuszcze). Po wypełnieniu formularza użytkownik może kliknąć przycisk "Zapisz", aby przesłać dane.

Script - dodanie "on mounted" do wykonywania operacji po zamontowaniu komponentu.

Importy - dodanie importów "db" do uzyskiwania dostępu do bazy danych oraz "firebase/firestore" do pobierania i aktualizowania danych w bazie danych Firestore.

Zmienne - dodanie zmiennej reaktywnej "formData" do przechowywania danych wprowadzanych przez użytkownika w formularzu. Powiązanie za pomocą v-model z formularzem.

Metoda fetchData: jest to metoda, która pobiera dane użytkownika z bazy danych Firestore i aktualizuje wartości formData w komponencie.

Metoda submitForm jest wywoływana po kliknięciu przycisku "Zapisz" w formularzu. Sprawdza za pomocą metody "isFormFilled" czy formularz jest wypełniony, a następnie aktualizuje dane użytkownika w bazie danych Firestore lub dodaje nowy dokument, jeśli użytkownik nie ma jeszcze wprowadzonych danych. Po zapisaniu danych przekierowuje użytkownika na stronę z kontem użytkownika "account".

Metoda calculateCaloriesAndNutrients:  oblicza zapotrzebowanie kaloryczne użytkownika oraz zalecane spożycie białka, węglowodanów i tłuszczów na podstawie wprowadzonych danych. Wyniki są aktualizowane w reaktywnych zmiennych "formData".

### WIDOK KONTA "Account"

Template - zawiera warunek v-if="userData" , który sprawdza, czy dane użytkownika są dostępne. 

Script - zawiera reaktywne zmienne userData do przechowywania danych użytkownika oraz userUid do przechowywania UID użytkownika, "redirectToInfo", która przekierowuje użytkownika do formularza edycji danych, metodę fetchData, która pobiera dane użytkownika z bazy danych Firebase na podstawie jego UID. Jeśli użytkownik jest zalogowany, pobiera dane z bazy danych i przypisuje je do zmiennej userData. W przeciwnym razie wyświetla błąd w konsoli.

Onmounted - wywołuje metodę fetchData po zamontowaniu komponentu, aby pobrać dane użytkownika z bazy danych.

### WIDOK BAZY PRODUKTÓW "Products"

Template - input "updateFilteredProducts" służy do wprowadzania zapytania wyszukiwania. Jest powiązane z zmienną searchQuery za pomocą v-model. Pętla v-for iteruje przez listę filteredProducts i generuje <router-link> dla każdego produktu. Po kliknięciu na link, użytkownik zostanie przekierowany do strony z danymi szczegółowymi produktu "ProductDetails".

Script - dodajemy reaktywne zmienne "products" i "searchQuery" do przechowywania danych o produktach oraz zapytania wyszukiwania. W "onmounted" pobierane są dane o produktach z bazy danych Firebase i zapisywane do zmiennej products. Następnie wywoływana jest metoda updateFilteredProducts do zainicjowania listy filteredProducts.

Metoda updateFilteredProducts filtruje listę produktów na podstawie wprowadzonego zapytania wyszukiwania. Jeśli zapytanie jest puste, wyświetla wszystkie produkty. W przeciwnym razie wyświetla tylko te produkty, których nazwa zawiera podane zapytanie.

### WIDOK BLOG "Blog"

Template - pętla v-for iteruje przez listę posts i generuje artykuły <article> dla każdego posta. Artykuł zawiera informacje takie jak data, kategoria, tytuł, opis, imię autora i jego rola. Przycisk "Dodaj post" jest wyświetlany tylko gdy użytkownik jest zalogowany (isLoggedIn), a formularz dodawania posta (showForm) jest widoczny po kliknięciu na przycisk lub gdy użytkownik jest zalogowany.

Script - stworzone są reaktywne zmienne posts, showForm, newPost oraz isLoggedIn do przechowywania danych o postach, statusu wyświetlania formularza, informacji o nowym poście oraz statusu zalogowania użytkownika. W "onMounted" pobierane są dane o postach z bazy danych Firebase i zapisywane do zmiennej posts. Metoda "addNewPost" przełącza status wyświetlania formularza dodawania posta. Metoda "submitPost" odpowiada za dodawanie nowego posta. Sprawdza, czy wszystkie wymagane pola formularza są wypełnione, a następnie dodaje nowy post do bazy danych Firebase. Po dodaniu posta, aktualizuje listę posts, czyści formularz oraz ukrywa go.








