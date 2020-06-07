import { RESTurl, RESTport } from './rest-server-config';

export const treatmentsService = {
    // pojemnik na wszystkie funcjonalności, związane z ZABIEGAMI

  getTreatments() { // pobranie listy wszystkich pokoi... z adresem do wszystkich pokoi
    return fetch(`${ RESTurl }:${ RESTport }/treatments`).then( response => response.json() );
  },

  getTreatment( id ) { // pobranie szczegółów wybranego ZABIEGU z ich listy, na podstawie konkretnego numeru zabiegu (id) 
    // pobiera jeden ZABIEG o zadanym ID
    return fetch(`${ RESTurl }:${ RESTport }/treatments/${id}`)
        .then( response => response.json() );   // zwróć pobrane dane 
  }
};
