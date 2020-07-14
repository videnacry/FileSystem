<?php
$nameItem = $_POST["nameItem"];
$chooseItem = $_POST["chooseItem"];
$pathItem = $_POST["pathItem"];
$errorName = "";
$errorChoose = "";
if(empty($nameItem)){
    $errorName = "<p> Field is empty </p>";
}else if($chooseItem!='choose'){
    $errorChoose = '<p> Choose a correct type </p>';
}

echo $errorName . $errorChoose;
