let btn_search = document.getElementById('btn-search');
let field_search = document.getElementById('search-field');
let bestResultContainer = document.getElementById('best-result')
let othersContainer = document.getElementById('others')
let APIKey = 'b807e5f9454227525cea99c772a74b7d'
let loadingGif = document.getElementById('loading-gif')
const BASE_URL = 'http://127.0.0.1:8000/api/'


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
        
        Send_Request(field_search.value)
        
       // Send_Request('shutter island')
  
});


//  1
function Send_Request(query,page=1){
    if (query!=''){
        //hide others
        othersContainer.style.display = 'none'
        bestResultContainer.style.display = 'none'
        loadingGif.style.display = 'block'
    // CREATE A XMLRquest and OPEN IT
    
    let request = new XMLHttpRequest();
    request.open('GET',`https://api.themoviedb.org/3/search/multi?api_key=${APIKey}&query=${query}&page=${page}`   ,true);

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
};

// Helper HB functions
Handlebars.registerHelper('getYear',function(release_date){
    return release_date.slice(0,4);
});

Handlebars.registerHelper('getSnippet',function(overview){
let snippet = overview.slice(0,100);
if (overview.length>100){
    snippet += ' ...'
}
return snippet;

});

Handlebars.registerHelper('getMedia_type',function(media_type){
let iconSrc = '';

if (media_type=='movie'){
    iconSrc += '/static/film.svg'
}
if(media_type == 'tv') {
    iconSrc += '/static/tv.svg'
}
else{

}
return iconSrc;
})



Handlebars.registerHelper('getPages',function(total_pages,page,options){
let isThereMorePages = false;
if (total_pages>page){
    isThereMorePages = true;
}
else{
    isThereMorePages = false;
}
return isThereMorePages;
});

Handlebars.registerHelper('isThereLastPage',function(page){
let lastPage = false;
if (page>1){
    lastPage = true;
}
else{
    lastPage = false
}
return lastPage;
});


Handlebars.registerHelper('getDetailUrl',function(media_type,id){
let url = 'detail/'
if (media_type=='movie'){
    url += 'm/' + id
}
else{
if(media_type=='tv'){
    url += 'tv/' + id
}
}

    return url
})



Handlebars.registerHelper('getInfo',getInfoHandelbar)
function getInfoHandelbar(movieDB_id,title){
    
    
    let req = new XMLHttpRequest();
    req.open('GET',`${BASE_URL}get-movie-by-moviedbid/${movieDB_id}?format=json`,true)
    req.onload = function(){
        //append checkboxs
        
   
        if (req.status>=200 && req.status<400){
            let data = JSON.parse(req.responseText)
           //console.log(data)
           let isMovieExist = data.isThereMovie
           if (isMovieExist){
               movie = data.object
               if (movie.watched){
                document.getElementById('watched-'+movieDB_id).checked = true;
               } 
               if(movie.bookmark){
                document.getElementById('bookmark-'+movieDB_id).checked = true;

               }
           }
           else {
               // console.log('movie was not in DataBase')
           }
            
        }
    
    
    else{
        console.log('Unable to connect to server!')
    }
    }
    req.send()
    return ''
}

   
    

    


function updateInfo(movieDB_id,name){
    let req = new XMLHttpRequest();
    req.open('GET',`${BASE_URL}get-movie-by-moviedbid/${movieDB_id}?format=json`,true)
    req.onload = function(){
        if (req.status>=200 && req.status<400){
            let data = JSON.parse(req.responseText)
           let isMovieExist = data.isThereMovie
           if (isMovieExist){
               movie = data.object
               watcehd_checkBox = document.getElementById('watched-'+movieDB_id).checked
               bookmark_checkBox = document.getElementById('bookmark-'+movieDB_id).checked
            //update info
            fetch(`${BASE_URL}movie-update/${movieDB_id}`, {
				method:'POST', 
				headers:{
					'Content-type':'application/json',
					'X-CSRFToken':csrftoken,
				},
				body:JSON.stringify({'watched':document.getElementById('watched-'+movieDB_id).checked,
                 'bookmark':document.getElementById('bookmark-'+movieDB_id).checked})
			}).then(()=>{
                  
                    // Show toast notification
                   alert_toast(name)




                    // Change check boxes
                 if (movie.watched){watcehd_checkBox = true;}
                 else{watcehd_checkBox = false;} 
               if(movie.bookmark){bookmark_checkBox = true; }
               else{bookmark_checkBox = false;}
               console.log('Movie Updated')

            })



              
           }
           // if movie does not exist create it
           else {
               
                console.log('movie was not in DataBase')
                url = BASE_URL + 'create-movie/'
                fetch(url, {
                    method:'POST',
                    headers:{
                        'Content-type':'application/json',
                        'X-CSRFToken':csrftoken,
                    },
                    body:JSON.stringify({'movieDB_id':movieDB_id,'title_movie':name,
                'watched':document.getElementById('watched-'+movieDB_id).checked,
            'bookmark':document.getElementById('bookmark-'+movieDB_id).checked})
    }
    ).then(
        // Show toast notification
        alert_toast(name)
    )
    console.log('MOVIE ADDED')
           }
            
        }
    
    
    else{
        console.log('Unable to connect to server!')
    }
    }
    req.send()


    
}










function getNextPage(data){
let current_page = Number(data);
    current_page++;
Send_Request(field_search.value,current_page)
window.scrollTo(0,0)
};


function getLastPage(data){

    let current_page = Number(data);
    current_page--;
Send_Request(field_search.value,current_page)
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
        ${name} got updated
      </div>
    </div>
  </div>
    `
    // Show toast notification
    $(document).ready(function(){
        $('.toast').toast('show');
      });



}
