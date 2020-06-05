// określony widok dla danego komponentu -- co ma zawierać HTML jako zwracane treści 
import $ from 'jquery';
// import { roomsService } from '../common/rooms-service'; // TO MIAŁEM, ALE CHYBA NIEPOTZREBNE
export const home = () => {
  const fragment = $( new DocumentFragment() );
   // (+) WYDAJNOŚĆ:
//...brak ciągłych operacji na DOM, przy kolejnej operacji na każdym z nowo dostawianych z osobna elementów lub ich modyfikowaniu (np. atrybuty, itp.)

// !!! CHYBA NIE TO MIEJSCE DOCELOWE DAL PONIŻSZEGO (u mnie było)
    // roomsService.getRooms().then( console.info );
  fragment
    .append('<h2>Home</h2>')
    .append('<p>Nieco losowego tekstu, by coś specyficznego dla HOME wyświetlić.</p>');

  return fragment;
    // return Promise.resolve( fragment); -- taka sama dla każdego z adresów musi być forma
};
