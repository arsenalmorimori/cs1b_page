user_login_btn = document.getElementsByClassName("user_login_btn")[0]
admin_login_btn = document.getElementsByClassName("admin_login_btn")[0]
user_box = document.getElementsByClassName("user_box")[0]
admin_box = document.getElementsByClassName("admin_box")[0]
show_user = document.getElementsByClassName("show_user")[0]
show_admin = document.getElementsByClassName("show_admin")[0]


identification = document.getElementsByClassName("identification")[0]


show_admin.addEventListener("click", function(){
    user_box.classList.toggle("hide")
    admin_box.classList.toggle("show")
})
show_user.addEventListener("click", function(){
    admin_box.classList.toggle("show")
    user_box.classList.toggle("hide")
})






user_login_btn.addEventListener("click", function(){
    localStorage.setItem("role", "cs_user");
    window.location.href = "index.html"
})



admin_login_btn.addEventListener("click", function(){
    if(identification.value == ""){
        alert("please put your identification")
        return
    }
    if(identification.value == admin_passcode){
        console.log("admin")
        localStorage.setItem("role", "cs_admin");
        window.location.href = "index.html"
    }else{
        alert("identification failed")
    }
    
})
