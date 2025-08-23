console.log("connected")

const supabaseUrl = url
const supabaseKey = key
const client = supabase.createClient(supabaseUrl, supabaseKey)


// LIST & SEARCHBOX
list = document.getElementById("list")
search_box = document.getElementsByClassName("search_box")[0]


// DATABASE STORAGE
const id_array = []
const name_array = []
let total_classfunds = 0;
const total_contribution_array = []
let name_array_len = 0;


// POPUP COMPONENT
const popup_container = document.getElementsByClassName("popup_container")[0]
const add_box = document.getElementsByClassName("add_box")[0]
const view_box = document.getElementsByClassName("view_box")[0]
const spend_box = document.getElementsByClassName("spend_box")[0]
const close_add = document.getElementsByClassName("close")[0]
const close_view = document.getElementsByClassName("close")[1]
const spend_close = document.getElementsByClassName("spend_close")[0]
        


// MAIN / READ METHOD
async function read(){
    
    let { data, error } = await client
    .from("funds_table")
    .select("*")
    .order("name", { ascending: true }); // ascending = A → Z

    if(error){
        alert(error)
    }else{
        console.log(data)
        list.innerHTML = ``;
        for(let a = 0; a < data.length ; a++){
            id_array.push(data[a].id)
            name_array.push(data[a].name)
            name_array_len = data.length
            total_contribution_array.push(data[a].total_contribution)
            total_classfunds += total_contribution_array[a]
            list.innerHTML += `
            <div class="column_wrapper">
                <button class="name_btn" value=${a}>
                    <div>
                        <span>${a}</span>
                        <span>${name_array[a]}</span>
                        <span> ${parseFloat(total_contribution_array[a]).toFixed(2)}</span>
                        
                    </div>    
                </button>

                <div>
                    <button class="add_btn"  value=${a}>Add</button>
                    <button class="view_btn" value=${a}>View</button>
                </div>
            </div>`

        }   

        // PUT TOTAL CLASSFUND
        

        total_classfunds_text = document.getElementsByClassName("total_classfunds_text")[0]
        console.log(total_classfunds)
        console.log(expenses_total)
        total_classfunds_text.innerHTML = `<h2 class="total_classfunds_text">${parseFloat(total_classfunds).toFixed(2) - parseFloat(expenses_total).toFixed(2)}</h2>`

        // if ADD_BTN isPRESS
        add_btn = document.getElementsByClassName("add_btn")
     
        for(let b = 0 ; b < name_array_len ; b++){
            add_btn[b].addEventListener("click", function(){
                console.log(this.value)
                add_function(b)
                add_button_pressed(b)

            })
        }


        // if VIEW_BTN isPRESS
        view_btn = document.getElementsByClassName("view_btn")

        for(let c = 0 ; c < name_array_len ; c++){
            view_btn[c].addEventListener("click", function(){
                console.log(this.value)
                view_function(c)
            })
        }


        // if SPEND_BTN isPRESS
        spend_btn2 = document.getElementsByClassName("spend_btn2")[0]
        spend_btn = document.getElementsByClassName("spend_btn")[0]

        spend_btn2.addEventListener("click", function(){
            // console.log("asasadaf")
            // view_function(c)
            spend_function()
        })
       
        spend_btn.addEventListener("click", function(){
            // console.log("asasadaf")
            // view_function(c)
            spend_function()
        })
       

        // FOR MOBILE INTERACTION

        name_btn = document.getElementsByClassName("name_btn")
        for(let d = 0 ; d < name_array.length ; d ++){
            name_btn[d].addEventListener("click", function(){
                console.log(this.value)
                add_function(d)
            })
        }


    }

}










