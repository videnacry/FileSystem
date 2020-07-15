<?php
$nameItem = $_POST["nameItem"];
$chooseItem = $_POST["chooseItem"];
$pathItem = $_POST["pathItem"];
$folderInfo = 'json/beron@carlota.com.json';
$dotName = ".";
$errorName = "";
$errorName2 = "";
$errorPath = "";
$errorPath2 = "";

if(empty($nameItem)){
    $errorName = "<p> Name is empty </p>";
}else if(empty($pathItem)){
    $errorPath = "<p> Path is empty </p>";
}else if(strpos($nameItem, '.') != false) { 
    $errorName2 = "<p> Name contains a dot </p>";
}else{
    if(file_exists($folderInfo)){
        $currentData = file_get_contents($folderInfo);
    }else if(strpos($pathItem, $currentData) != false){
       

    }
}
// $lastId = json_decode($currentData, true);

// var_dump($lastId);
$folderJSON = file_get_contents($folderInfo);
$folders = json_encode($folderJSON, true);
if(strpos($pathItem, $folders) != false){
    $errorPath2 = "<p> No existe el folder </p>";
}

echo $errorName . $errorPath . $errorName2;
var_dump($errorPath2);