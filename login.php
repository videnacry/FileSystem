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
            <title>LOCAL_FILLESYSTEM</title>
        </head>
        <body>
          <div id="close-modals" class="modal-close-bg"></div>
          <div id="play-media" class="play"></div>

          <!-- Header -->

            <div class="p-4 shadow-sm sticky-top container" role="heading">
                <div class="row col-12">
                    <div class="logo-log col-6" role="img"></div>
                    <h1 class="col-6 m-auto">GreenBox</h1>
                </div>
                <form class="navbar-brand col-12 row" action="index.php" method="POST">
                    <input type="text" class="form-control bg-light col-12" placeholder="Email" id="user-email" name="logIn" value="a"><br>
                    <input type="submit" id="log-in" class="col-12" value="Log In"/>
                </form>
            </div>
        </body>
    </html>
