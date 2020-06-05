// SZABLON POJEDYNCZEGO ELEMENTU POKOJU <li>

import $ from 'jquery';

export const roomsListItem = ( room ) => {
    const li = $('<li class="list-group-item"></li>');
    li.text( room.name ); // póki co zwrot jako sam tekst w elemencie, zawierający tylko nazwę pokoju
    return li;
};
