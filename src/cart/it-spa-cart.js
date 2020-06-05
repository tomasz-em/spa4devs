import $ from 'jquery';
import { Cart } from "./cart";

export const itSpaCart = () => {
  const cart = new Cart();
  const fragment = $(new DocumentFragment() );

    // MIAŁEM COŚ TAKIEGO JAKO TREŚC... i tak generowało bład
/*
    const cartWidget = $(`<div>Kosz ma: <span class="count">${cart.get().length}</span></div>`);

    console.info("TWORZENIE KOSZYKA: ", cart);
    console.log( browser.cookies );
    console.log( cookies );
        // "browser" - przeglądarka na to protestuje
    browser.cookies.cookiesStore.addEventListener('change', (event) => { // "cookieStore" a "cookiestore" !!! jak się odwołać
        const newCartContent = cart.get();
        console.warn(newCartContent);
        cartWidget.find('.count').text(newCartContent.length);
        // co z tą zmienioną zawartością zrobić?! nadpisać struktury kontrolne?
    });
    
    return cartWidget;    // MOŻE zwrócić, czy PRZENIGDY_W_OGÓLE ?!
*/

  cookieStore.addEventListener('change', (event) => {
      // jesli zaistniala zmiana w cookies,
      // ponownie pobieram zawartosc kosza
      const nowaZawartosc = cart.get();

      // ...i poprawiam wyswietlane przez kosz informacje
      // TODO: zaktualizuj to co wyswietla obecnie koszyk
  });

  // return fragment;
};
