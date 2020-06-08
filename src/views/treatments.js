// określony widok dla danego komponentu -- co ma zawierać HTML jako zwracane treści 
import $ from 'jquery';
import { treatmentsList, detailedTreatment } from './treatments-list';


export const treatments = () => {
  const $fragment = $( new DocumentFragment() );   // (+) WYDAJNOŚĆ:
  //...brak ciągłych operacji na DOM, przy kolejnej operacji na każdym z nowo dostawianych z osobna elementów lub ich modyfikowaniu (np. atrybuty, itp.)
  
  $fragment
    .append('<h2>Treatments</h2>')
    .append( treatmentsList() ) // dynamiczne sedno, odczytywane z serwera REST
    .append('<p>Nieco losowego tekstu, by coś specyficznego dla TREATMENTS wyświetlić.</p>');

  return $fragment;
};

  // budowanie na żądanie
export const selectedTreatment = ( treatmentID ) => {
  const $fragment = $( new DocumentFragment() );   // (+) WYDAJNOŚĆ:
  //...brak ciągłych operacji na DOM, przy kolejnej operacji na każdym z nowo dostawianych z osobna elementów lub ich modyfikowaniu (np. atrybuty, itp.)
  
  $fragment
    .append('<h2>Selected Treatment</h2>')
    .append( detailedTreatment( treatmentID ) ) // dynamiczne sedno żądanego ELEMENTU, odczytywane z serwera REST
    .append('<p>Nieco losowego tekstu, by coś specyficznego dla SELECTED-TREATMENT wyświetlić.</p>');

  return $fragment;
};