// SEARCH FUNCTION
search_box.addEventListener("keyup", function search(){
    console.log(search_box.value)
    let isEmpty = true;
    list.innerHTML = ``
    for(let a = 0 ; a < name_array.length ; a++){
        if(name_array[a].toLowerCase().includes(search_box.value.toLowerCase())){
            list.innerHTML += `
             <div class="column_wrapper">
                <button class="name_btn" value=${a}>
                    <div>
                        <span>${a}</span>
                        <span>${name_array[a]}</span>
                        <span> ${parseFloat(total_contribution_array[a]).toFixed(2)}</span>
                    </div>    
                </button>

                <div>
                    <button class="add_btn" value=${a}>Add</button>
                    <button class="view_btn" value=${a}>View</button>
                </div>
            </div>`
            isEmpty = false;
        
        }else{
            list.innerHTML += `
                <div class="column_wrapper_hide">
                    <button class="name_btn" value=${a}>
                        <div>
                            <span>${a}</span>
                            <span>${name_array[a]}</span>
                            <span> ${parseFloat(total_contribution_array[a]).toFixed(2)}</span>
                        </div>    
                    </button>

                    <div>
                        <button class="add_btn" value=${a}>Add</button>
                        <button class="view_btn" value=${a}>View</button>
                    </div>
                </div>` 
        }

}

    if(isEmpty){
        list.innerHTML += `<p class="empty">empty</p>`
    }


    

         // if ADD_BTN isPRESS
        add_btn = document.getElementsByClassName("add_btn")
     
        for(let b = 0 ; b < name_array_len ; b++){
            add_btn[b].addEventListener("click", function(){
                console.log(this.value)
                add_function(b)
                add_button_pressed(b)

            })
        }


        // if VIEW_BTN isPRESS
        view_btn = document.getElementsByClassName("view_btn")

        for(let c = 0 ; c < name_array_len ; c++){
            view_btn[c].addEventListener("click", function(){
                console.log(this.value)
                view_function(c)
            })
        }


        // FOR MOBILE INTERACTION

        name_btn = document.getElementsByClassName("name_btn")
        for(let d = 0 ; d < name_array.length ; d ++){
            name_btn[d].addEventListener("click", function(){
                console.log(this.value)
                add_function(d)
            })
        }

})









// ADD POPUP FUNCTIONS

add = document.getElementsByClassName("add")[0]
amount = document.getElementsByClassName("amount")[0]
description = document.getElementsByClassName("description")[0]

async function add_function(index){
    openAddBox()
    displayName(index)


    add.addEventListener("click", function(){
    if(amount.value == ""){
            alert("empty amount input")
            return;
        }
        
        if(amount.value < 0){
            alert("cannot be zero to negative")
            return;
        }
        if(description.value == ""){
            alert("empty decription input")
            return;
        }
        
        // add_contribution()
        console.log("--------------------------")
        console.log(id_array[index])
        console.log(name_array[index])
        console.log(total_contribution_array[index])
        console.log("--------------------------")

        add_contribution(index,amount.value,description.value)
    }) 

}

// -- INSERT to DB
async function add_contribution(index, amount_input,description_input) {
    const { data, error } = await client
    .from('view_table')
    .insert([
      { fk_id: id_array[index], 
          isAdd: 'true',
          amount: amount_input,
          description : description_input},
    ])
    .select()

    if(error){
      console.log(error)
    }else{
    //   console.log("added") 
        let updated_contribution =
        parseFloat(total_contribution_array[index]) + parseFloat(amount.value)
        update_total_contribution(index, updated_contribution)
    }
}

// -- UPDATE DB
async function update_total_contribution(index, amount_input) {
    const { data, error } = await client
    .from('funds_table')
    .update({ total_contribution: amount_input })
    .eq('id', id_array[index])
    .select()

    if(error){
      console.log(error)
    }else{
    //   console.log("updated")
    alert("Done")
    location.reload() 
    }
}

// -- display name only
name_title = document.getElementsByClassName("title")[0]
function displayName(index){
    name_title.innerHTML = name_array[index]
}

// -- open and close
function openAddBox(){
    popup_container.classList.toggle("show");
    add_box.classList.toggle("show");
}

