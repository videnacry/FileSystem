
<?php

?>

<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
            <link type="image/icon" rel="icon" href="https://findicons.com/files/icons/734/phuzion/256/download_box.png"/>
            <link rel="stylesheet" type="text/css" href="node_modules\bootstrap\dist\css\bootstrap.css"/>
            <link rel="stylesheet" type="text/css" href="src/style.css"/>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.1/css/all.css" 
                  integrity="sha384-xxzQGERXS00kBmZW/6qxqJPyxW3UR0BPsL4c8ILaIWXva5kFi7TxkIIaMiKtqV1Q" crossorigin="anonymous"/>
            <script src="node_modules/jquery/dist/jquery.js"></script>
            <script src="src/script.js" defer></script>
            <title>LOCAL_FILLESYSTEM</title>
        </head>
        <body>
            <div class="p-4 shadow-sm sticky-top row navbar-light" role="heading">
                <div class="d-flex flex-nowrap col-4 col-sm-3">
                    <div class="logo col-1" role="img"></div>
                    <div class="navbar-brand col-4">GreenBox</div>
                </div>
                <form class="form-inline col-8 d-flex flex-nowrap">
                    <input class="form-control bg-light" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success mx-2" type="submit">Search</button>
                </form>
                <div class="searcher"></div>
            </div>
            <div class="row">
                <div class="navbar navbar-light bg-light col-6 col-sm-4 col-md-3 col-l-2" role="navigation">
                    <div class="col-12 justify-content-center d-flex p-4"><button class="btn btn-success btn-block col-11 col-sm-7">New</button></div>                
                    <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link"><i class="fas fa-caret-down">&nbsp;</i><i class="fas fa-folder-open"></i>&nbsp;Folder</a></li>
                        <li class="ml-2 nav-item"><a class="nav-link"><i class="fas fa-caret-down">&nbsp;</i><i class="fas fa-folder-open"></i>&nbsp;FolderChild</a></li>
                        <li class="ml-4 nav-item"><a class="nav-link"><i class="fas fa-caret-right">&nbsp;</i><i class="fas fa-folder">&nbsp;</i>FolderGrandchild</a></li>
                        <li></li>
                    </ul>
                </div>
                <div class="col-6 m-0 p-0 shadow-sm" role="main">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item bg-light pt-3">Name Label Size Modified</li>
                        <a class="list-group-item list-group-item-action"><i class="fas fa-folder-open"></i>&nbsp;FolderGrandchild</a>
                        <a class="list-group-item list-group-item-action"><i class="fas fa-folder-open"></i>&nbsp;FolderGrandchild</a>
                        <a class="list-group-item list-group-item-action"><i class="fas fa-folder-open"></i>&nbsp;FolderGrandchild</a>
                        <a class="list-group-item list-group-item-action"><i class="fas fa-folder-open"></i>&nbsp;FolderGrandchild</a>
                    </ul>
                </div>
                
            </div>
        </body>
    </html>