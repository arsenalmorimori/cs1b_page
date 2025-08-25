role_pic = document.getElementsByClassName("role_pic")[0]

if(localStorage.getItem("role") == ""|| localStorage.getItem("role") == null){
    window.location.href = "login.html"
} else if (localStorage.getItem("role") == "cs_user"){
    role_pic.src = 'asset/img/user_profile.jpg'
} else if (localStorage.getItem("role") == "cs_admin"|| localStorage.getItem("role") == "cs_dev"){
    role_pic.src = 'asset/img/admin_profile.jpg'
}

