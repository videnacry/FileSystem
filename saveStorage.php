<?php
    $storageJSON = $_POST["storage"];
    $storage = json_decode($storageJSON);
    $user = $_POST["user"];
    $path ='json/' . $user . '.json';
    $newFile = fopen($path, 'w');
    fwrite($newFile, $storageJSON);
    fclose($newFile);