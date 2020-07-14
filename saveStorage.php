<?php
    $storageJSON = $_POST["storage"];
    $storage = json_decode($storageJSON);
    print_r($storage);