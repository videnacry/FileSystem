//---------------------------directory Navigator------------------------------------


let userEmail = "beron@carlota.com"
let url = "json/" + userEmail + ".json"
let storage
let directoryNav = document.getElementById("directory-nav")
let liHTML = document.createElement("li")
liHTML.className = "nav-item ml-2"
let aHTML = document.createElement("a")
aHTML.style.width = "fit-content"
aHTML.className = "nav-link"
aHTML.setAttribute("onclick", "printChildren(true)")
aHTML.setAttribute("oncontextmenu", "showMiniModal()")
let caretHTML = document.createElement("i")
caretHTML.className = "fas fa-caret-right mx-1"
let folderHTML = document.createElement("i")
folderHTML.className = "fas fa-folder mx-1"
let spanHTML = document.createElement("span")
liHTML.appendChild(aHTML)
aHTML.appendChild(caretHTML)
aHTML.appendChild(folderHTML)
aHTML.appendChild(spanHTML)
loadDirectory()
function loadDirectory(){
    $.getJSON(url, function (data, statusText, jqXHR) {
        storage = data
        printFolder(storage, directoryNav)
        printItems(storage, folderContent)
    })
}
function printFolder(pObject, parent) {
    if (Object.keys(pObject).length > 0) {
        for (let i in pObject) {
            if (i == "Info" || i.includes(".")) continue
            spanHTML.textContent = i
            let liHTMLClone = liHTML.cloneNode(true)
            liHTMLClone.dataset.key = i
            parent.appendChild(liHTMLClone)
        }
    }
}
const imgExtention = ["jpg","png","svg"]
const docExtention = ["csv","doc","ppt","odt","pdf","txt"]
const zipExtention = ["zip","rar"]
const exeExtention = ["exe"]
const audioExtention = ["mp3"]
const videoExtention = ["mp4"]
const playMedia = document.getElementById("play-media")
function printItems(pObject, parent){
    parent.textContent = ""
    if (Object.keys(pObject).length > 0) {
        for (let i in pObject) {
            if (i == "Info") continue
            printItem(i,pObject,parent)
        }
    }    
}

function showData(item,name){
    dataName.textContent = name
    dataCreation.textContent = item['Creation']
    dataLabel.textContent = item['Label']
    const size = item['Size']
    dataSize.textContent = size > 1000000 ? (size / 1000000).toFixed(2) + 'Mb' : (size / 1000).toFixed(2) + 'Kb'
    dataType.textContent = item['Type']
}

function printItem(i,pObject,parent){
    if(!i.includes(".")){
        $(parent).append($("<a class='list-group-item list-group-item-action'><i class='far fa-folder'></i>&nbsp;" + i + "</a>"))
    }else{
        if(imgExtention.includes(i.split(".")[1])){
            $(parent).append($("<a class='list-group-item list-group-item-action'><i class='far fa-file-image'></i></i>&nbsp;" + i + "</a>")
            .click(function(){
                closeModals.style.display = "block"
                $(playMedia).fadeIn(500).css("background-image","url('" + pObject[i]['Info']['Path'] + "')")
                showData(pObject[i]['Info'],i)
            })
            )
        }else if(docExtention.includes(i.split(".")[1])){
            $(parent).append($("<a class='list-group-item list-group-item-action'><i class='far fa-file-alt'></i>&nbsp;" + i + "</a>")
                .click(function(){
                    showData(pObject[i]['Info'],i)
                })                    
            )
        }else if(zipExtention.includes(i.split(".")[1])){
            $(parent).append($("<a class='list-group-item list-group-item-action'><i class='far fa-file-archive'></i>&nbsp;" + i + "</a>")
                .click(function(){
                    showData(pObject[i]['Info'],i)
                })                    
            )
        }else if(audioExtention.includes(i.split(".")[1])){
            $(parent).append($("<a class='list-group-item list-group-item-action'><i class='far fa-file-audio'></i>&nbsp;" + i + "</a>")
            .click(function(){
                closeModals.style.display = "block"
                $(playMedia).fadeIn(500).append($('<audio autoplay controls  src="' + pObject[i]['Info']['Path'] + '" </audio>'))
                .css("background-image","url('src/img/Profile.jpg')")
                showData(pObject[i]['Info'],i)
            })
            )                    
        }else if(videoExtention.includes(i.split(".")[1])){
            $(parent).append($("<a class='list-group-item list-group-item-action'><i class='far fa-file-video'></i>&nbsp;" + i + "</a>")
            .click(function(){
                closeModals.style.display = "block"
                $(playMedia).fadeIn(500).append($('<video autoplay controls  src="' + pObject[i]['Info']['Path'] + '" </video>'))
                showData(pObject[i]['Info'],i)
            })
            )                    
        }else if(exeExtention.includes(i.split(".")[1])){
            $(parent).append($("<a class='list-group-item list-group-item-action'><i class='far fa-file-code'></i>&nbsp;" + i + "</a>")
                .click(function(){
                    showData(pObject[i]['Info'],i)
                })                    
            )
        }
    }                  
}
const dataName = document.getElementById("data-name")
const dataSize = document.getElementById("data-size")
const dataCreation = document.getElementById("data-creation")
const dataLabel = document.getElementById("data-label")
const dataType = document.getElementById("data-type")

