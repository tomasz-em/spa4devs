export class Cart {

  constructor() {
        // ustawienie klucza/hasha, pod którym będzie przechowywana zawartość koszyka
        this.key = 'IT_SPA_CART';   // to będzie zawierać tablicę z poszczególnymi zabiegami/wybraną ofertą
        
        // this.itemsAdded = 0;    // zliczacz elementów dodanych do koszyka
        /* 
        // podpięcie w dolwnym miejscu kodu, najlepiej przy tworzeniu obiektu
        cookieStore.addEventListener('change', (event) => {  // gdy się coś zmieni (change) w liście cistek bieżacej witryny
            // to jakąś reakcję wykonać, np. odczytaać ponownie (odświeżyć) tę listę z ciastek do zbioru danych JS  
            console.log(event);

            const  newCart = cart 
        } );    */
    }   // constructor-END

  cookie() {
    // PRZED: 'key1=val1; key2=val2; . . .'
    const cookies = document.cookie.split(';');  // teraz ['key1=val1', 'klucz2=wartosc2', ... ]
    // PO: ['key1=val1', 'key2=val2', . . .]
    const itSpaCookie = cookies.find( cookie => cookie.startsWith( this.key ) ); // nowa netoda wyszukiwania w stringach (zamiast .indexOf)
    // PO: 'IT_SPA_CART=wartosc' LUB undefined
    return itSpaCookie; // zwracany jest "cały element" 
  }

  exists() {  // czy istnieje już (jakieś?) nasze ciastko 
    return this.cookie() !== undefined;
  }

  get() {
    if ( this.exists() ) {
      // 'IT_SPA_CART=wartosc'
      const itSpaCookie = this.cookie(); // 'IT_SPA_CART=[1,2,2]'
        // pobranie tylko elementu z indeksem 1, TYLKO żądaną wartość z drugiego elemntu tej małej tablicy
      const cookieValue = itSpaCookie.split('=')[1]; // ['IT_SPA_CART', '[1,2,2]']
        // jakoś zamienić te dane z ciastek na coś co będzie strukturą danych; na podstawie tekstu opisująceg dane... coś jak JSON lub/i jego metoda parse() 
      const parsedValue = JSON.parse(cookieValue); // seria transformacji na danych WE, by konkretną wartość odczytać

      return parsedValue;   // zwróc, gdy istnieje
    } 
    else {
        this.empty();   // to ma utworzyć puste ciastko, bez zawartości... aby nie było zaskoczenia przy odczycie bez zapisania zawartości
        // od teraz to albo jakieś wartości są zwracane albo pusta tablica... nie ma undefined
    }
  } //get-END

  set( value ) {  // ma zapisać JAKĄŚ wartość do ciastka
    const stringifiedValue = JSON.stringify( value );
    document.cookie = `${this.key}=${stringifiedValue}`;    // tworzenie mikrostruktury na parę "klucz=wartość" i jej wpisanie/DOPISANIE w zasadzie
    // WPISYWANIE wartości do document.cookie powoduje DODANIE tego elementu do ISTNIEJĄCEJ LISTY, a NIE NADPISANIE całej uprzedniej zawartości i wpsisnia tylko tego elementu!
  }

  empty() {
    this.set([]);   // pusta tablica jako wartość!
  }

  // METODA DODANA TESTOWO
/*   howManyItemsAdded() {
    return this.itemsAdded;
  } */
}
