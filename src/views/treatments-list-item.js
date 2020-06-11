// SZABLON POJEDYNCZEGO ELEMENTU POKOJU <li>

import $ from 'jquery';

    import { routeChange } from '../router/route-change';
    import { addTreatment } from '../router/add-treatment';
    import { routes } from '../router/routes';
    import { Cart } from '../cart/cart';


export const treatmentsListItem = ( anyCure ) => {
    const $li = $('<li class="list-group-item"></li>');

    const myCart = new Cart();
    const isTreatmentAlreadyInCart = myCart.isElementPresentInCookies( 'tID', anyCure.id );
    let alreadyOrderedQuantity = myCart.getQuantityByIDFromCookies( anyCure.id );
        if ( alreadyOrderedQuantity === -1 ) alreadyOrderedQuantity = 0;   // wskazanie na 0, bo -1 to BRAK w ciastkach

    console.log( "ZABIEG " + anyCure.id + " obecny w elemencie?", isTreatmentAlreadyInCart, alreadyOrderedQuantity );
        if ( isTreatmentAlreadyInCart ) $li.addClass('treatment-present');
        else $li.removeClass('treatment-present');  // na wszelki wypadek... ale wariant nie wystąpi...

    const $fragment = $( new DocumentFragment() );

    /*
    BASE_ATTR:
      "id": number,
      "name": string,
      "area": string | enum,
      "time": number,
      "price": number
*/

    const myCureHTML = `
        <h4 class="room-name">
            <strong>${anyCure.name}</strong> (<span title="nr identyfikatora">#${anyCure.id}</span>)
            - <a href="/treatment/${anyCure.id}">poznaj szczegóły kuracji</a>
        </h4>
        <h5>
            Obszar ciała: <strong>${anyCure.area}</strong><br />
            Czas trwania: <strong>${anyCure.time}</strong> 
        </h5>
        <h5 class="price">
            Cena: <strong>${anyCure.price}</strong> zł za zabieg
        </h5>
        <div class="treatment-booking">
            <form id="treatment-booking" data-cure-id="${anyCure.id}">
                <label>Ile zabiegów:
                    <input type="number" id="select-cure-n-times-${anyCure.id}" name="select-cure-n-times-${anyCure.id}" class="select-cure-n-times" min="0" max="28" maxlength="2" value="${alreadyOrderedQuantity}" />
                </label>
                <button id="buy-cure-${anyCure.id}" class="btn btn-primary buy-cure" data-cure-id="${anyCure.id}">Dodaję ten zabieg</button>
                <button id="remove-cure-${anyCure.id}" class="btn btn-secondary remove-cure" data-cure-id="${anyCure.id} data-cure-q="${alreadyOrderedQuantity}">Usuń zabieg (${alreadyOrderedQuantity})</button>
                <p class="d-none error-text">
                    Podaj właściwą liczbę zabiegów (oczekiwana wartość od 1 do 28)
                </p>
            </form>
        </div>    
    `;

    $fragment.append( myCureHTML );

    $li.append( $fragment );

    $li.find('a').on('click', ( evt ) => {
        evt.preventDefault();   // ! bez automatyczneog przejścia na podstronę... pod jakikolwiek odnośnik
        let lastSlashPosition = evt.target.href.lastIndexOf("/") + 1;   // pominięcie "/", ważne co za tym znakiem
        console.log("Cure CLICK <a>:", evt.target.href, "pozyskano:", evt.target.href.substring(lastSlashPosition));
         // ...?! I CO DALEJ Z TYM ŻE SIĘ LOGUJE... JAK WYKORZYSTAĆ TEN ODNOŚNIK 
        $(this).trigger(routeChange, { path: routes[4].path + evt.target.href.substring(lastSlashPosition), data: { treatmentID: evt.target.href.substring(lastSlashPosition) } })
    }); 

    $li.find('.remove-cure').on('click', ( evt ) => {
        evt.preventDefault();   // ! aby nie robić ostatniego przycisku submita dla formularza !
        const $eventElem = $( evt.target );
        const treatmentID = parseInt( $eventElem.data('cure-id'), 10 );
        let numberOfTreatments = parseInt( $eventElem.data('cure-q'), 10 );
        const $treatmentQuantityElem = $eventElem.parent().find('.select-cure-n-times');
        // numberOfTreatments = isNaN( numberOfTreatments ) ? numberOfTreatments = 0 : numberOfTreatments; // dodatkowa weryfikacja
        console.log("Cure DELETE, ID:", treatmentID, "quantity", numberOfTreatments, "ELEMENT:", evt.target); // zwrot wartości 
        myCart.removeItemByID( treatmentID );
        $li.removeClass('treatment-present');
        $treatmentQuantityElem.val( 0 );    // zerowanie stanu zabiegów do dodania 
    }); 


    $li.find('form').on('submit', ( evt ) => {
        evt.preventDefault();   // zablokuj przesłanie po [Enter] oraz DOMYŚLNYM_PRZYYCISKU
        const $eventElem = $( evt.target );
        const treatmentName = $eventElem.parents('li').find('h4 > strong').first().text();
        const treatmentID = parseInt( $eventElem.find('.buy-cure').data('cure-id'), 10 );
        let numberOfTreatments = parseInt( $eventElem.find('input.select-cure-n-times').val(), 10 );
        let $warningText = $eventElem.find('p.error-text');
        numberOfTreatments = isNaN( numberOfTreatments ) ? numberOfTreatments = 0 : numberOfTreatments; // dodatkowa weryfikacja
        console.log("Cure SUBMIT:", evt.target.lastElementChild.id, "x", numberOfTreatments, "FORMULARZ:", evt.target); // zwrot wartości 

        const isTreatmentAlreadyInCart = myCart.isElementPresentInCookies('tID', treatmentID);
        //if ( isTreatmentAlreadyInCart ) $li.find('.remove-cure').removeClass('d-none');
        //else $li.find('.remove-cure').addClass('d-none');  // na wszelki wypadek... ale wariant nie wystąpi...

        if ( numberOfTreatments > 0 ) {
    // animacje jQuery nie za bardzo "lubią się' z  bootstrapem, zwłaszcza z klasami "d-none" i "d-block"...
            /* $warningText.hide(300, () => { */ 
            $warningText.addClass('d-none').removeClass('d-block'); /* }); */
            $li.addClass('treatment-present');
            $eventElem.find('.select-cure-n-times').val(0); // zerowanie zawartosci pola wyboru  
            $eventElem.find('.remove-cure').text(`Usuń zabieg (${numberOfTreatments})`);
            console.log('WYKONYWANIE DOPISYWANIA ZABIEGU - WŁASNE zdarzenie...');   // ale przeciez można od razu operowoć na koszyku, bez tworzenia włąsnego zdarzenia
            $eventElem.trigger(addTreatment, { totalNumber: numberOfTreatments, name: treatmentName, ID: treatmentID });
        } 
        else {
            /* $warningText.show(300), () => { */ 
            $warningText.addClass('d-block').removeClass('d-none'); /* }; */
        }
         // ...?! I CO DALEJ Z TYM ŻE SIĘ LOGUJE... JAK WYKORZYSTAĆ TEN ODNOŚNIK 
        // $li.trigger(routeChange, { path: routes[4].path, data: { treatmentID: evt.target.href } })
    }); 

    console.log('KURACJA:', $li);
    return $li;
};
