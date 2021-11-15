let btn_search = document.getElementById('btn-search');
let field_search = document.getElementById('search-field');
let bestResultContainer = document.getElementById('best-result')
let othersContainer = document.getElementById('others')
let APIKey = 'b807e5f9454227525cea99c772a74b7d'
let loadingGif = document.getElementById('loading-gif')
var BASE_URL = 'http://127.0.0.1:8000/api/'
let include_adult = document.getElementById('include-adult')



function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

document.getElementById('include-adult').addEventListener('change',function () {
    btn_search.click();

  })

field_search.addEventListener('keyup',function(event){
   
    if (event.key === 'Enter'){
        event.preventDefault();
        // Trigger the button element with a click
        btn_search.click();
    }
});

field_search.addEventListener('input',function(event){
    btn_search.click();

});

btn_search.addEventListener('click',function(){

        // Call Send_Request FUNCTION
        let include_adult = document.getElementById('include-adult').checked
        let yearRegex = getYearRegex(field_search.value)
        //console.log(yearRegex)
        let titleMovie = field_search.value
        if(yearRegex!=null){
            titleMovie = field_search.value.replace(yearRegex,'')
        }
        
           Send_Request(titleMovie,include_adult,1,yearRegex)  
        
       
        
       // Send_Request('shutter island')
  
});


//  1
function Send_Request(query,include_adult=false,page=1,year=''){
    if (query!=''){
        
        //hide others
        othersContainer.style.display = 'none'
        bestResultContainer.style.display = 'none'
        loadingGif.style.display = 'block'
    // CREATE A XMLRquest and OPEN IT
    
    let request = new XMLHttpRequest();
    request.open('GET',
    `https://api.themoviedb.org/3/search/multi?api_key=${APIKey}&query=${query}&page=${page}&include_adult=${include_adult}&year=${year}`
       ,true);
    // AFTER IT GOT LOAD DO THIS
    request.onload = function(){

        othersContainer.style.display = 'none'
        bestResultContainer.style.display = 'block'
        
        loadingGif.style.display = 'none'
                if (request.status>=200 && request.status<400){
            let data = JSON.parse(request.responseText)
            console.log(data)

            // CALL THE renderHTML to create CARDS
            renderHTML(data)

            // IF there was no result 
            if(data.results.length==0){
                bestResultContainer.style.display = 'none'
                othersContainer.style.display = 'block'
                othersContainer.innerHTML = `
                <div class="row row-col-auto">
                <div class="center-btn" style="margin: 2em;align-self:center;">
    <div class="col-md-5 center-card"><p class="h2">Make sure spelled correctly</p></div>
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
console.log(query) 
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
   
}; // END Send_request


// HANDLEBARS
function renderHTML(data){
let rawTemplate = document.getElementById('titleTemplate').innerHTML;
let compiledTemplate = Handlebars.compile(rawTemplate);
let generetedHTML = compiledTemplate(data);
bestResultContainer.innerHTML = generetedHTML;
showHidePerson()
};

// Helper HB functions

   
function getNextPage(data){
let current_page = Number(data);
    current_page++;
Send_Request(field_search.value,include_adult,current_page)
window.scrollTo(0,0)
};


function getLastPage(data){

    let current_page = Number(data);
    current_page--;
Send_Request(field_search.value,include_adult,current_page)
window.scrollTo(0,0)
};




function alert_toast(name){
    document.getElementById('toast').innerHTML = `
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        
        <strong class="me-auto">MyWatchList</strong>
        <small>just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${name}
      </div>
    </div>
  </div>
    `
    // Show toast notification
    $(document).ready(function(){
        $('.toast').toast('show');
      });

}


function getYearRegex(fullname){
    let year = ''
    try{
    let re = /(.+)\W(\d{4})?/;
    year = re.exec(fullname)[2]
}
catch{

}
return year
}



Handlebars.registerHelper('mediaTypeIsPerson',function (media_type) { 
    let person = false
    if (media_type=='person'){
        person=true
    }
    else{
        person=false
    }
    return person
 })


 Handlebars.registerHelper('checkIfPersonInclude',function () { 

return document.getElementById('include-person').checked

  })


document.getElementById('include-person').addEventListener('change',showHidePerson)


 function showHidePerson(){
  let value = document.getElementById('include-person').checked
let person_cards_display = document.getElementsByName('person-card-display')
if(value==true){
person_cards_display.forEach(element => {
    element.style.display = 'block'
});    
}
else{
    person_cards_display.forEach(element => {
        element.style.display = 'none'
    });  
}
   
 }