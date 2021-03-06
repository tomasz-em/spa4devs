import { home, rooms, treatments, booking } from '../views';
// pobierze wszystkie wskazane widoki, jeśli istnieje w "index.js" coś zdefiniowanego w tym wskazanym folderze o eksporcie 
    // (reeksport jest wykonywany; "barrel" ten wzorzec się zwie)
    // to jest w równoległym folderze, dlatego przejście powyżej, by wejśc obok ("../cos" a nie "./cos_innego")

export const routes = [ // co ma zawierać pojedyncza ścieżka

    // "data" jako mozliwość przekazania (dodatkowych) danych pomiędzy widokami, gdy się będzie wędrować między nimi
    // "component" - jaki własny komponent ma być domyślnie używany?! i wyrenderowany (referencja do danej funkcji strzałkowej)
  { name: 'Home', type: 'nav', path: '/', data: {}, component: home },   // strona główna, początek wędrówki
  { name: 'Rooms', type: 'nav', path: '/rooms', data: {}, component: rooms },  // np. lista pokoi do wyboru
  { name: 'Treatments', type: 'nav', path: '/treatments', data: {}, component: treatments }, // np. lista zabiegów
  { name: 'Booking', type: 'nav', path: '/booking', data: {}, component: booking },   // logika rezerwacji/wykupu usługi
         // ...      // rozszerzenie aplikacji o kolejne adresy do obsługi
  { name: 'Treatment Details', type: 'treatment-details', path: '/treatment/', data: { treatmentID : 1 }, component: treatments } // np. szczegóły DANEGO zabiegu
];
