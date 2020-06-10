    // dołączenia głównych treści zewnętrznych 
import 'bootstrap/dist/css/bootstrap.css';  // #1 - tu najpierw bilioteki stylów (ogólne zdefiniowane style zewnątrzne)
import './it-spa.scss';  // #2, kolejno: bezpośredni import głównego pliku stylów (własne definicje) by ewentulanie nadpisać już zdefiniowane (kaskadowaść a style domyślne)
    // teraz SASS zamiast zwykłego CSS
import $ from 'jquery';     // skoro używamyj Query, to przed pierwszym odwołaniem potrzebny takowy zewnętrzny zasób 
import { Router } from './router/router';   // a to najważniejsza zdefiniowana klasa do obsługi tej witryny SPA - zasób lokalny z dysku
import { nav } from './navigation/nav'; // potrzebny import komponentu
import { addTreatment } from './router/add-treatment';
// import { itSpaCart } from './cart/it-spa-cart';
import { Cart } from './cart/cart';

// import {  }
let someValue = 0;
// let myCart = new Cart();

const $main = $('main');     // cache dla modyfikowanej zawartości (poprzez jQ); to główny kontener na którym operuje JS

const router = new Router();    // własna klasa routera

// a dalej to już operujemy utworzoną logiką, konretne odwołania do zdefiniowanych metod
router.mount( $main );   // montowanie; cała dynamiczna zawartość to się ma wyświetlać w tym konkretnym elemencie

router.init();  // nawigacja na podstawie już wpisanej ścieżki w pasku adresu
    // tylko raz się ma to wykonać na starcie.. gdy zły adres to "status404", tj. projektowy "oops404"

    // dynamiczna nawigacja leci powyżej <main>, aby by się cały czas nie pojawiał od nowa, gdy będzie zmiana adresu
$main.on(addTreatment, ( evt, data ) => {
    let $newTreatment = $('<h4>').html(`${++someValue}. Dodano <strong>${data.totalNumber}</strong> zabieg/zabiegów typu <strong>${data.name}</strong>`);
    console.log("ZDARZENIE_" + addTreatment +"_:", evt, data);
    $main.prepend( $newTreatment );

    let myCart = new Cart();
    let addedTreatment = { 
        tID: data.ID, 
        tQuantity: data.totalNumber
    };

    console.log( myCart );
    // !!!
    myCart.addItem( addedTreatment );   // TA METODA DODANIA NIE ZADZIAŁA! NIE ISTNIEJE "CART", CZY METODY W NIM NIE PRZYJMUJĄ OBIEKTÓW?!
    // !!!
});

$main.before( nav() );   // wstawienie PRZED z wywołaniem funkcji jako komponentu 