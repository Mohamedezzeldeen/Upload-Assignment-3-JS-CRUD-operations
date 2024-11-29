
var bookN = document.getElementById("bookN")
var siteU = document.getElementById("siteU")
var sub = document.getElementById("sub")
var tableBodyId = document.getElementById("tableBodyId")
var messageNameId = document.getElementById("message")
var messageNameIdTwo = document.getElementById("messageNumTwo")


var mainArray = []
if (localStorage.getItem("Sitees") != null) {
    mainArray = JSON.parse(localStorage.getItem("Sitees"))
    display()
}

sub.addEventListener("click", function () {

    var isDuplicate = false;

    // التحقق من التكرار باستخدام حلقة for
    for (var i = 0; i < mainArray.length; i++) {
        if (mainArray[i].Name === bookN.value || mainArray[i].urlSite === siteU.value) {
            isDuplicate = true;
            break;
        }
    }

    if (isDuplicate) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The name or link is already used. Please enter a unique name and link.",
        });
        return; // الخروج من الوظيفة بدون إضافة بيانات جديدة
    }

   if (validation() == true && valide() == true ) {
    var sites = {
        Name : bookN.value,
        urlSite : siteU.value
    }

    mainArray.push(sites)
    localStorage.setItem("Sitees", JSON.stringify(mainArray))
        display()
        clear()
        messageNameId.classList.add("d-none")
        messageNameIdTwo.classList.add("d-none")
   } else if(validation() == false && valide() == false){
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid URL format. Please enter a valid URL! also The Name must be at least 3 characters long.",
        footer: '<a href="#">Why do I have this issue?</a>'
      });

      messageNameId.classList.remove("d-none")
      messageNameIdTwo.classList.remove("d-none")
   }
})

function clear() {
    bookN.value = null;
    siteU.value = null
}


function display() {
    var contain = `` 
        for(var i = 0 ; i < mainArray.length ; i++){
                contain += ` 
            <tr>
                      <td scope="row" class="fw-bold">${i+1}</td>
                      <td class="fw-bold">${mainArray[i].Name}</td>
                      <td><a href="${mainArray[i].urlSite}" target="_blank" class="text-decoration-none btn btn-success text-white fw-bolder"> <i class="fa-solid fa-eye"></i> Visit</a></td>
                      <td><button class="btn btn-danger" onclick="delet(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                    </tr>
            `
            
        }
    
        tableBodyId.innerHTML = contain
    
    
}

function delet(index) {
    mainArray.splice(index, 1)
    localStorage.setItem("Sitees", JSON.stringify(mainArray))
    display()
}



function validation() {
  //  var regix = /^[a-zA-Z:]{1,}.[a-z]{2,}.[a-z]{2,}$/

    var regix = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/

    if (regix.test(siteU.value)) {
        siteU.classList.remove("is-invalid");
        siteU.classList.add("is-valid");
        return true
    }else{
        siteU.classList.remove("is-valid");
        siteU.classList.add("is-invalid");
        return false
    }


}


function valide() {
    var reg = /^\w{3,}$/

    if (reg.test(bookN.value)) {
        bookN.classList.remove("is-invalid");
        bookN.classList.add("is-valid");
        return true
    }else{
        bookN.classList.remove("is-valid");
        bookN.classList.add("is-invalid");
        return false
    }
}















