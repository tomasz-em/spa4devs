export const roomsService = {
    // pojemnik na wszytskei funcjonalności, związane z pokojami

    getRooms() {    // pobranie listy wszystkich pokojów... z adresem do wszystkich pokoi 

        return fetch('http://localhost:3000/rooms') // to adres na wszystkie pokoje
            // ; // = ten średnik usunąc i wstawić kilka linii poleceń z MATERIAŁÓW 
            .then( response => response.json());
    }

};