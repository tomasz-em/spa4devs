// określony widok dla danego komponentu -- co ma zawierać HTML jako zwracane treści 
import $ from 'jquery';
import { roomsList } from './rooms-list';
// import {roomsService } from '../common/rooms-service'; // TO MIAŁEM

export const rooms = () => {
  const fragment = $( new DocumentFragment() ); // new DocumentFragment() a bez "()" !!?!
           //   (+) WYDAJNOŚĆ:
  
  // TU MIAŁEM JAKIŚ KOD....
  /* 
        return roomsService.getRooms().then( pokoje => {

    // I
    const fragment ...Fragment());
    
    return roomService.getRooms().then( pokoje => {
// I TEN "FRAGMENT" ZAGNIEŻDŻONY WEWNĄTRZ .MAP() / .THEN()
                    return fragment
                .append('<h2>Rooms</h2>')
                .append('<p>Nieco losowego tekstu, by coś specyficznego dla ROOMS wyświetlić.</p>')
                .append(`<p>Pokój nr 1: ${pokoje[0].name}</p>`);    // np. przykladowa zaczytana zawartość
                    // też wymaga to poprawki rutera... on ma przechwycić promisę
                    // albo działać na gotowym HTMLu albo na zaczytywanym ... to tam pormesy będą zwracane
            // return fragment;
    })
     // ... KONIEC KODU
  */

  fragment
    .append('<h2>Rooms</h2>')
    .append( roomsList() )  // wstawianie dynamicznie generowanej zawartośc (pobierana z API)
    .append('<p>Nieco losowego tekstu, by coś specyficznego dla ROOMS wyświetlić.</p>');
  return fragment;
};
