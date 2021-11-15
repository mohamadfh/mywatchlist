let id_movie = document.getElementById('id-movie').value
let media_type = document.getElementById('media_type').value
const API_KEY = 'b807e5f9454227525cea99c772a74b7d'
let loading_gif = document.getElementById('loading-gif') 
let container_detail = document.getElementById('container-detail')

fetch(`https://api.themoviedb.org/3/${media_type}/${id_movie}?api_key=${API_KEY}&append_to_response=images`).then(
    (e)=>e.json()
).then(
    (data)=>{
        loading_gif.style.display = 'none'
        console.log(data)
        renderHTML(data)
        // Change the title of the page
        let title = ''
        if(data.title){title=data.title}
        else{title=data.name}
        document.title = title

        // Quering for movie crdict for people
        if(media_type == 'person'){
            renderMoviePerson(data.id)
        }
    }
)




function renderHTML(data){
    let rawTemplate = document.getElementById('titleTemplate').innerHTML;
    let compiledTemplate = Handlebars.compile(rawTemplate);
    let generetedHTML = compiledTemplate(data);
    container_detail.innerHTML = generetedHTML;
   
    };


function renderMoviePerson(id){
fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}`).then(
    (e)=>e.json()
).then(
    (data)=>{
console.log(data)
renderMoviePersonHTML(data)
    })
}


function renderMoviePersonHTML(data){
    let rawTemplate = document.getElementById('titleTemplate2').innerHTML;
    let compiledTemplate = Handlebars.compile(rawTemplate);
    let generetedHTML = compiledTemplate(data);
    document.getElementById('container-movie-person').innerHTML = generetedHTML; 
}