function getPath(elementHTML) {
    let pathArray = []
    let target = elementHTML
    pathArray.push(target.dataset.key)
    while (target.parentElement.dataset.key) {
        pathArray.unshift(target.parentElement.dataset.key)
        target = target.parentElement
    }
    return pathArray
}
function getFolder(pathArray, pStorage) {
    let folder = pStorage
    for (let i in pathArray) {
        folder = folder[pathArray[i]]
    }
    return folder
}
function printChildren(allowItem=false) {
    let open = false
    let parent = event.currentTarget.parentElement
    if (parent.getElementsByTagName("li").length > 0) {
        folderContent.textContent = ""
        for (let i in parent.getElementsByTagName("li")) {
            $(parent).find("li").remove()
        }
    } else {
        open = true
        let pathArray = getPath(parent)
        let folder = getFolder(pathArray, storage)
        if(allowItem){
            printItems(folder, folderContent, pathArray.join("_"))
        }
        printFolder(folder, parent)
    }
}

//--------------------------------Reload Directory----------------------------------

document.getElementById("directory-reload").addEventListener("click",function(){
    directoryNav.textContent = ""
    folderContent.textContent = ""
    loadDirectory()
})

//-----------------------------------MiniModal---------------------------------------
let itemSelected
let newName = document.getElementById("new-name")
newName.style.display = "none"
var contextElement = document.getElementById("context-menu");
document.getElementById("rename-item").addEventListener("click",function(){
    contextElement.classList.remove("active")
    $("#new-name").css({
        display:"block",
        position:"absolute",
        zIndex:1,
        top:itemSelected.offsetTop+"px",
        left:itemSelected.offsetLeft+"px",
        width:itemSelected.offsetWidth+"px"
    }).keyup(function(){
        if(event.key == "Enter"){
            event.currentTarget.style.display = "none"
            closeModals.style.display = "none"
            if(newName.value != ""){
                renameRemoveEvent(false)
            }
            else{
                console.log("bad")
            }
        }
    })
})
document.getElementById("delete-item").addEventListener("click",function(){
    contextElement.classList.remove("active")
    renameRemoveEvent(true)
})
function showMiniModal() {
    event.preventDefault();
    closeModals.style.display = "block"
    itemSelected = event.currentTarget
    contextElement.style.top = itemSelected.offsetTop + itemSelected.offsetHeight + "px"
    contextElement.style.left = itemSelected.offsetLeft + itemSelected.offsetWidth + "px"
    contextElement.classList.add("active");
}

//------------------------------Rename/Remove Item in Storage--------------------------------
function renameRemoveRequest(url, selectedItem, path, newName, userEmail, erase){
    $.ajax(
        {url:"changeFile.php",
        method:"post",
        data:{
            selectedItem:selectedItem,
            path:path,
            newName:newName,
            userEmail:userEmail,
            delete:erase
        },success:function(data,statusText,jqXHR){
            if(JSON.parse(data).reachPath == "undefined"){
                alert(JSON.parse(data).reachPath)
            }
        }
    })
}

