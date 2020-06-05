import $ from 'jquery';
import { Cart } from './cart';

export const itSpaCart = () => {
    const cart = new Cart();
    const cartWidget = $(`<div>Kosz ma: <span class="count">${cart.get().length}</span></div>`);

    console.info("TWORZENIE KOSZYKA: ", cart);
    console.log( browser.cookies );
    console.log( cookies );

    browser.cookies.cookiesStore.addEventListener('change', (event) => { // "cookieStore" a "cookiestore" !!! jak się odwołać
        const newCartContent = cart.get();
        console.warn(newCartContent);
        cartWidget.find('.count').text(newCartContent.length);
        // co z tą zmienioną zawartością zrobić?! nadpisać struktury kontrolne?
    });
    
    return cartWidget;    // MOŻE zwrócić, czy PRZENIGDY_W_OGÓLE ?!
}