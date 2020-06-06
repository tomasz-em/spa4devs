export const treatmentsService = {
    // pojemnik na wszystkie funcjonalności, związane z ZABIEGAMI

  getTreatments() { // pobranie listy wszystkich pokoi... z adresem do wszystkich pokoi
    return fetch('http://localhost:3000/treatments').then( response => response.json() );
  },

  getTreatment( id ) { // pobranie szczegółów wybranego ZABIEGU z ich listy, na podstawie konkretnego numeru zabiegu (id) 
    // pobiera jeden ZABIEG o zadanym ID
    return fetch(`http://localhost:3000/treatments/${id}`)
        .then( response => response.json() );   // zwróć pobrane dane 
  }
};
