import { RESTurl, RESTport } from './rest-server-config';

export const roomsService = {
    // pojemnik na wszystkie funcjonalności, związane z pokojami

  getRooms() { // pobranie listy wszystkich pokoi... z adresem do wszystkich pokoi
    return fetch(`${ RESTurl }:${ RESTport }/rooms`).then(response => response.json());
  },

  getRoom( id ) { // pobranie sczegółów wybranego pokoju z ich listy, na podstawie numeru 
    // pobiera jeden pokoj o zadanym id
    return fetch(`${ RESTurl }:${ RESTport }/rooms/${id}`)
        .then( response => response.json() );   // zwróć pobrane dane 
  }
};
