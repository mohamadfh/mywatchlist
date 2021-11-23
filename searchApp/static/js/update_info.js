
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


function updateInfo(movieDB_id,name){
    let req = new XMLHttpRequest();
    req.open('GET',`${BASE_URL}get-movie-by-moviedbid/${movieDB_id}?format=json`,true)
    req.onload = function(){
        if (req.status>=200 && req.status<400){
            let data = JSON.parse(req.responseText)
           let isMovieExist = data.isThereMovie
           if (isMovieExist){
               movie = data.object
               console.log(movie)
               watcehd_checkBox = document.getElementById('watched-'+movieDB_id).checked
               bookmark_checkBox = document.getElementById('bookmark-'+movieDB_id).checked
               user = document.getElementById('username').value
               console.log(user,document.getElementById('media_type-'+movieDB_id).value,
               document.getElementById('poster_path-'+movieDB_id).value)
            //update info
            fetch(`${BASE_URL}movie-update/${movieDB_id}`, {
				method:'POST', 
				headers:{
					'Content-type':'application/json',
					'X-CSRFToken':csrftoken,
				},
				body:JSON.stringify({'watched':document.getElementById('watched-'+movieDB_id).checked,
                 'bookmark':document.getElementById('bookmark-'+movieDB_id).checked,
                'user':user,
            })
			}).then(()=>{
                  
                    // Show toast notification
                   alert_toast(`${name} <strong>updated!</strong>`)
                    
                    
                    // Change check boxes
                 if (movie.watched){watcehd_checkBox = true;}
                 else{watcehd_checkBox = false;} 
               if(movie.bookmark){bookmark_checkBox = true; }
               else{bookmark_checkBox = false;}
               console.log('Movie Updated')

               
             }).then(()=>{
                 
                fetch(`${BASE_URL}get-movie-by-moviedbid/${movieDB_id}`).then((response) => {
                    return response.json(); }).then((data)=>{
                        movie = data.object 
                        if(movie.watched==true&&movie.bookmark==true){
                            alert_toast('Added to watched list!')
                        }
                        if(movie.bookmark==false && movie.watched==false){
                        console.log('movie should be deleted!')
                        fetch(`${BASE_URL}delete-movie/${movieDB_id}`, {
				method:'DELETE', 
				headers:{
					'Content-type':'application/json',
					'X-CSRFToken':csrftoken,
				}
			}
            ).then(()=>{
                alert_toast(`${name} <strong>deleted</strong>`)
            })
                    }})


             })
             


              
           }
           // if movie does not exist create it
           else {
            user = document.getElementById('username').value
                console.log('movie was not in DataBase')
                url = BASE_URL + 'create-movie/'
                fetch(url, {
                    method:'POST',
                    headers:{
                        'Content-type':'application/json',
                        'X-CSRFToken':csrftoken,
                    },
                    body:JSON.stringify({'movieDB_id':movieDB_id,
                    'title_movie':name,
                'watched':document.getElementById('watched-'+movieDB_id).checked,
            'bookmark':document.getElementById('bookmark-'+movieDB_id).checked,
        'user':user,
    'media_type':document.getElementById('media_type-'+movieDB_id).value,
    'poster_path':document.getElementById('poster_path-'+movieDB_id).value,
    'backdrop_path':document.getElementById('backdrop_path-'+movieDB_id).value})
    
    }
    ).then(
        // Show toast notification
        alert_toast(`${name} <strong>added!</strong>`)
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


function alert_toast(name){
    document.getElementById('toast').innerHTML = `
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        
        <strong class="me-auto">MyWatchList</strong>
        <small>just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body fira-sans-font">
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


//title snippet
Handlebars.registerHelper('titleSnippet',function(title){
    let res = title
    if(title.length>=100){
        res = title.slice(0,100) + ' ...'
    }
return res
})


Handlebars.registerHelper('getDetailUrl',function(media_type,movieDB_id){
    let url = '/search/'
    if (media_type=='movie'){
        url += 'movie/' + movieDB_id
    }
    if(media_type=='person'){
        url+='person/'+movieDB_id
    }
    else{
    if(media_type=='tv'){
        url += 'tv/' + movieDB_id
    }
    }
    
        return url
    })

    Handlebars.registerHelper('getYear',function(release_date){
        return release_date.slice(0,4);
    });



    Handlebars.registerHelper('getInfo',getInfoHandelbar)
    function getInfoHandelbar(id){
        
        
        let req = new XMLHttpRequest();
        req.open('GET',`${BASE_URL}get-movie-by-moviedbid/${id}?format=json`,true)
        req.onload = function(){
            //append checkboxs
            
       
            if (req.status>=200 && req.status<400){
                let data = JSON.parse(req.responseText)
               //console.log(data)
               let isMovieExist = data.isThereMovie
               if (isMovieExist){
                   movie = data.object
                   if (movie.watched){
                    document.getElementById('watched-'+id).checked = true;
                   } 
                   if(movie.bookmark){
                    document.getElementById('bookmark-'+id).checked = true;
    
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
    if(media_type=='person'){
    iconSrc += '/static/person.png'
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
    let url = '/search/'
    if (media_type=='movie'){
        url += 'movie/' + id
    }
    if(media_type=='person'){
        url+='person/'+id
    }

    else{
        if(media_type=='tv'){
        url += 'tv/' + id
    }    

    }
    
        return url
    })
    
    
    
   



        function updateInfoCrew(movieDB_id,name){
            let req = new XMLHttpRequest();
            req.open('GET',`${BASE_URL}get-movie-by-moviedbid/${movieDB_id}?format=json`,true)
            req.onload = function(){
                if (req.status>=200 && req.status<400){
                    let data = JSON.parse(req.responseText)
                   let isMovieExist = data.isThereMovie
                   if (isMovieExist){
                       movie = data.object
                       console.log(movie)
                       watcehd_checkBox = document.getElementById('watched-crew-'+movieDB_id).checked
                       bookmark_checkBox = document.getElementById('bookmark-crew-'+movieDB_id).checked
                       user = document.getElementById('username').value
                       console.log(user,document.getElementById('media_type-crew-'+movieDB_id).value,
                       document.getElementById('poster_path-crew-'+movieDB_id).value)
                    //update info
                    fetch(`${BASE_URL}movie-update/${movieDB_id}`, {
                        method:'POST', 
                        headers:{
                            'Content-type':'application/json',
                            'X-CSRFToken':csrftoken,
                        },
                        body:JSON.stringify({'watched':document.getElementById('watched-crew-'+movieDB_id).checked,
                         'bookmark':document.getElementById('bookmark-crew-'+movieDB_id).checked,
                        'user':user,
                    })
                    }).then(()=>{
                          
                            // Show toast notification
                           alert_toast(`${name} <strong>updated!</strong>`)
                            
                            
                            // Change check boxes
                         if (movie.watched){watcehd_checkBox = true;}
                         else{watcehd_checkBox = false;} 
                       if(movie.bookmark){bookmark_checkBox = true; }
                       else{bookmark_checkBox = false;}
                       console.log('Movie Updated')
        
                       
                     }).then(()=>{
                         
                        fetch(`${BASE_URL}get-movie-by-moviedbid/${movieDB_id}`).then((response) => {
                            return response.json(); }).then((data)=>{
                                movie = data.object 
                                if(movie.watched==true&&movie.bookmark==true){
                                    alert_toast('Added to watched list!')
                                }
                                if(movie.bookmark==false && movie.watched==false){
                                console.log('movie should be deleted!')
                                fetch(`${BASE_URL}delete-movie/${movieDB_id}`, {
                        method:'DELETE', 
                        headers:{
                            'Content-type':'application/json',
                            'X-CSRFToken':csrftoken,
                        }
                    }
                    ).then(()=>{
                        alert_toast(`${name} <strong>deleted</strong>`)
                    })
                            }})
        
        
                     })
                     
        
        
                      
                   }
                   // if movie does not exist create it
                   else {
                    user = document.getElementById('username').value
                        console.log('movie was not in DataBase')
                        url = BASE_URL + 'create-movie/'
                        fetch(url, {
                            method:'POST',
                            headers:{
                                'Content-type':'application/json',
                                'X-CSRFToken':csrftoken,
                            },
                            body:JSON.stringify({'movieDB_id':movieDB_id,
                            'title_movie':name,
                        'watched':document.getElementById('watched-crew-'+movieDB_id).checked,
                    'bookmark':document.getElementById('bookmark-crew-'+movieDB_id).checked,
                'user':user,
            'media_type':document.getElementById('media_type-crew-'+movieDB_id).value,
            'poster_path':document.getElementById('poster_path-crew-'+movieDB_id).value,
            'backdrop_path':document.getElementById('backdrop_path-crew-'+movieDB_id).value})
            
            }
            ).then(
                // Show toast notification
                alert_toast(`${name} <strong>added!</strong>`)
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



        function updateInfoCast(movieDB_id,name){
            let req = new XMLHttpRequest();
            req.open('GET',`${BASE_URL}get-movie-by-moviedbid/${movieDB_id}?format=json`,true)
            req.onload = function(){
                if (req.status>=200 && req.status<400){
                    let data = JSON.parse(req.responseText)
                   let isMovieExist = data.isThereMovie
                   if (isMovieExist){
                       movie = data.object
                       console.log(movie)
                       watcehd_checkBox = document.getElementById('watched-cast-'+movieDB_id).checked
                       bookmark_checkBox = document.getElementById('bookmark-cast-'+movieDB_id).checked
                       user = document.getElementById('username').value
                       console.log(user,document.getElementById('media_type-cast-'+movieDB_id).value,
                       document.getElementById('poster_path-cast-'+movieDB_id).value)
                    //update info
                    fetch(`${BASE_URL}movie-update/${movieDB_id}`, {
                        method:'POST', 
                        headers:{
                            'Content-type':'application/json',
                            'X-CSRFToken':csrftoken,
                        },
                        body:JSON.stringify({'watched':document.getElementById('watched-cast-'+movieDB_id).checked,
                         'bookmark':document.getElementById('bookmark-cast-'+movieDB_id).checked,
                        'user':user,
                    })
                    }).then(()=>{
                          
                            // Show toast notification
                           alert_toast(`${name} <strong>updated!</strong>`)
                            
                            
                            // Change check boxes
                         if (movie.watched){watcehd_checkBox = true;}
                         else{watcehd_checkBox = false;} 
                       if(movie.bookmark){bookmark_checkBox = true; }
                       else{bookmark_checkBox = false;}
                       console.log('Movie Updated')
        
                       
                     }).then(()=>{
                         
                        fetch(`${BASE_URL}get-movie-by-moviedbid/${movieDB_id}`).then((response) => {
                            return response.json(); }).then((data)=>{
                                movie = data.object 
                                if(movie.watched==true&&movie.bookmark==true){
                                    alert_toast('Added to watched list!')
                                }
                                if(movie.bookmark==false && movie.watched==false){
                                console.log('movie should be deleted!')
                                fetch(`${BASE_URL}delete-movie/${movieDB_id}`, {
                        method:'DELETE', 
                        headers:{
                            'Content-type':'application/json',
                            'X-CSRFToken':csrftoken,
                        }
                    }
                    ).then(()=>{
                        alert_toast(`${name} <strong>deleted</strong>`)
                    })
                            }})
        
        
                     })
                     
        
        
                      
                   }
                   // if movie does not exist create it
                   else {
                    user = document.getElementById('username').value
                        console.log('movie was not in DataBase')
                        url = BASE_URL + 'create-movie/'
                        fetch(url, {
                            method:'POST',
                            headers:{
                                'Content-type':'application/json',
                                'X-CSRFToken':csrftoken,
                            },
                            body:JSON.stringify({'movieDB_id':movieDB_id,
                            'title_movie':name,
                        'watched':document.getElementById('watched-cast-'+movieDB_id).checked,
                    'bookmark':document.getElementById('bookmark-cast-'+movieDB_id).checked,
                'user':user,
            'media_type':document.getElementById('media_type-cast-'+movieDB_id).value,
            'poster_path':document.getElementById('poster_path-cast-'+movieDB_id).value,
            'backdrop_path':document.getElementById('backdrop_path-cast-'+movieDB_id).value})
            
            }
            ).then(
                // Show toast notification
                alert_toast(`${name} <strong>added!</strong>`)
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