export class Cart {

  constructor() {
        // ustawienie klucza/hasha, pod którym będzie przechowywana zawartość koszyka
    this.key = 'SPA4DEVS_CART';   // to będzie zawierać tablicę z poszczególnymi zabiegami/wybraną ofertą
        
/*     if ( !this.exists() ) {
      this.empty();
    } */
        // this.itemsAdded = 0;    // zliczacz elementów dodanych do koszyka
         
        // podpięcie w dolwnym miejscu kodu, najlepiej przy tworzeniu obiektu
/*         document.cookies.cookieStore.addEventListener('change', (event) => {  // gdy się coś zmieni (change) w liście cistek bieżacej witryny
            // to jakąś reakcję wykonać, np. odczytaać ponownie (odświeżyć) tę listę z ciastek do zbioru danych JS  
            console.log(event);

            //const  newCart = cart 
        }); */
  }   // constructor-END

  cookie() { // !!! ZE SPACJĄ JEST OK!!!
    // PRZED: 'key1=val1; key2=val2; . . .'
    const cookies = document.cookie.split('; ');  // teraz ['key1=val1', 'klucz2=wartosc2', ... ]
    // PO: ['key1=val1', 'key2=val2', . . .]
    const spaCookie = cookies.find( cookie => cookie.startsWith( this.key ) ); // nowa netoda wyszukiwania w stringach (zamiast .indexOf)
    // PO: 'IT_SPA_CART=wartosc' LUB undefined
    console.log('COOKIE():', cookies, 'SPA_C:', spaCookie);
    return spaCookie; // zwracany jest "cały element" 
  }

  exists() {  // czy istnieje już (jakieś?) nasze ciastko 
    console.log('CZY_CIASTKA_SĄ?', this.cookie() );
    return this.cookie() !== undefined;
  }

  get() {
    var parsedValue = ""; //zerowanie na starcie -- LET w IFie się nie sprawdzi 
    if ( this.exists() ) {
      // 'IT_SPA_CART=wartosc'
      const spaCookie = this.cookie(); // 'IT_SPA_CART=[1,2,2]'
        // pobranie tylko elementu z indeksem 1, TYLKO żądaną wartość z drugiego elemntu tej małej tablicy
      const cookieValue = spaCookie.split('=')[1]; // ['IT_SPA_CART', '[1,2,2]']
        // jakoś zamienić te dane z ciastek na coś co będzie strukturą danych; na podstawie tekstu opisująceg dane... coś jak JSON lub/i jego metoda parse() 
      parsedValue = JSON.parse( cookieValue ); // seria transformacji na danych WE, by konkretną wartość odczytać
      console.log("CIASTKA_SĄ:", spaCookie, "wartości:", cookieValue, "PRZELICZONE", parsedValue);
    } 
    else {
      this.empty();   // to ma utworzyć puste ciastko, bez zawartości... aby nie było zaskoczenia przy odczycie bez zapisania zawartości
      // od teraz to albo jakieś wartości są zwracane albo pusta tablica... nie ma undefined
    }
  return parsedValue;   // zwróc zawsze "COŚ", a nie "NIC" (undefined) gdy NIE istnieje
  } //get-END

  set( value ) {  // ma zapisać JAKĄŚ wartość do ciastka
    const stringifiedValue = JSON.stringify( value );
    document.cookie = `${this.key}=${stringifiedValue}`;    // tworzenie mikrostruktury na parę "klucz=wartość" i jej wpisanie/DOPISANIE w zasadzie
    // WPISYWANIE wartości do document.cookie powoduje DODANIE tego elementu do ISTNIEJĄCEJ LISTY, a NIE NADPISANIE całej uprzedniej zawartości i wpsisnia tylko tego elementu!
  }

  empty() {
    this.set([]);   // pusta tablica jako wartość!
  }

  totalItemsAdded() {
    const totalCookieItems = this.cookie();
    console.log("ILE_ELEM_TOTAL", totalCookieItems);
    return totalCookieItems === undefined ? 0 : totalCookieItems.length;
  }

  getSelectedElementsFromCookies( withAttributePresent = 'tID' ) {  // wyciągnięcie obiektów z danych atrybutem - NAZWA KLUCZA, a nie WARTOŚĆ danego atrybutu ISTOTNE jako wyróznik 
    console.log( "all ELEMENTY W CIASTKACH", this.get() );  // terz ten log jest niepotzrebny

    const filteredCart = this.get().filter( item => Object.keys( item ).includes( withAttributePresent ) ); // ile zawiera elementów określonego typu, z kluczem okresloengo rodzaju
    // zliczanie wystąpień określonego klucza, jako wyróznika elementu - NIE SZUKAM WARTOŚCI ALE OKREŚLONEGO "TYPU/ATRYBUTU" 
    // !!! type  === undefined  ->  true -<-- bo 'type  === undefined' !!! -- prawdopodobna pułapka na wcześniejszy warunek wyszukiwania
    console.log("ILE_ELEM_QUANT", filteredCart);
    return filteredCart; // nie długość danych, ale podzielić po typach
  }

  getQuantityOfItems( withAttributePresent = 'tID' ) {  // domyślna zlicza ilość zabiegów, wartość klucza atrybutu jako wyróznik 
    return this.getSelectedElementsFromCookies( withAttributePresent ).length; // tu długość danych, zatem krotność podzbioru
  }

  isElementPresentInCookies( attributeName, value ) {
    let cartFilteredBetter = this.get().filter( item => Object.keys( item ).includes( attributeName ) && item[attributeName] === value ); // ! dynamiczna nazwa atrybutu
    console.log("WYSZUKIWANIE ELEMENTU", cartFilteredBetter, "attrName", attributeName, "wartość", value );
    return cartFilteredBetter.length ? true : false;  // jakakolwiek wartość vs pusta tablica 
  }

  addItem( item ) {
    // dodaje produkt do koszyka
    let currentCartValues = this.get();
    // let nextValues = [ ...currentCartValues, item ];
    console.log("ciastka PRZED dodaniem_el", this.cookie(), "wartości_odczytane", currentCartValues, "nowy_el", item );
    this.set([ ...currentCartValues, item ]);
    console.log("ciastka PO dodaniu_el", this.cookie(), "wartości_odczytane", currentCartValues, "nowy_el", item );
    // sprawdzić getem | cookisem
  }

  removeItem( item ) {
    // usuwa produkt z koszyka
    const currentCartValues = this.get();
    const itemInCart = currentCartValues.findIndex( val => val.name === item.name );

    if( itemInCart !== -1 ) {
      currentCartValues.splice(itemInCart, 1);
      this.set(currentCartValues);
    }
  }

}
