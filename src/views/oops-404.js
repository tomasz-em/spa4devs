// "OOPS!" NIE JEST kojarzony z konretną scieżką URL, dlatego nie jest podpięty pod jakiś konkretny adres z końcówki paska przeglądarki 
// ...ale do listy zdefiniowanych widoków będzie dodany (nowy plik "index.js" wewnątrz folderu "views")
import $ from 'jquery';

export const oops404 = () => {
    const $fragment = $(new DocumentFragment() );   // (+) WYDAJNOŚĆ:
//...brak ciągłych operacji na DOM, przy kolejnej operacji na każdym z nowo dostawianych z osobna elementów lub ich modyfikowaniu (np. atrybuty, itp.)

    $fragment
        .append('<h2>OopS! 404</h2>')
        .append('<p class="error">Nie ma takiego adresu! To się miało nigdy nie zdarzyć, ale jednak niemożliwe staje się osiągalne.<br /><strong>Użytkowniku</strong>: <em>nie kombinuj! Zweryfikuj wprowadzony adres lub korzystaj tylko z wyświetlonych odnośników i przycisków!</em></p>');

    return $fragment;
};