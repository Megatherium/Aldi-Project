<!DOCTYPE HTML>
<html>
<head>
<script src="./js/classes2.js"></script>
<script src="./js/bla.js"></script>
<script src="./js/jquery-2.1.4.min.js"></script>
<meta charset="utf8">
</head>
<body>
  <?php

    include './inc/klassen.php';
    include './inc/variablendev.php';
    $dbh = new PDO(PDO_HOST,PDO_BENUTZER,PDO_KENNWORT);
    $dbs = $dbh->query("SELECT LPAD(artnr,4,'0') as artnr, preis, volumen FROM artikel WHERE preis > 0 ORDER BY artnr");
    //$dbs = $dbh->query("SELECT artnr, volumen, preis FROM artikel ORDER BY artnr");

    $bla = new VariablenJsWandler($dbs);
    ?>
  <div id="debug" style="height: 50px"></div>
  <div id="speedDiv" style="height: 50px">
    <input id="speed" type="number" value="2">
    <button onclick="minus($('#speed')[0].value);colorAll();">Remove Items</button>
    <button onclick="drawStore(supi);">Draw</button>
    <button onclick="oneClick();">Setup</button>
  </div>
  <div id="Laden"></div>

  <script src="./js/main.js"></script>


</body>
</html>
