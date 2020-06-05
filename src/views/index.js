// bieżący plik "index.js" zawiera linkownia do WSZYSTKICH zdefiniowanych widoków (... swoim bieżącym w folderze "views" je wszystkie mapuje)

export * from './booking';  // poszczególne widoki
export * from './home';
export * from './rooms';
export * from './treatments';
export * from './oops'; // tu też zawarto ogólną zawartość dla strony o "statusie-404"
    // UWAGA: WCZEŚNIEJ "oops-404" u mnie to w "oops"!!!

    // reeksport jest tu wywołany, wskazano wszystkie widoki na tej liście 