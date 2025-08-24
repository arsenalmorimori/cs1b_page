const supabaseUrl = url
const supabaseKey = key
const client = supabase.createClient(supabaseUrl, supabaseKey)

let announcement_len = 0;

const new_box = document.getElementsByClassName("new_box")[0]
const new_close = document.getElementsByClassName("new_close")[0]
const new_list = document.getElementsByClassName("new_list")[0]
let len = 0
async function read_announcement() {
 
    let { data, error } = await client
    .from('announcement_table')
    .select('*')
    .order("created_at", { ascending: false }); // latest - old

      if(error){
        alert(error)
    }else{
        console.log(data)
        new_list.innerHTML = ``
        data.forEach(element => {
            announcement_len ++
            if(element.image_link == null){
                new_list.innerHTML += `
                            <div class="announcement_wrapper">
                                <div>
                                    <h1>${element.title}</h1>
                                    <h2> ${format_date(element.created_at)}</h2>
                                    <h3>${element.description}</h3>
                                    <button class="delete_announcement_btn" value=${element.id}>delete</button>

                                </div>
                                <div>
                                </div>
                            </div>
                `
            }else{
            len +=1

                new_list.innerHTML += `
                            <div class="announcement_wrapper">
                                <div>
                                    <h1>${element.title}</h1>
                                    <h2> ${format_date(element.created_at)}</h2>
                                    <h3>${element.description}</h3>
                                    <button class="delete_announcement_btn" value=${element.id}>delete</button>
                                </div>
                                <div>
                                    <div class="preview_bg"></div>
                                    <img class="preview_receipt" src=${element.image_link} alt="alt_image.jpg"/>
                                </div>
                            </div>
                `
            }


            delete_announcement_btn = document.getElementsByClassName("delete_announcement_btn")
            for(let a = 0 ;a < announcement_len ; a++){
                delete_announcement_btn[a].addEventListener("click", function(){
                    delete_announcement(this.value)
                })
            }

        });

            
        preview_receipt = document.getElementsByClassName("preview_receipt")
        preview_bg = document.getElementsByClassName("preview_bg")
        for(let bb = 0 ; bb <  len; bb++){
            preview_receipt[bb].addEventListener("click", function(){
                console.log("preess")
                preview_receipt[bb].classList.toggle("enlarge")
                preview_bg[bb].classList.toggle("enlarge")
            })
        }


        

        // if new_BTN isPRESS
        new_btn2 = document.getElementsByClassName("new_btn2")[0]
        new_btn = document.getElementsByClassName("new_btn")[0]

        new_btn2.addEventListener("click", function(){
            // console.log("asasadaf")
            // view_function(c)
            new_function()
        })
        
        new_btn.addEventListener("click", function(){
            // console.log("asasadaf")
            // view_function(c)
            new_function()
        })
    }

   
}




// new FUNCTION POPUP
async function new_function() {
    openNewBox()
}

new_add = document.getElementsByClassName("new_add")[0]
new_title = document.getElementsByClassName("new_title")[0]
new_description = document.getElementsByClassName("new_description")[0]
new_add.addEventListener("click", function(){

    if(new_title.value == ""){
        alert("amount is empty")
        return
    }
    if(new_description.value == ""){
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
    uploadToDiscord(3,month_label, time_label,null)
})


async function add_announcement_table(desc,title,image_link) {
    
    const { data, error } = await client
    .from('announcement_table')
    .insert([
        {   title: title ,
            description: desc,
             image_link: image_link },
    ])
    .select()

    if(error){
        console.log(error)
        alert("error")
    }else{
        console.log(data)
        alert("new successful")
        location.reload()
    }
}


popup_container = document.getElementsByClassName("popup_container")[0]
// -- open and close
function openNewBox(){
    popup_container.classList.toggle("show");
    new_box.classList.toggle("show");
}

new_close.addEventListener("click", function(){
    popup_container.classList.toggle("show");
    new_box.classList.toggle("show");
})


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



// DELETE ANNOUNCEMENT
async function delete_announcement(id) {
    
    const { error } = await client
    .from('announcement_table')
    .delete()
    .eq('id', id)

    if(error){
        alert("error")
        console.log(error)
    }else{
        alert("deleted")
        location.reload()
    }
}

read_announcement()