close_add.addEventListener("click", function(){
    popup_container.classList.toggle("show");
    add_box.classList.toggle("show");
})










// VIEW POPUP FUNCTIONS

async function view_function(index) {
    display_name_contribution(index)
    openViewBox()
    read_view_table(index)
} 

// GET and display view_table
view_list = document.getElementById("view_list")
async function read_view_table(index) {
    view_list.innerHTML = ``
  
    
    
    let { data, error } = await client
    .from('view_table')
    .select('*').eq('fk_id', id_array[index])
    .order("created_at", { ascending: false }); // latest - old




    if(error){
        console.log(error)
    }else{
        console.log(data)
        data.forEach(element => {
            view_list.innerHTML += `
            <div>
                <span>${parseFloat(element.amount).toFixed(2)}</span>
                <span>${element.description}</span>
                <span>
                
                ${format_date(element.created_at)}
                
                </span>
            </div>`
        });
    }
    
} 

// -- display name and total_contribution only
view_name = document.getElementsByClassName("view_name")[0]
view_amount = document.getElementsByClassName("view_amount")[0]

function display_name_contribution(index){
    view_name.innerHTML = name_array[index]
    view_amount.innerHTML = total_contribution_array[index]
}

// -- date formatter
function format_date(isoString){
   const date = new Date(isoString);

    // extract parts as-is (ignore local TZ shift)
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    // format mm/dd. hh:mm
    return `${month}/${day}. ${hours}:${minutes}`;
}

// -- to open and close
function openViewBox(index){
    popup_container.classList.toggle("show");
    view_box.classList.toggle("show");
}

close_view.addEventListener("click", function(){
    popup_container.classList.toggle("show");
    view_box.classList.toggle("show");
})


 





// SPEND FUNCTION POPUP
async function spend_function() {
    openSpendBox()
}

spend_add = document.getElementsByClassName("spend_add")[0]
spend_amount = document.getElementsByClassName("spend_amount")[0]
spend_description = document.getElementsByClassName("spend_description")[0]
spend_add.addEventListener("click", function(){

    if(spend_amount.value == ""){
        alert("amount is empty")
        return
    }
    if(spend_description.value == ""){
        alert("description is empty")
        return
    }

    let now = new Date();

    // Force to PH time using toLocaleString
    let options = { timeZone: "Asia/Manila" };

    // Extract month, day, hour
    let month = now.toLocaleString("en-US", { ...options, month: "2-digit" });
    let date  = now.toLocaleString("en-US", { ...options, day: "2-digit" });
    let hour  = now.toLocaleString("en-US", { ...options, hour: "2-digit", hour12: false });
    let minute = now.toLocaleString("en-US", { ...options, minute: "2-digit" });
    let second = now.toLocaleString("en-US", { ...options, second: "2-digit" });


    let month_label = month + "/" + date
    let time_label = hour + ":" + minute
    uploadToDiscord(1,month_label, time_label)
    // console.log(image_url)
})


async function add_expense_table(desc,amount,image_link) {
    
    const { data, error } = await client
    .from('expenses_table')
    .insert([
        {   amount: amount ,
            description: desc,
             image_link: image_link },
    ])
    .select()

    if(error){
        console.log(error)
        alert("error")
    }else{
        console.log(data)
        alert("spend successful")
        location.reload()
    }
}

// -- open and close
function openSpendBox(){
    popup_container.classList.toggle("show");
    spend_box.classList.toggle("show");
}

spend_close.addEventListener("click", function(){
    popup_container.classList.toggle("show");
    spend_box.classList.toggle("show");
})














// GET EXPENSES
let expenses_total = 0;
async function read_expenses_here() {
 
    let { data, error } = await client
    .from('expenses_table')
    .select('*')
    .order("created_at", { ascending: false }); // latest - old

      if(error){
        alert(error)
    }else{
        data.forEach(element => {
            expenses_total += element.amount
        });

           
    }

   
}




read_expenses_here()
// Call READ or MAIN Method
read()


