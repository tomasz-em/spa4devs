// określony widok dla danego komponentu -- co ma zawierać HTML jako zwracane treści 
import $ from 'jquery';
import { Cart } from '../cart/cart';
import { itSpaCart as myCart } from '../cart/it-spa-cart';

export const cartInfo = (textContent, clickAction) => { // + , hoverAction
    const fragment = $(new DocumentFragment);   // (+) WYDAJNOŚĆ:
//...brak ciągłych operacji na DOM, przy kolejnej operacji na każdym z nowo dostawianych z osobna elementów lub ich modyfikowaniu (np. atrybuty, itp.)

    fragment
        .append(`
        <div class="cart">
            <h3>${textContent}</h3>
            <p class="hide">Zamówione elementy:
                <span>${myCart().howManyItemsAdded()}</span> 
            </p>
        </div>
        `);

    fragment.on('click', clickAction);
    // fragment.on('hover', hoverAction);
        
    return fragment;
};