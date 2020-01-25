// bieżący plik "index.js" zawiera linkownia do WSZYSTKICH zdefiniowanych widoków (... swoim bieżącym w folderze "views" je wszystkie mapuje)

export * from './booking';      // poszczególne widoki
export * from './home';
export * from './rooms';
export * from './treatments';
export * from './oops-404';     // tu też zawarto ogólną zawartość dla strony o "statusie-404"

// reeksport jest tu wywołany, wskazano wszysttkie widoki na tej liście 