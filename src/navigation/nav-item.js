import $ from 'jquery';

// spodziewamy sie funkcji click, ktora bedzie wywolywana przez element anchor
// chcemy, aby klikniecie w element anchor powodowalo nawigacje do innej sciezki
export const navItem = (text, click) => {   // ma stworzyć jakiś fragment UI;
        // przekazywane "tekst" elementu oraz jakąś funkcję do obsługi kliknięcia
  const navItem = $('<li class="nav-item"></li>'); // póki co sam <li> jest tworzone
  const anchor = $('<a class="btn btn-link text-light"></a>');  
  anchor.text(text).on('click', click);

  // NIEDOKOŃCZONE W PRZYKŁADZIE?!
// document.crea   //?
//... CO TO MA BYĆ? BRAKUJĄCE INSTRUKCJE DO WYNONANIA PROJEKTU?!

// DALEJ MÓJ TESTOWY KOD - PÓKI CO W KOEMNATRZU

/* 
// const anchor = $('<a class="btn btn-link"></a>' /*, { click: click, text: text }  ); // tworzenie <a> z atrybutami, tu: zdarzenie "click" i przypisana z góry funkcja
        // powstaje już jQ obiekt, a nie zwykły HTML... dlatego kolejne metody jQ można na nim wywołać
        console.info("własne zdarzenie NIC", text, click);
        // !!! jakś lipa z element.text, nie przekazuje się... !!!
     anchor.text(text);
     anchor.on('click', click);
     
*/     

  navItem.append(anchor);   // doklejanie <a> do rodzica <ul>, jako najmniejszego fragmentu komponentu

  return navItem;
};
