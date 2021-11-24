Handlebars.registerHelper('getGalleryNumber',function(images){
    return images.backdrops.length
})

Handlebars.registerHelper('getDirector',function(credits){
    let crew = credits.crew
    let Director = ''
    for(let i=0;i<crew.length;i++){
        if(crew[i].job == "Director" || crew[i].job == "Series Director")
        Director = crew[i].name
    }
    return Director
})

Handlebars.registerHelper('getDirectorUrl',function(credits){
    let crew = credits.crew
    let Directorid = ''
    for(let i=0;i<crew.length;i++){
        if(crew[i].job == "Director" || crew[i].job == "Series Director")
        Directorid = crew[i].id
    }
    return '/search/person/'+Directorid
})


Handlebars.registerHelper('getInfoCrew',getInfoHandelbarCrew)
function getInfoHandelbarCrew(movieDB_id){
    
    
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
                document.getElementById('watched-crew-'+movieDB_id).checked = true;
               } 
               if(movie.bookmark){
                document.getElementById('bookmark-crew-'+movieDB_id).checked = true;

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


Handlebars.registerHelper('getInfoCast',getInfoHandelbarCast)
function getInfoHandelbarCast(movieDB_id){
    
    
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
                document.getElementById('watched-cast-'+movieDB_id).checked = true;
               } 
               if(movie.bookmark){
                document.getElementById('bookmark-cast-'+movieDB_id).checked = true;

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

Handlebars.registerHelper('getDetailUrlPerson',function(id){
    let url = '/search/person/'+id
    
        return url
    })


    Handlebars.registerHelper('known_for_departmentFilter',function(job,known_for_department){
        let value = false
        let known_for_department2 = document.getElementById('known_for_department-id').value
        if(known_for_department2=='Directing'){
            if(job=='Director'){
                value=true
            }
        }
        return value
    })