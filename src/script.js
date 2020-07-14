//---------------------------directory Navigator------------------------------------

let userEmail = "beron@carlota.com"
let path = "json/" + userEmail + ".json"
let storage
let directoryNav = document.getElementById("directory-nav")
let liHTML = document.createElement("li")
liHTML.className = "nav-item ml-2"
let aHTML = document.createElement("a")
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
    console.log(pathArray)
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

var contextElement = document.getElementById("context-menu");

function showMiniModal() {
    event.preventDefault();
    contextElement.style.top = event.offsetY + "px";
    contextElement.style.left = event.offsetX + "px";
    contextElement.classList.add("active");
}

$(contextElement).click(function () {
    document.getElementById("context-menu").classList.remove("active");
});

//----------------------------Modal New Item in directory-----------------------------

let buttonNewItem = document.getElementById("button-new-item")
let modalNewItem = document.getElementById("modal-new-item")
buttonNewItem.addEventListener("click",function(){
    modalNewItem.style.display = "block"
    modalNewItem.getElementsByClassName("close")[0].addEventListener("click",closeModal)
    modalNewItem.getElementsByClassName("btn-secondary")[0].addEventListener("click",closeModal)
    function closeModal(){
        modalNewItem.style.display = "none"
    }
})

//-------------------------------create new file/folder-----------------------------------//
$("#create-new-item").click(function(){
    const nameItem = $("#inputName").val();
    const chooseItem = $("#input-type").val();
    const pathItem = $("#input-path").val();
    $.ajax({
        method: "post",
        url: "validateNewItem.php",
        data: {nameItem:nameItem,chooseItem:chooseItem,pathItem:pathItem},
        success: function(data, statusText, jqXHR){
            console.log(data);
        },
        error: function(jqXHR, errorStatusText, errorMessage){
            console.log(errorMessage);
        }

    })
})