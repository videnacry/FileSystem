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
          <div id="close-modals" class="modal-close-bg"></div>
          <div id="play-media" class="play"></div>

          <!-- Header -->

            <div class="p-4 shadow-sm sticky-top row navbar-light" role="heading">
                <div class="d-flex flex-nowrap col-4 col-sm-3">
                    <div class="logo col-1" role="img"></div>
                    <div class="navbar-brand col-4">GreenBox</div>
                </div>
                <div class="form-inline col-8 d-flex flex-nowrap">
                    <input class="form-control bg-light" type="search" placeholder="Search" aria-label="Search" id="search-bar">
                    <button id="btn-search" class="btn btn-outline-success mx-2" type="submit">Search</button>
                </div>
                <div class="searcher"></div>
            </div>

          <!-- Item data -->

            <div class="row bg-light container-screen">
                <div class="navbar navbar-light bg-light col-6 col-sm-4 col-md-3 col-l-2" role="navigation">
                    <div class="col-12 justify-content-center d-flex p-4"><button id="button-new-item" class="btn btn-success btn-block col-11 col-sm-7">New</button></div>
                    <i id = "directory-reload" class="fas fa-redo-alt btn absolute-right"></i>
                    <ul id="directory-nav" class="navbar-nav ml-2">
                      <input id='new-name' type='text' value=''/>
                    </ul>
                </div>
                <div class="col-6 m-0 p-0 shadow-sm" role="main">
                    <ul class="list-group list-group-flush">
                      <div class="bg-light d-flex justify-content-between">
                          <li class="col-8 list-group-item border-0 bg-light pt-3">Name</li>
                          <li class="list-group-item border-0 bg-light pt-3">Label</li>
                          <li class="list-group-item border-0 bg-light pt-3">Size</li>
                          <li class="list-group-item bg-light border-0 pt-3">Modified</li>
                      </div>
                      <div id="folder-content" class="list-group list-group-flush">
                      </div>
                    </ul>
                </div>
                <div class="navbar navbar-light bg-light col-6 col-sm-4 col-md-3 col-l-2" role="navigation">
                  <ul class="list-group file-description">
                    <li class="name-file list-group-item d-flex justify-content-between align-items-center">
                      <span id="data-name"> Beron.xls </span>
                    </li> 
                    <li class="border-bottom-0 list-group-item d-flex justify-content-between align-items-center">
                      Label
                      <span id="data-label" class="badge badge-success badge-pill">APROVED</span>
                    </li>
                    <li class="border-bottom-0 list-group-item d-flex justify-content-between align-items-center">
                      Type
                      <span id="data-type" class="badge badge-success badge-pill">MS Excel Document</span>
                    </li>
                    <li class="border-bottom-0 list-group-item d-flex justify-content-between align-items-center">
                      Size
                      <span id="data-size" class="badge badge-success badge-pill">38 KB</span>
                    </li>
                    <li class="pb-4 list-group-item d-flex justify-content-between align-items-center">
                      Creation
                      <span id="data-creation" class="badge badge-success badge-pill">Feb 23, 2016</span>
                    </li>
                  </ul>
                </div>
            </div>
            <!-- Modal New -->
            <div id="modal-new-item" class="modal-new" tabindex="-1" role="dialog">
              <div class="modal-close-bg"></div>
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Create file or directory</h5>
                      <button id="cross" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-row">
                            <div class="form-group col-md-8">
                              <label for="inputName">Name</label>
                              <input type="text" class="form-control" id="inputName">
                            </div>
                            <div class="form-group col-md-4">
                              <label for="input-type">Type</label>
                              <select id="input-type" class="form-control">
                                <option selected value="folder">Folder</option>
                                <option value=".doc">.doc</option>
                                <option value=".csv">.csv</option>
                                <option value=".jpg">.jpg</option>
                                <option value=".png">.png</option>
                                <option value=".txt">.txt</option>
                                <option value=".ppt">.ppt</option>
                                <option value=".odt">.odt</option>
                                <option value=".pdf">.pdf</option>
                                <option value=".zip">.zip</option>
                                <option value=".rar">.rar</option>
                                <option value=".exe">.exe</option>
                                <option value=".svg">.svg</option>
                                <option value=".mp3">.mp3</option>
                                <option value=".mp4">.mp4</option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group">
                            <label for="input-path">Select folder</label>
                            <input type="text" class="form-control" id="input-path">
                          </div>
                          <form id="upload-file" class="form-group" action="uploadFile.php" enctype="multipart/form-data" method="POST">
                            <label for="exampleFormControlFile1">Update a file</label>
                            <input type="file" class="form-control-file" id="exampleFormControlFile1" name="fileUpload">
                          </form>
                    </div>
                    <div class="modal-footer">
                      <button id="create-new-item" type="button" class="btn btn-primary">Save</button>
                      <button id="close" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            <!-- modal delete or rename -->
            <div id="context-menu">
                <div id="rename-item" class="item">
                   Rename
                </div>
                <div id="delete-item" class="item">
                   Delete
                </div>
            </div>
        </body>
    </html>