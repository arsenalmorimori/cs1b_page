let expenses_len = [];
expenses_list = document.getElementsByClassName("expenses_list")[0]
async function read_expenses() {
 
    let { data, error } = await client
    .from('expenses_table')
    .select('*')
    .order("created_at", { ascending: false }); // latest - old

      if(error){
        alert(error)
    }else{
        console.log(data)
        expenses_list.innerHTML = ``
        data.forEach(element => {
            expenses_len.push(element.amount)
            expenses_list.innerHTML += `
                        <div class="expenses_wrapper">
                            <div>
                                <h1>${parseFloat(element.amount).toFixed(2)}</h1>
                                <h2> ${format_date(element.created_at)}</h2>
                                <h3>${element.description}</h3>
                            </div>
                            <div>
                                <div class="preview_bg"></div>
                                <img class="preview_receipt"  src="${element.image_link}"  alt="alt_image.jpg"/>
                            </div>
                        </div>
            `
        });

            
        preview_receipt = document.getElementsByClassName("preview_receipt")
        preview_bg = document.getElementsByClassName("preview_bg")
        for(let aa = 0 ; aa < 2 ; aa++){
            preview_receipt[aa].addEventListener("click", function(){
                console.log("preess")
                preview_receipt[aa].classList.toggle("enlarge")
                preview_bg[aa].classList.toggle("enlarge")
            })
        }
    }

   
}


read_expenses()