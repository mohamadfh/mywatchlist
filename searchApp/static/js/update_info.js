
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
                   alert_toast(`${name} updated!`)
                    
                    
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
                alert_toast(`${name} deleted`)
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
                    body:JSON.stringify({'movieDB_id':movieDB_id,'title_movie':name,
                'watched':document.getElementById('watched-'+movieDB_id).checked,
            'bookmark':document.getElementById('bookmark-'+movieDB_id).checked,
        'user':user,
    'media_type':document.getElementById('media_type-'+movieDB_id).value,
    'poster_path':document.getElementById('poster_path-'+movieDB_id).value,
    'backdrop_path':document.getElementById('backdrop_path-'+movieDB_id).value})
    
    }
    ).then(
        // Show toast notification
        alert_toast(`${name} added!`)
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