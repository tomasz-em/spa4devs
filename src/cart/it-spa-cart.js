import $ from 'jquery';
import { Cart } from "./cart";
import { routeChange } from '../router/route-change';
export const itSpaCart = () => {
  const cart = new Cart();
  const $fragment = $( new DocumentFragment() );

  
    // MIAŁEM COŚ TAKIEGO JAKO TREŚC... i tak generowało bład

    const $cartWidget = $(`<li class="cart" id="cart">
    Koszyk (<span class="cart-count">${ cart.getQuantityOfItems() }</span>) <i class="fas fa-shopping-cart"></i></li>`);

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


    $cartWidget.hover( ( evt ) => {    // pierwsza funkcja, gdy mysz NAD elementem (reaguje też an elemenety potomne!)
            cart.showCartSummaryOnHover('show');
            // console.log('MYSZ nad', $(evt.target) );
        },
        (evt) => { // gdy nie ma kursora nad elementem
            cart.showCartSummaryOnHover('hide');
            // console.log('MYSZ poza', $(evt.target) );
    });

    $cartWidget.click( ( evt ) => {    // pierwsza funkcja, gdy mysz NAD elementem
        cart.showCartSummaryOnHover('click');
        // console.log('MYSZ kliknięcie', $(evt.target) );
    });

        // to samo co powyżej, ty;lko w krótszym zapisie
/*   $cartWidget.on('mouseleave mouseover click', (evt) => {
    let action = evt.type == 'mouseover' ? 'show' : 'hide';
    action = evt.type == 'click' ? 'click' : action;
    console.log('HOVER', action)  // hover!
    cart.showCartSummaryOnHover( action );
    }); */

    $fragment.append( $cartWidget );

    return $fragment;
};  // itSpaCart-END

    // ramka z podsumoiwaniem zamówienia
export const cartSummary = () => {  // DO POPRAWKI !!!
  const $fragment = $( new DocumentFragment() );
  const $frame = $('<div class="cart-summary"></div>');
  const $summaryContentFragment = $( new DocumentFragment() );
  const cart = new Cart();
  let cartContent = cart.get(); // lista zamówień

  if ( cartContent.length > 0 ) {   // jeśli coś zostało zapamiętane w ciastakach...

    $summaryContentFragment.append( $('<h5>POKOJE</h5><h5>ZABIEGI</h5><button class="btn btn-primary cart-button">Potwierdź lub zmień zakupy</button>'));
    const $treatmentsListBox = $('<ul></ul>');

    const treatmentsFromCookies = cartContent.filter( cookieElem => cookieElem.tID );
    console.log("KOSZYK: WSZYSTKIE_ZABIEGI", treatmentsFromCookies);  
    const treatmentsList = treatmentsFromCookies.map( cookieCure => {
        // let treatmentDetails = cart.fullInfoAboutTreatment( anyCure.tID );// BARDZO KOSZTOWNE, I KOSZTOWNIEJSZ GDY LISTA SIĘ WYDŁUŻA;
        // !!! +++ KOD NA ODŚWIEŻANIE TREŚCI W WITRYNIE, GDYŻ TO PROMESA! !!!DO TEGO TU/TERAZ W STANIE POCZĄTKOWYM!!! 
        // console.log("DETALE", treatmentDetails);
        return `<li><span>${cookieCure.tN}</span> <div><strong>${cookieCure.tQ}</strong> &times; <strong>${cookieCure.tP},00</strong> zł</div></li>`;
    });

    const $roomsListBox = $('<ul></ul>');
    const roomsFromCookies = cartContent.filter( cookieElem => cookieElem.rID ); // cookieElem.rID && cookieElem
    console.log("KOSZYK: WSZYSTKIE_POKOJE", roomsFromCookies);
    const roomsList = roomsFromCookies.map( anyRoom => {
        const thisRoomQuantity = cart.getQuantityByIDFromCookies( anyRoom.id, 'rID', 'rQ' );
        return `<li><strong>${anyRoom.id}</strong> <div><span>${thisRoomQuantity}</strong> &times; </span><strong>${anyRoom.price},00<strong> zł</div></li>`;
    });
        // doklejanie otrzymanych danych z ciastek do podsumowania
    $roomsListBox.append( roomsList );
    $summaryContentFragment.find('h5:first-of-type').after( $roomsListBox ); 
    $treatmentsListBox.append( treatmentsList );
    $summaryContentFragment.find('h5:last-of-type').after( $treatmentsListBox );
  }
  else {  // brak wykupionych elementów == brak dynamicznej treści podsumowania
      $summaryContentFragment.append( $('<p>Twój koszyk jest pusty. Zafunduj sobie nieco przyjemności ;)</p>') );  // chociaż informacja o pustym koszykus
  }

  $frame.on('mouseover, mouseout', (evt) => {
      const mouseAction = evt.type === 'mouseover' ? 'show' : 'hide';
      cart.showCartSummaryOnHover( mouseAction );
  });

  $frame.prepend( $summaryContentFragment );
  
  $frame.find('.cart-button').on('click', (evt) => {
      console.log('PRZYCISK', $(evt.target) );
      cart.showCartSummaryOnHover('hide');  // ukrycie podsumowania po naciśnięciu przycisku w tym podsumowaniu
       // ewentualnie do klikniętego stanu też się odwołać, aby ramka nie została!
      $(evt.target).trigger( routeChange, { path: '/booking' });
  });
  $fragment.append( $frame );

  return $fragment;
};  // cartSummary-END