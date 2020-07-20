<?php
if(isset($_FILES['fileUpload'])){
    define('fileUpload' , $_FILES['fileUpload']);
    if(fileUpload['error'] === UPLOAD_ERR_OK){
    }else{
        echo 'error loading file';
    }
}else{
}
define('chooseItem' , $_POST["chooseItem"]);
define('pathItem' , $_POST["pathItem"]);
define('nameItem' , $_POST["nameItem"]);
define('emailUser' , $_POST['userEmail']);

$dotName = ".";
$errorName = "";
$errorName2 = "";
$errorPath = "";
$errorPath2 = "";


if(empty(nameItem)){
    $errorName = "<p> Name is empty </p>";
}else if(empty(pathItem)){
    $errorPath = "<p> Path is empty </p>";
}else if(strpos(nameItem, '.') != false) {
    $errorName2 = "<p> Name contains a dot </p>";
 }else {
     newItem();
 }

echo $errorName . $errorPath . $errorName2;

function newItem(){
$folderInfo = 'json/' . emailUser . '.json';

$currentData = file_get_contents($folderInfo);
$objectJson = json_decode($currentData);
$arrayJson = (array) $objectJson;
$pathArray  = explode( "/" , pathItem);
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
            if(chooseItem == "folder"){
                if(isset($folder[nameItem])){
                    echo 'Folder already exists';
                }else{
                    $folder[nameItem] = new stdClass();
                    $folder[nameItem]->Info = new stdClass();
                    $folder[nameItem]->Info->Creation = date('r');
                    $folder[nameItem]->Info->Label = "Aproved";
                    $folder[nameItem]->Info->Type = "Folder";
                }
            }else{
                if(isset($folder[nameItem . chooseItem])){
                    echo 'File already exists';
                }else{
                    define("path",'src/img/' . implode('_',$pathArray) . '_' . nameItem . chooseItem);
                    $folder[nameItem . chooseItem] = new stdClass();
                    $folder[nameItem . chooseItem]->Info = new stdClass();
                    $folder[nameItem . chooseItem]->Info->Creation = date('r');
                    $folder[nameItem . chooseItem]->Info->Label = "Aproved";
                    $folder[nameItem . chooseItem]->Info->Type = chooseItem;
                    $folder[nameItem . chooseItem]->Info->Size = fileUpload['size'];
                    $folder[nameItem . chooseItem]->Info->Path = path;
                    move_uploaded_file(fileUpload['tmp_name'],path);
                }
            }
            array_unshift($parentArray,$folder);
            for($i = 0; $pathCount>$i ; $i++){
                $parentArray[$i+1][$pathArray[$pathCount-(1+$i)]] = $parentArray[$i];
            }
            file_put_contents($folderInfo, json_encode(end($parentArray)));
            echo 'Folder or file created';
    }
}