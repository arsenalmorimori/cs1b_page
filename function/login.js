let role;

const supabaseUrl = url
const supabaseKey = key
const client = supabase.createClient(supabaseUrl, supabaseKey)



user_login_btn = document.getElementsByClassName("user_login_btn")[0]
admin_login_user = document.getElementsByClassName("admin_login_user")[0]


user_login_btn.addEventListener("click", function(){
    console.log("admin")
    login("cs1b_user@cs.com","cs1b_user")
})



admin_login_user.addEventListener("click", function(){
    console.log("admin")
    login("cs1b_admin@cs.com","cs1b_admin")
})

async function login(email,password) {
    
    let { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password
    })

    if(error){
        alert("login_error")
        console.log(error)
    }else{
        alert("login_success")
        console.log(data)
        console.log(data.user.id)
        if(data.user.id == "22a0c6d4-9c37-4d92-b382-7f6b11ce2c56"){
            localStorage.setItem("role", "cs_user");
        }else if(data.user.id == "fe12b7ca-d324-4f04-aa11-a2719f273db9"){
            localStorage.setItem("role", "cs_admin");
        }
        console.log(localStorage.getItem("role"))

    }

}
