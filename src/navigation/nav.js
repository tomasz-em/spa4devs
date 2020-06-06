import $ from 'jquery';
import { routeChange } from '../router/route-change';
import { routes } from '../router/routes';
import { navItem } from './nav-item';
// PORZUCIĆ TEN WŁASNY PLIK "cart-info.js"
// import { cartInfo } from './cart-info'; 

export const nav = () => {
  const navbar = $(`
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <span class="navbar-brand">SPA4DEVS <i class="fas fa-code"></i></span>
      <ul class="navbar-nav mr-auto"></ul>
    </nav>
  `);

  // PONIŻSZE PRAWDOPODOBNIE WYLĄDOWAŁO WCZEŚNEJ W ZŁYM PLIKU
  // ... ALBO POCHODZI Z KODU TYMCZASOWEGO, EFEKTYWNIE PODMIENIONEGO...... ZAKOMENTOWANO!
/*
  // tu powołujemy (wywołujemy) jakieś zdarzenie o własnej nazwie; też jakieś dane można podrzucić do tego
    // najlepiej UŻYĆ STAŁEJ JAKO NAZWY DLA TEGO WŁASNEGO ZDARZENIA, celem BRAKU KONFLIKTÓW Z ISTNIEJĄCYMI ZDARZENIAMI (ich nazwami)

    const anchorText = "Testowe 'Booking'";
    const bookingNavItem = navItem(anchorText, () => {
        navbar.trigger(routeChange, { path: '/booking' });    // wysłanie funkcji na obsługę kliknięcia
        console.log('test klikania na TESTOWYM elemencie nawigacji... działa?');
    });    // auto-import pliku gdzie siedzi ta stała ;)
    // jakieś zdarzenie do obsługi click...?

    navbar.find('ul').append(bookingNavItem);    // TODO-OK: lista elementów do klikania w <ul> + emitowanie zdarzenia dla komponentu dziecka 

    let navItems;   // dynamiczna lista w nawigacji na podstawie znanych adresów odnośników
    // zawarto w "routes.js" dodatkowy atrybut "name" dla każdego z przycsików
    navItems = routes.map((route) => {
        // można tu użyć destrukturyzacji, np "const { name, path } = route;" 
        const dynamicItem = navItem(route.name, () => {
            navbar.trigger(routeChange, { path: route.path });    // wysłanie funkcji na obsługę kliknięcia
            console.log('test klikania na dynamicznym elemencie nawigacji... działa?');

        });    // auto-import pliku gdzie siedzi ta stała ;)
        return dynamicItem; // jawny zwrot jako dokładanie elementu do listy
    });
    

    navbar.find('ul').append(navItems); // wstawienie od razu całej kolekcji 

    const cartName = "KOSZYK";
    const navCartInfo = cartInfo(cartName, () => {
        //navbar.trigger()
    });
*/
  // KONIEC ZAKOMENTOWANYCH TREŚCI

  // chcemy zbudowac tablice elementow navItem z odpowiednimi nazwami i callbackami
  const navItems = routes.map( route => {
    const { name, path } = route;
    return navItem(name, () => navbar.trigger(routeChange, { path: path }) );
  });

  navbar.find('ul').append( navItems );

  return navbar;    // zwróć cały zbudowany element z uzupełnionymi  
};
