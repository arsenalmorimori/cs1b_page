profile_info = document.getElementsByClassName("profile_info")[1]
if(localStorage.getItem("role") == "cs_user"){
    profile_info.innerHTML = "User"
}else if(localStorage.getItem("role") == "cs_admin"){
    profile_info.innerHTML = "Admin"
}else if(localStorage.getItem("role") == "cs_dev"){
    profile_info.innerHTML = "Dev"

}

logout_button = document.getElementsByClassName("logout_button")[0]
logout_button.addEventListener("click", function(){
    localStorage.setItem("role", "")
    window.location.href = "login.html"
})