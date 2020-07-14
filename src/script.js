
let info = {};
info["Size"] = {};
info["Type"] = {};
info["Creation"] = {};
info["Modified"] = {};

let root = {};
root["myFiles"] = {};
root["myFiles"]["Info"] = info;
root["myFiles"]["Music"] = {};
root["myFiles"]["Office"] = {};
root["myFiles"]["Office"]["Accounting"] = {};
root["myFiles"]["Office"]["Accounting"]["Document.txt"] = {};
root["myFiles"]["Office"]["Accounting"]["Document.txt"]["Info"] = info;
root["myFiles"]["Office"]["Accounting"]["Info"] ={};
root["myFiles"]["Office"]["Accounting"]["Info"]["Size"] ={};
root["myFiles"]["PDF Docs"] = {};
root["myFiles"]["Photography"] = {};
root["myFiles"]["Video"] = {};
root["Photos"] = {};
root["Music"] = {};

const rootStorage = JSON.stringify(root);
console.log(rootStorage);

$.ajax({
    method: "post",
    data: {user: "beron@carlota.com", 
        storage: rootStorage},
    url: "saveStorage.php",
    success: function(response, textStatus, jqXHR){
        console.log(response);
    },
    error: function(jqXHR, errorTextStatus, errorMessage){
        console.log(errorMessage);
    }

})

// add event listeners

// $("#directory-nav .nav-item").contextmenu(function(event) {
//     event.preventDefault();
//     let modalModify = $(".modal-modify");

//     console.log("estas hacinedo click");
//     // alert("hola");
// });
var contextElement = document.getElementById("context-menu");

$("#directory-nav .nav-item").contextmenu(function(event){
    event.preventDefault();
    var contextElement = document.getElementById("context-menu");
    contextElement.style.top = event.offsetY + "px";
    contextElement.style.left = event.offsetX + "px";
    contextElement.classList.add("active");
  });

  $(contextElement).click(function(){
    document.getElementById("context-menu").classList.remove("active");
  });
  