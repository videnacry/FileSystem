//---------------------------directory Navigator------------------------------------

let userEmail = "beron@carlota.com"
let path = "json/" + userEmail + ".json"
let storage
let directoryNav = document.getElementById("directory-nav")
let liHTML = document.createElement("li")
liHTML.className = "nav-item ml-2"
let aHTML = document.createElement("a")
aHTML.style.width = "fit-content"
aHTML.className = "nav-link"
aHTML.setAttribute("onclick", "printChildren()")
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
$.getJSON(path, function (data, statusText, jqXHR) {
    storage = data
    print(storage, directoryNav)
})
function print(pObject, parent) {
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
function printChildren() {
    let open = false
    let parent = event.currentTarget.parentElement
    if (parent.getElementsByTagName("li").length > 0) {
        for (let i in parent.getElementsByTagName("li")) {
            $(parent).find("li").remove()
        }
    } else {
        open = true
        let pathArray = getPath(parent)
        let folder = getFolder(pathArray, storage)
        print(folder, parent)
    }
}

//-----------------------------------MiniModal---------------------------------------
let itemSelected
let a 
var contextElement = document.getElementById("context-menu");
function showMiniModal() {
    event.preventDefault();
    itemSelected = event.currentTarget
    contextElement.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px"
    contextElement.style.left = event.currentTarget.offsetLeft + event.currentTarget.offsetWidth + "px"
    contextElement.classList.add("active");
    let renameItem = document.getElementById("rename-item")
    let deleteItem = document.getElementById("delete-item")
    renameItem.addEventListener("click",function(){
        let parent = itemSelected.parentElement.parentElement
        let target = event.currentTarget
        let targetName = target.dataset.key
        let pathArray = getPath(parent)
        folder = getFolder(pathArray, storage)
        renameStorageItem(folder,targetName,"beorn")
    })
}

$("body").click(function () {
    contextElement.classList.remove("active");
});

//------------------------------Rename Item in Storage--------------------------------

function renameStorageItem(parent, name, newName){
    a = parent
    if(parent.hasOwnProperty(name)){
        parent[newName] = Object.assign([],parent[name])
        delete parent[name]
    }
}

//----------------------------Modal New Item in directory-----------------------------

let buttonNewItem = document.getElementById("button-new-item")
let modalNewItem = document.getElementById("modal-new-item")
buttonNewItem.addEventListener("click",function(){
    modalNewItem.style.display = "block"
    modalCloseItems = ["modal-close-bg","close","btn-secondary"]
    modalCloseItems.map(function(item){
        modalNewItem.getElementsByClassName(item)[0].addEventListener("click",closeModal)
    })
    function closeModal(){
        modalNewItem.style.display = "none"
    }
})