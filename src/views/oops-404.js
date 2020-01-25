// OOPS nie jest kojarzony z konretną scieżką, dlatego nie jest podspięty 
//  ale do widoków będize dodany
import $ from 'jquery';

export const oops404 = () => {
    const fragment = $(new DocumentFragment);   // (+) WYDAJNOŚĆ, brak ciągłych operacji na DOM, przy każdej operacji na nowym elemencie 

    fragment
        .append('<h2>OopS</h2>')
        .append('<p>Nieco losowego tekstu, by coś specyficznego dla HOME wyświetlić.</p>');

    return fragment;
};