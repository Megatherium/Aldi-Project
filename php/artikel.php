<?php
	$dbh = new PDO("mysql:host=localhost:3306;dbname=supermarkt",'root','');
	echo $dbh->errorCode();
	//$sql = "SELECT * FROM artikel";
	$sql = "SELECT LPAD(artnr,4,'0') as nr, volumen, preis, lieferant_id FROM artikel WHERE preis > 0 ORDER BY nr";
	//$sql = "SELECT LPAD(artnr,4,'0') as nr, volumen, preis, lieferant_id FROM artikel WHERE preis > 0";
	$pdos = $dbh->prepare($sql);
	$pdos->execute();
	//echo $pdos->rowCount();
	$res = $pdos->fetchAll();
	echo json_encode($res);
?>