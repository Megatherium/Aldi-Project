<?php
    if(__FILE__ == $_SERVER['SCRIPT_FILENAME']) exit('Kein direkter Zugriff erlaubt.');
    error_reporting(E_ALL);
    class VariablenJsWandler{
        private $datensatz;
        private $anzahl = 0;
        private $fehlerhafteArtikel;
        function __construct($datenbankobjekt){
            echo "<script>";
            echo "var warenliste = [";
            while($this->datensatz = $datenbankobjekt->fetch(PDO::FETCH_ASSOC)){
                if(($this->datensatz[DB_ATTRIBUT_VOLUMEN] > 0) AND ($this->datensatz[DB_ATTRIBUT_VOLUMEN] < LADEN_REGALE_VOLUMEN) AND ($this->datensatz[DB_ATTRIBUT_PREIS] > 0)){
                    $this->anzahl++;
                    echo "['".$this->datensatz[DB_ATTRIBUT_ARTIKEL]."',".$this->datensatz[DB_ATTRIBUT_VOLUMEN].",".$this->datensatz[DB_ATTRIBUT_PREIS]."],";
                }
                else{
                    array_push($this->fehlerhafteArtikel, $this->datensatz[DB_ATTRIBUT_ARTIKEL]);
                }
            }
            echo "];";
            echo "warenliste.sort();";
            echo "var regaleProReihe = ".LADEN_REGALE_PRO_REIHE.";";
            echo "</script>";
        }
        function anzahl(){
            return $this->anzahl;
        }
        function fehlerhafte(){
            return $this->fehlerhafteArtikel;
        }
    }
    class Regalflaeche{
        protected $warenAnzahl;
        protected $warenProReihe;
        protected $laufVertikalL;
        protected $laufVertikalR;
        function __construct($warenAnzahl, $warenProReihe, $vertikalGangAnfang){
            $this->warenAnzahl = $warenAnzahl;
            $this->warenProReihe = $warenProReihe;
            $this->laufVertikalL = $vertikalGangAnfang;
            $this->laufVertikalR = $vertikalGangAnfang;
        }
        function baueVertikalGangL(){
            echo "<div class='doppelreihe'>";
            echo "<div>";
            $gangnummer = $this->laufVertikalL;
            for($lauf=1;$lauf<=3;$lauf++, $gangnummer++){
                echo "<div id='vertikalL-".$gangnummer."'>";
                echo "</div>";
            }
            $this->laufVertikalL = $gangnummer;
            echo "</div>";
        }
        function baueVertikalGangR(){
            echo "<div>";
            $gangnummer = $this->laufVertikalR;
            for($lauf=1;$lauf<=3;$lauf++, $gangnummer++){
                echo "<div id='vertikalR-".$gangnummer."'>";
                echo "</div>";
            }
            $this->laufVertikalR = $gangnummer;
            echo "</div>";
            echo "</div>";
        }
        function gangLaenge(){
            return $this->laufVertikalL;
        }
    }
    class Verkaufsflaeche extends Regalflaeche{
        function zeichneLaden(){
            echo "<div class='regalflaeche'>";
            for($regalnummer=0;$regalnummer<$this->warenAnzahl;$regalnummer){
                $this->baueVertikalGangL();
                for($lauf = 1; $lauf<=$this->warenProReihe; $lauf++){
                    echo "<div>";
                    if($regalnummer<$this->warenAnzahl){echo "<div id='regal".$regalnummer."' class='regalvoll'>";}
                    else{echo "<div class='regalfrei'>";}
                    $regalnummer++;
                    echo "</div>";
                    echo "<div id='horizontal".(($this->laufVertikalL-1)/3)."-".$lauf."'>";
                    echo "</div>";
                    if($regalnummer<$this->warenAnzahl){echo "<div id='regal".$regalnummer."' class='regalvoll'>";}
                    else{echo "<div class='regalfrei'>";}
                    $regalnummer++;
                    echo "</div>";
                    echo "</div>";
                }
                $this->baueVertikalGangR();
            }
            echo "</div>";
        }
    }
    class Lagerflaeche extends Regalflaeche{
        function zeichneLaden(){
            echo "<div class='regalflaeche'>";
            for($regalnummer=0;$regalnummer<$this->warenAnzahl;$regalnummer){
                $this->baueVertikalGangL();
                for($lauf1 = 1; $lauf1<=$this->warenProReihe; $lauf1++){
                    echo "<div>";
                    if($regalnummer<$this->warenAnzahl){
                        echo "<div class='lagerplatz'>";
                        for($lauf2 = 1; $lauf2<=4; $lauf2++){
                            if($regalnummer<$this->warenAnzahl){
                                echo "<div id='lagerregal".$regalnummer."' class='regalvoll'>";
                                $regalnummer++;
                            }else{echo "<div class='regalfrei'>";}
                            echo "</div>";
                        }
                    } else{echo "<div class='regalfrei'>";}
                    echo "</div>";
                    echo "<div id='horizontal".(($this->laufVertikalL-1)/3)."-".$lauf1."'>";
                    echo "</div>";
                    if($regalnummer<$this->warenAnzahl){
                        echo "<div class='lagerplatz'>";
                        for($lauf2 = 1; $lauf2<=4; $lauf2++){
                            if($regalnummer<$this->warenAnzahl){
                                echo "<div id='lagerregal".$regalnummer."' class='regalvoll'>";
                                $regalnummer++;
                            }else{echo "<div class='regalfrei'>";}
                            echo "</div>";
                        }
                    } else{echo "<div class='regalfrei'>";}
                    echo "</div>";
                    echo "</div>";
                }
                $this->baueVertikalGangR();
            }
            echo "</div>";
        }
    }
?>