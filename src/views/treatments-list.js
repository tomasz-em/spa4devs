// ROZBICIE NA DWA PLIKI, JEST RODZAJ USŁUGI KTÓRA ZWRACA LISTĘ ELEMENTÓW OTOCZONĄ KONTENEREM <ul>

import $ from 'jquery';
import { treatmentsService } from '../common/treatments-service';
import { treatmentsListItem } from './treatments-list-item';
// import { treatments } from './treatments';  // ?

export const treatmentsList = () => {
  const $ul = $('<ul class="list-group"></ul>');

  // doczepia liste ZAGIEGÓW, gdy tylko przyjdzie z serwera
  treatmentsService.getTreatments()
    .then( treatments => treatments.map( treatment => treatmentsListItem( treatment ) ) )
    .then( $treatmentsListItem => $ul.append( $treatmentsListItem ) );

  return $ul;
};

  // wyświetlenie pobranego jednego opisu
export const detailedTreatment = ( treatmentID ) => {
  const $ul = $('<ul class="list-group"></ul>');

  // doczepia liste ZAGIEGÓW, gdy tylko przyjdzie z serwera
  treatmentsService.getTreatment( treatmentID )
    .then( foundTreatment => treatmentsListItem( foundTreatment )  )  // TESTOWO! użyć innego widoku!
    .then( $detailedListItem => $ul.append( $detailedListItem ) );

  return $ul;
};