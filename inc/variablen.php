<?php
    if(__FILE__ == $_SERVER['SCRIPT_FILENAME']) exit('Kein direkter Zugriff erlaubt.');
    error_reporting(E_ALL);
    //Datenbankauswertung
        define ('PDO_HOST','mysql:host=fachkraft.schule:3307;dbname=2015Winter');
        define ('PDO_BENUTZER','2015Winter');
        define ('PDO_KENNWORT','6#Ooui49');
        define ('DB_TABELLE','Artikel');
        define ('DB_ATTRIBUT_ARTIKEL','artnr');
        define ('DB_ATTRIBUT_VOLUMEN','volumen');
        define ('DB_ATTRIBUT_PREIS','preis');
    //Ladenoptionen
        define ('LADEN_REGALE_PRO_REIHE', 50);
        define ('LADEN_REGALE_VOLUMEN', 1);
        define ('LAGER_REGALE_VOLUMEN', 0.25);
?>