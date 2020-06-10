import $ from 'jquery';
import { Cart } from "./cart";

export const itSpaCart = () => {
  const cart = new Cart();
  const $fragment = $(new DocumentFragment() );

  
    // MIAŁEM COŚ TAKIEGO JAKO TREŚC... i tak generowało bład

    const $cartWidget = $(`<li class="cart" id="cart">Koszyk (<span class="count">${ cart.getQuantityOfItems() }/${ cart.totalItemsAdded() }</span>) <i class="fas fa-shopping-cart"></i></li>`);

    console.info("TWORZENIE KOSZYKA (cart): ", cart); //, "cookies:", cookiesStore );
        // "browser" - przeglądarka na to protestuje

/*     cookiesStore.addEventListener('change', (event) => { // "cookieStore" a "cookiestore" !!! jak się odwołać
        const newCartContent = cart.get();
        console.warn(newCartContent);
        // $cartWidget.find('.count').text(newCartContent.length);
        // co z tą zmienioną zawartością zrobić?! nadpisać struktury kontrolne?
    });
 */    
    // return cartWidget;    // MOŻE zwrócić, czy PRZENIGDY_W_OGÓLE ?!

/*   cookieStore.addEventListener('change', (event) => {
      // jesli zaistniala zmiana w cookies,
      // ponownie pobieram zawartosc kosza
      const nowaZawartosc = cart.get();

      // ...i poprawiam wyswietlane przez kosz informacje
      // TODO: zaktualizuj to co wyswietla obecnie koszyk
  }); */

  $fragment.append( $cartWidget );

  return $fragment;
};
