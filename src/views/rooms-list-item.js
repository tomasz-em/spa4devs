// SZABLON POJEDYNCZEGO ELEMENTU POKOJU <li>

import $ from 'jquery';

export const roomsListItem = ( anyRoom ) => {
    const $li = $('<li class="list-group-item"></li>');

    const $fragment = $( new DocumentFragment() );

    // #1 LIPA
    /*      fragment
      //.append('<div></div>')
      .append('<h4></h4>', { className: "room-name" }).text( anyRoom.name )
      .append('<h5></h5>', { className: "price" }).text( "cena: " + anyRoom.price );
 */

    // #2 LEPIEJ... ale rozbite na tworzenie struktury, by potem ją wuypełnić treścią bądź zmodyfikwać
/*       $fragment.append('<h4 class="room-name"></h4><h5 class="price"></h5>');
      $fragment.find('h4').text( anyRoom.name )
        .parent().find('h5').text( "cena: " + anyRoom.price );
 */

    // #3 TWORZENIE DYNAMICZNE ELEMNETÓW STRUKTURY JAKO TABLICA ELEMENTÓW
        // jest niemal świetne, ale trzeba pamiętać o zamykaniu elementów, przy ich zagnieżdżaniu
/*     const $myNewRoom = $( [
        '  <h4 class="room-name">',
        '    ' + anyRoom.name,
        '  </h4>',
        '  <h5 class="price">',
        '    Cena: ' + anyRoom.price + 'zł',
        '  </h5>',
        ].join("\n") );
    // console.log( $myNewRoom );

    $fragment.append( $myNewRoom );
 */

    // #4 UŻYCIE ES6 do budowy struktury jak powyżej.. albo każdej innej LEPSZEJ
    const myNewRoomHTML = `
        <h4 class="room-name">
            <string>${anyRoom.name}</strong> (<span title="nr identyfikatora">#${anyRoom.id}</span>)
        </h4>
        <h5>
            Ilość łóżek: <strong>${anyRoom.beds}</strong><br />
            Miejsc dla gości: <strong>${anyRoom.guests}</strong> 
        </h5>
        <h5 class="price">
            Cena: <strong>${anyRoom.price}<strong> zł za każdą dobę
        </h5>
        <div class="room-booking">
            <form id="room-booking-${anyRoom.id}">
                <label>Data od: 
                    <input type="date" id="book-date-from-${anyRoom.id}" name="book-date-from-${anyRoom.id}" class="book-date-from" min="2020-04-01" max="2021-04-01">
                </label>
                <label>Ile dni:
                    <input type="number" id="book-room-${anyRoom.id}-days" name="book-room-${anyRoom.id}-days" class="book-room-days" min="1" max="14" maxlength="3" />
                </label>
                <label>Data do: 
                    <input type="date" id="book-date-to-${anyRoom.id}" name="book-date-to-${anyRoom.id}" class="book-date-to" min="2020-04-01" max="2021-04-01">
                </label>    
                <button id="book-room-${anyRoom.id}" class="btn btn-primary book-room" data-room-id="${anyRoom.id}">Rezerwuję ten pokój (${anyRoom.id})</button>
            </form>
        </div>    
    `;

    $fragment.append( myNewRoomHTML );

/*     this.$fixture = $([
        "<div>",
        "  <div class='js-alert-box'></div>",
        "  <form id='my-form-to-validate'>",
        "    <input id='login-username' name='login-username'>",
        "  </form>",
        "</div>"
        ].join("\n"));
 */
      // return fragment;
    //li.text( room.name ); // póki co zwrot jako sam tekst w elemencie, zawierający tylko nazwę pokoju
    $li.append( $fragment );
 
    // li.text( "ELEMENT " + room.name ); // póki co zwrot jako sam tekst w elemencie, zawierający tylko nazwę pokoju

    return $li;
};
