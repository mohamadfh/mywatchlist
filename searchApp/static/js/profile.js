const BASE_URL = 'http://127.0.0.1:8000/api/'
let container = document.getElementById('container-profile')
let loadingGif = document.getElementById('loading-gif')
let othersContainer = document.getElementById('others')
let APIKey = 'b807e5f9454227525cea99c772a74b7d'

console.log('PROFILE')

Send_Request()
//Handlebars
function renderHTML(data){
    let rawTemplate = document.getElementById('titleTemplate').innerHTML;
    let compiledTemplate = Handlebars.compile(rawTemplate);
    let generetedHTML = compiledTemplate(data);
    container.innerHTML = generetedHTML;
    console.log(data)
    };



    function Send_Request(){
        
            //hide others
            othersContainer.style.display = 'none'
            container.style.display = 'none'
            loadingGif.style.display = 'block'
        // CREATE A XMLRquest and OPEN IT
        
        let request = new XMLHttpRequest();
        request.open('GET',`${BASE_URL}bookmark/`   ,true);
    
        // AFTER IT GOT LOAD DO THIS
        request.onload = function(){
    
            othersContainer.style.display = 'none'
            container.style.display = 'block'
            
            loadingGif.style.display = 'none'
                    if (request.status>=200 && request.status<400){
                let data = JSON.parse(request.responseText)
                
                // CALL THE renderHTML to create CARDS
                renderHTML(data)
    
                // IF there was no result 
                if(data.length==0){
                    container.style.display = 'none'
                    othersContainer.style.display = 'block'
                    othersContainer.innerHTML = `
                    <div class="row row-col-auto">
                    <div class="center-btn" style="margin: 2em;align-self:center;">
        <div class="col-md-5 center-card"><p class="h2">No Bookmark</p></div>
        </div>
                    <div class="col-md-4 center-card">
                    <img class="img-fluid center-card" src="/static/No data-amico.svg" alt="no data">
                    </div>
                    
                    </div>
                    `
                }
                
                
            }//END IFsrc="Oops! 404 Error with a broken robot-rafiki.svg"
            else{
                loadingGif.style.display = 'none'
                othersContainer.style.display = 'block'
                othersContainer.innerHTML =  `
                <div class="row row-col-auto">
                <div class="center-btn" style="margin: 2em;align-self:center;">
        <div class="col-md-5 center-card"><p class="h2">Oops , try again or<strong> Use VPN</strong></p></div>
        </div>
                <div class="col-md-4 center-card">
                <img class="img-fluid center-card" src="/static/Oops! 404 Error with a broken robot-rafiki.svg" alt="404">
                </div>
                
                </div>
                `
                console.log("CONNECTION IS DOMMED!")
            };
    
    
        }; // END onload
    // SEND REQUEST
    request.send();
    
     // ERROR HANDELING
    request.onerror = function(){
        
        // Show Error LATER*******
        loadingGif.style.display = 'none'
        othersContainer.style.display = 'block'
        othersContainer.innerHTML = `
        <div class="row row-col-auto">
        <div class="center-btn" style="margin: 2em;align-self:center;">
        <div class="col-md-5 center-card"><p class="h2">Please check your connection or<strong> Use VPN</strong></p></div>
        </div>
        <div class="col-md-4 center-card">
        <img class="img-fluid center-card" src="/static/taxi-sad-death.png" alt="oops!">
        </div>
        
        </div>
        `
    
        console.log('ERROORRR')
    } 
        } //End First if
       
    // END Send_request

