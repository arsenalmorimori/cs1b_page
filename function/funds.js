console.log("connected")

const supabaseUrl = url
const supabaseKey = key
const client = supabase.createClient(supabaseUrl, supabaseKey)

list = document.getElementById("list")
search_box = document.getElementsByClassName("search_box")[0]

const name_array = []
const total_contribution_array = []
async function read(){
    
    
    let { data, error } = await client
    .from("funds_table")
    .select("*")

    if(error){
        alert(error)
    }else{
        console.log(data)
        list.innerHTML = ``;
        for(let a = 0; a < data.length ; a++){
            name_array.push(data[a].name)
            total_contribution_array.push(data[a].total_contribution)
            list.innerHTML += `
            <div class="column_wrapper">
                <button onclick="console.log(this.value)" class="name_btn" value=${a}>
                    <div>
                        <span>${a}</span>
                        <span>${name_array[a]}</span>
                        <span> ${total_contribution_array[a]}</span>
                    </div>    
                </button>

                <div>
                    <button class="add_btn" onclick="click_add(this.value)" value=${a}>Add</button>
                    <button class="view_btn" onclick="click_view(this.value)" value=${a}>View</button>
                </div>
            </div>`

        }
    }

}

function click_add(val){
    console.log("add " + val)
}

function click_view(val){
    console.log("view " + val)
}


       


search_box.addEventListener("keyup", function search(){
    console.log(search_box.value)
    let isEmpty = true;
    list.innerHTML = ``
    for(let a = 0 ; a < list_array.length ; a++){
        if(list_array[a].toLowerCase().includes(search_box.value.toLowerCase())){
            list.innerHTML += `<buttton value=${a}><li>${name_array[a]} ${total_contribution_array[a]} </li>`
            isEmpty = false;
        }
    }

    if(isEmpty){
        list.innerHTML += `<p>empty</p>`
    }

})

read()