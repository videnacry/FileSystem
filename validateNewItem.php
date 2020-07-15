<?php
$chooseItem = $_POST["chooseItem"];


$dotName = ".";
$errorName = "";
$errorName2 = "";
$errorPath = "";
$errorPath2 = "";


if(empty($_POST["nameItem"])){
    $errorName = "<p> Name is empty </p>";
}else if(empty($_POST["pathItem"])){
    $errorPath = "<p> Path is empty </p>";
}else if(strpos($_POST["nameItem"], '.') != false) {
    $errorName2 = "<p> Name contains a dot </p>";
 }else {
     newItem();
 }

echo $errorName . $errorPath . $errorName2;

function newItem(){
$nameItem = $_POST["nameItem"];
$pathItem = $_POST["pathItem"];
$folderInfo = 'json/beron@carlota.com.json';

$currentData = file_get_contents($folderInfo);
$objectJson = json_decode($currentData);
$arrayJson = (array) $objectJson;
$pathArray  = explode( "/" , $pathItem);
$folder = (array)$arrayJson;
$parentArray = array();
$pathCount = count($pathArray);
$createFolder = true;
for( $i = 0 ;$pathCount>$i ; $i++){
    if(isset($folder[$pathArray[$i]])){
        array_unshift($parentArray,$folder);
        $folder = (array)$folder[$pathArray[$i]];
    }else {
        $createFolder = false;
        echo 'Error folder not found';
    break;
    }
}
    if($createFolder){
        if(isset($folder[$nameItem])){
            echo 'Folder or file already exists';
        }else{
            $folder[$nameItem] = new stdClass();
            array_unshift($parentArray,$folder);
            for($i = 0; $pathCount>$i ; $i++){
                $parentArray[$i+1][$pathArray[$pathCount-(1+$i)]] = $parentArray[$i];
            }
            file_put_contents($folderInfo, json_encode(end($parentArray)));
            echo 'Folder or file created';
        }
    }
}