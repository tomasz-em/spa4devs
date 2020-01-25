import { home, rooms, treatments, booking } from '../views'; 
// pobierze wszystkie wskazane widoki, jeśli istnieje w "index.js" coś zdefinioowanego w tym wskazanym folderze o eksporcie 
    // (reeksport jest wykonywany; "barrel" ten wzorzec się zwie)
    // to jest w równoległym folderze, dlatego przejście powyżej, by wejśc obok ("../cos" a nie "./cos_innego")

export const routes = [ // co ma zawierać pojedyncza ścieżka

    // "data" jako mozliwośc przekazania danych pomiędzy widokami, gdyu się bedzie wędrować
    // "component" - jaki własny komponent ma być domyślnie używany?! i wyrenderowany
    { path: '/', data: {}, component: home },   // strona główna, początek wędrówki
    { path: '/rooms', data: {}, component: rooms },  // np. lista pokojów do wyboru
    { path: '/treatments', data: {}, component: treatments }, // np. lista zabiegów
    { path: '/bookings', data: {}, component: booking }    // logika rezerwacji/wykupu usługi
];