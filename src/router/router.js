import $ from 'jquery';
import { routes } from './routes';  // plik z dysku, bieżący katalog
import { oops404 } from '../views';    // to jest powyżej 

// jako klasę najlepiej utworzyć, bo mam mieć metody do operowania stanem...
// przy okazji móc tez tego uiżywac na zewnątrz, poza tym plikiem (modułem)
export class Router {       // własna klasa routera

    constructor() {
        this.body = $(document.body);
        this.outlet = $('main');    // główny element do wyświetlania treści; "miejsce renderowania widoku"!
        this.routes = routes;   // lista ścieżek w aplikacji, które powinny reagować na działania, tu zostały zaimportowane z zewnątrznego pliku
    }

mount( outlet ) {   // nazwa funkcji jest własna, ma tylko dotyczyć celu   
    this.outlet = outlet;
}

init() {    // użyteczne w przypisaniu czegoś od razu do paska adresu (jeśli np. jesteśmy w jakiejś podstronie)
    this.navigate( location.pathname );
}

// pobieraznie obiektu z ścieżki w GET
get( path ) {
    return this.routes.find( route => route.path === path );  // liczba mnoga dla kontenera (tablicy), w liczbie pojedynczej  
}   // ma zwrócić to, co znajdzie ewentualnie pasujący odnośnik do tych zdefiniowanych
    // gdy nie ma toakowego to undefined z find() jets przekazywany 

has( path ) {
    return this.get( path ) !== undefined;    // jeśli dostaliśmy coś, bo taki jets prawidłowy odnośnik wśród zdefiniowanych, a nie "/cokolwiek", "/hasła/", "/nic666"
}

navigate( path, data = {} ) {    // "data" - ewentulanie kontener na przekazywanie dodatkowych danych pomiędzy widokami
    if ( this.has(path) ) { // że użyto parametów w GET jako bezpiecznych; tych z listy wskazanych wartości  
    const { component } = this.get( path );
    // stąd dane: { path: '/bookings', data: {}, component: booking } -- z 'routes.js' to się bierze, gdzie zde
    const html = component();  // komponent(), to jakiś konretny komonent; zmienna jako referencja pobrana wraz ze zdefinioaną ścieżką w tablicy w "routes.js"
    // .. a to z foldera "views" się zaczytała; funkcja strzałkowa to jest, będzie prosty lub złożony HTML jako wynik (tam zdefiniowany)

    this.outlet.empty().append( html );
    }
    else { // coś nie tak z z adresem, więc wygenerowanie strony status-404
    const html = oops404();
    this.outlet.empty().append( html );
    }

// operowanie historią w przeglądarce, gdy się coś zmieniło w treści po wybraniu odnośnika
// 1 paramtr1 - dane dodatkowe,
// 2 - aktualizacja tytułu okna przeglądarki (kiepsak obsługa w przeglądarkach)
//  3, nowe odniesienie dla paska adresu   
history.pushState( data, '', path); // 
// dane, "tytuł strony", wpisana ścieżka


}

} // Router-class-END