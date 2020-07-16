<?php
    $selectedItem = $_POST["selectedItem"];
    $pathArray = explode("/",$_POST["path"]);
    $jsonURL = 'json/' . $_POST["userEmail"] . '.json';
    $storageJSON = file_get_contents($jsonURL);
    $storageObject = json_decode($storageJSON);
    $item = $storageObject;
    $response = new stdClass();
    for($i = 0; $i < count($pathArray); $i++){
        if(isset($item->{$pathArray[$i]})){
            $item = $item->{$pathArray[$i]};
        }
        else{
            $response->reachPath = 'The path couldn\'t be reach, please reload to try again.';
        break;
        }
    }
    if(isset($item->{$selectedItem})){
        if($_POST["delete"] == "true"){
            unset($item->{$selectedItem});
        }else{
            $item->{$_POST["newName"]} = $item->{$selectedItem};
            unset($item->{$selectedItem});
        }
        file_put_contents($jsonURL,json_encode($storageObject));
    }else{
        $response->reachFile = 'The file wasn\'t find, please reload to try again.';
    }
    echo json_encode($response);