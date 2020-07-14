<?php
    $user = $_POST["user"];
    $path ='json/' . $user . '.json';
    unlink($path);