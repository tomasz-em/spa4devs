import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import { Router } from './router/router';

const main = $('main');

const router = new Router();

// i tu operować utworzoną logiką
router.mount( main );   // to się ma wyświetlać w tym konkretnym elemencie

router.init();  // nawigacja na podstawie już wpisanej ścieżki w pasku adresu
    // tylko raz się ma to wykonać na starcie.. gdy zły adres to status-404