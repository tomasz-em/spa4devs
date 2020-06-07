// SZABLON POJEDYNCZEGO ELEMENTU POKOJU <li>

import $ from 'jquery';

    import { routeChange } from '../router/route-change';
    import { routes } from '../router/routes'


export const treatmentsListItem = ( anyCure ) => {
    const $li = $('<li class="list-group-item"></li>');

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
            <string>${anyCure.name}</strong> (<span title="nr identyfikatora">#${anyCure.id}</span>)
            - <a href="/treatment/${anyCure.id}">poznaj szczegóły kuracji</a>
        </h4>
        <h5>
            Obszar ciała: <strong>${anyCure.area}</strong><br />
            Czas trwania: <strong>${anyCure.time}</strong> 
        </h5>
        <h5 class="price">
            Cena: <strong>${anyCure.price}<strong> zł za zabieg
        </h5>
        <div class="treatment-booking">
            <form id="treatment-booking">
                <label>Ile zabiegów:
                    <input type="number" id="select-cure-n-times-${anyCure.id}" name="select-cure-n-times-${anyCure.id}" class="select-cure-n-times" min="1" max="28" maxlength="2" value="1" />
                </label>
                <button id="buy-cure-${anyCure.id}" class="btn btn-primary buy-cure" data-cure-id="${anyCure.id}">Dodaję zabieg (${anyCure.id})</button>
            </form>
        </div>    
    `;

    $fragment.append( myCureHTML );

    $li.append( $fragment );

    $li.find('a').on('click', ( evt ) => {
        evt.preventDefault();
        let lastSlashPosition = evt.target.href.lastIndexOf("/") + 1;   // pominięcie "/", ważne co za tym znakiem
        console.log("Cure CLICK <a>:", evt.target.href, "pozyskano:", evt.target.href.substring(lastSlashPosition));
         // ...?! I CO DALEJ Z TYM ŻE SIĘ LOGUJE... JAK WYKORZYSTAĆ TEN ODNOŚNIK 
        $li.trigger(routeChange, { path: routes[4].path + evt.target.href.substring(lastSlashPosition), data: { treatmentID: evt.target.href.substring(lastSlashPosition) } })
    }); 

    $li.find('form').on('submit', ( evt ) => {
        evt.preventDefault();
        console.log("Cure SUBMIT " + evt.target.tagName + ":", evt.target.lastElementChild.id); // zwrot wartości 
         // ...?! I CO DALEJ Z TYM ŻE SIĘ LOGUJE... JAK WYKORZYSTAĆ TEN ODNOŚNIK 
        $li.trigger(routeChange, { path: routes[4].path, data: { treatmentID: evt.target.href } })
    }); 

    console.log('KURACJA:', $li);
    return $li;
};
