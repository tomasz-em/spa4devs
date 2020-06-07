import $ from 'jquery';
import { routes } from './routes';  // plik z dysku, bieżący katalog
import { oops404 } from '../views';    // !!! U MNIE "oops404" BYŁO UŻYWANE - PODMIENIĆ!!!to jest powyżej 
import { routeChange } from './route-change';   // auto-import ;)

// jako klasę najlepiej utworzyć, bo ma mieć metody do operowania stanem (zarządza stanem aplikacji)
// "export" przy okazji, by móc też tego używać na zewnątrz, poza tym plikiem (modułem)
export class Router {   // własna klasa routera :)

  constructor() {
    this.body = $( document.body );
    this.outlet = $('main');    // główny element do wyświetlania treści; "miejsce renderowania widoku"!
    this.routes = routes;   // lista ścieżek w aplikacji, które powinny reagować na działania, tu zostały zaimportowane z zewnętrznego pliku
  }

  mount( outlet ) {   // nazwa WSZYSTKICH funkcji jest własna, ma tylko dotyczyć celu
    this.outlet = outlet;


    // dodanie nasłuchiwania na konkretne zdarzenie zmiany ścieżki (pierwsze własne zdarzenie)
    // posiadamy "kopię" <body> w jQ, zatem można do niego podpiąc to nasłuchiwanie
        // detail to, np. { path: '/booking' }
    this.body.on(routeChange, ( event, detail ) => {   // nie tylko obiekt zdarzenia, ale też argument z danymi funkcji trigger() jest przekazywany (dalej z tego ustawienia, jakiś pakunek, paczka danych) 
        // console.log(evt);   // CZY COŚ SIĘ LOGUJE?
        this.navigate( detail.path );   // a te dane końcówki URLa to przekazano uprzednio do emitowania
    });

    // TODO: uzyj zdarzenia 'popstate', aby wyrenderowac odpowiednia
    // sciezke, gdy uzytkownik klika Wstecz (<-) lub Naprzod (->)
  } // mount-END

  init() {    // użyteczne w przypisaniu czegoś od razu do paska adresu (jeśli np. jesteśmy w jakiejś podstronie)
    this.navigate( location.pathname );
  }

  // pobieraznie obiektu z ścieżki w GET
  get( path ) {
    return this.routes.find( route => route.path === path );  // liczba mnoga dla kontenera (tablicy), w liczbie pojedynczej  
  }   // ma zwrócić to, co znajdzie ewentualnie pasujący odnośnik do tych zdefiniowanych
    // gdy nie ma tokowego to undefined z find() jest przekazywany 

  getSubpage( path ) {
    return this.routes.find( route => route.path.indexOf( path ) >= 0 );  // liczba mnoga dla kontenera (tablicy), w liczbie pojedynczej  
  }   // ma zwrócić to, co znajdzie ewentualnie pasujący odnośnik do tych zdefiniowanych
  

  has( path ) {
    return this.get( path ) !== undefined;    // jeśli dostaliśmy coś, bo taki jest prawidłowy odnośnik wśród zdefiniowanych, a nie "/cokolwiek", "/tajne-hasla/", "/nic666"
  }

  navigate( path, data = {} ) { // "data" - ewentualnie kontener na przekazywanie dodatkowych danych pomiędzy widokami
    // sciezka istnieje, mozna nawigowac
    if ( this.has( path ) ) { // że użyto parametów w GET jako bezpiecznych; tych z listy wskazanych wartości
      // { path: '/booking', data: {}, component: booking }
      const { component } = this.get( path );
    // stąd dane: { path: '/bookings', data: {}, component: booking } -- z 'routes.js' to się bierze, 
    // gdzie zdefiniowano "komplety", czyli "sparowano" komponent z konkretną końcówką danego adresu

      const html = component();  // komponent(), to jakiś konretny komponent; zmienna jako referencja pobrana wraz ze zdefiniowaną ścieżką w tablicy w "routes.js"
      // .. a to z foldera "views" zostało zaczytane; funkcja strzałkowa to jest, będzie prosty lub złożony HTML jako wynik (tam zdefiniowany)
     
              // A PONIŻEJ TO NALEZY TAK ZASTĄPIĆ średnik powyżej, by operowało to na promesach 
          /*  .then( html => {
              this.outlet.empty().append(html);
          }) */
          
      this.outlet.empty().append( html );
    }
    else { // coś nie tak z adresem, więc wygenerowanie strony "status-404"
    console.log("BŁĄD ŚCIEŻKI", path);
      const html = oops404();
      this.outlet.empty().append( html );
    }

// operowanie historią w przeglądarce, gdy się coś zmieniło w treści po wybraniu odnośnika (opis poszczególnych numerów parametrów)
// 1 parametr - dane dodatkowe,
// 2 - aktualizacja tytułu okna przeglądarki (kiepska obsługa w przeglądarkach tą drogą póki co, dlatego brak przekazywanej zaktualizowanej nazwy)
// 3 - nowe odniesienie dla paska adresu   
    history.pushState(data, '', path); // ZMIENIA ZAWARTOŚĆ HISTORII PRZEGLĄDARKI
    // parametry: dane, "tytuł strony", wpisana ścieżka

  } // navigate-END


  navigateSubpage( fullPath, data = {} ) { // "data" - ewentualnie kontener na przekazywanie dodatkowych danych pomiędzy widokami
    // sciezka istnieje, mozna nawigowac
    const slashPosition = fullPath.lastIndexOf('/');
    const path = fullPath.substring(0, slashPosition );
    const subpagePath = fullPath.substring( slashPosition );

    if ( this.has( fullPath ) ) { // że użyto parametów w GET jako bezpiecznych; tych z listy wskazanych wartości
      // { path: '/booking', data: {}, component: booking }
      const { component } = this.getSubpage( fullPath );
    // stąd dane: { path: '/bookings', data: {}, component: booking } -- z 'routes.js' to się bierze, 
    // gdzie zdefiniowano "komplety", czyli "sparowano" komponent z konkretną końcówką danego adresu

      const html = component();  // komponent(), to jakiś konretny komponent; zmienna jako referencja pobrana wraz ze zdefiniowaną ścieżką w tablicy w "routes.js"
      // .. a to z foldera "views" zostało zaczytane; funkcja strzałkowa to jest, będzie prosty lub złożony HTML jako wynik (tam zdefiniowany)
     
              // A PONIŻEJ TO NALEZY TAK ZASTĄPIĆ średnik powyżej, by operowało to na promesach 
          /*  .then( html => {
              this.outlet.empty().append(html);
          }) */
          
      this.outlet.empty().append( html );
    }
    else { // coś nie tak z adresem, więc wygenerowanie strony "status-404"
      console.log("BŁĄD ŚCIEŻKI (PODSRONA)", fullPath);
      const html = oops404();
      this.outlet.empty().append( html );
    }

    history.pushState(data, '', fullPath); // ZMIENIA ZAWARTOŚĆ HISTORII PRZEGLĄDARKI

  } // navigateSubpage-END  

} // Router-class-END