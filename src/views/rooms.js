// określony widok dla danego komponentu -- co ma zawierać HTML jak zwracaa=ną treści 
import $ from 'jquery';

export const rooms = () => {
    const fragment = $(new DocumentFragment);   // (+) WYDAJNOŚĆ, brak ciągłych operacji na DOM, przy każdej operacji na nowym elemencie 

    fragment
        .append('<h2>Rooms</h2>')
        .append('<p>Nieco losowego tekstu, by coś specyficznego dla ROOMS wyświetlić.</p>');

    return fragment;
};