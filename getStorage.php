<?php
    $path = "json/" . $_POST["user"] . ".json";
    echo file_get_contents($path);