function renameRemoveEvent(erase){
    let target = itemSelected.parentElement
    let parent = target.parentElement
    let targetName = target.dataset.key
    let pathArray = getPath(parent) 
    renameRemoveRequest(url,targetName,pathArray.join("/"),newName.value,userEmail,erase)
    folder = getFolder(pathArray, storage)
    renameRemoveItem(folder,targetName,newName.value,erase)
}

function renameRemoveItem(parent, name, newName, erase){
    if(parent.hasOwnProperty(name)){
        if(erase){
            delete parent[name]    
        }else{
            if(parent.hasOwnProperty(newName)){
                alert("file already exists")
            }else{
                parent[newName] = Object.assign({},parent[name])
                delete parent[name]
            }
        }
    }
    console.log(storage)
}

//---------------------------------Modal New Item in directory---------------------------------

let closeModals = document.getElementById("close-modals") 
closeModals.style.display = "none"
let buttonNewItem = document.getElementById("button-new-item")
let modalNewItem = document.getElementById("modal-new-item")
buttonNewItem.addEventListener("click",function(){
    modalNewItem.style.display = "block"
    modalCloseItems = ["close","btn-secondary","modal-close-bg"]
    modalNewItem.getElementsByClassName("modal-close-bg")[0].style.zIndex = 0
    modalCloseItems.map(function(item){
        modalNewItem.getElementsByClassName(item)[0].addEventListener("click",closeModal)
    })
    function closeModal(){
        modalNewItem.style.display = "none"
    }
})

//-------------------------------------------Close modals---------------------------------------

$("#close-modals").click(function(){
        contextElement.classList.remove("active");
        playMedia.textContent = ""
        playMedia.style.display = "none"
        newName.style.display = "none"
        newName.value = ""
        event.currentTarget.style.display = "none"
    }
)
$("body").keyup(function(){
    if(event.key == "Enter" || event.key == "Escape"){
        newName.style.display = "none"
        newName.value = ""
        closeModals.style.display = "none"
        contextElement.classList.remove("active")
    }
})

//-------------------------------create new file/folder-----------------------------------//
$("#create-new-item").click(function(){
    const nameItem = $("#inputName").val();
    const chooseItem = $("#input-type").val();
    const pathItem = $("#input-path").val();
    if(chooseItem != "folder"){
        const form = new FormData(document.getElementById("upload-file"))
        form.append("nameItem", nameItem)
        form.append("pathItem", pathItem)
        form.append("chooseItem", chooseItem)
        form.append("userEmail", userEmail)
        $.ajax({
            method: "post",
            url: "validateNewItem.php",
            data: form,
            processData : false,
            contentType : false,
            success: function(data, statusText, jqXHR){
                console.log(data);
            },
            error: function(jqXHR, errorStatusText, errorMessage){
                console.log(errorMessage);
            }
    
        })
    }else{
        $.ajax({
            method: "post",
            url: "validateNewItem.php",
            data: {nameItem:nameItem,chooseItem:chooseItem,pathItem:pathItem,userEmail:userEmail},
            success: function(data, statusText, jqXHR){
                console.log(data);
            },
            error: function(jqXHR, errorStatusText, errorMessage){
                console.log(errorMessage);
            }
    
        })
    }
})

//------------------------------Search Bar------------------------------------------//
const search = document.getElementById('search-bar');
const matchList = document.getElementsByClassName('searcher');
const btnSearch = document.getElementById('btn-search');
const folderContent = document.getElementById('folder-content')

btnSearch.addEventListener("click", function(){
    const searchValue = search.value;
    folderContent.textContent = ""
    if(searchValue === 'Info'){

    }else{
        for(const searchItem in storage) {
            if(searchItem.includes(searchValue) && searchItem != 'Info'){
                printItem(searchItem,storage,folderContent)
            }if(Object.keys(storage[searchItem]).length>0 && searchItem != 'Info'){
                findFolders(storage[searchItem],searchValue);
            }
        }
    }
})

function findFolders(pStorage, searchValue){
    for (const searchItem in pStorage) {
        if(searchItem.includes(searchValue) && searchItem != 'Info'){
            printItem(searchItem,pStorage,folderContent)
        }if(Object.keys(pStorage[searchItem]).length>0 && searchItem != 'Info'){
            findFolders(pStorage[searchItem],searchValue);
        }
    }
}
