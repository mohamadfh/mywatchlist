let id_movie = document.getElementById('id-movie').value
let media_type = document.getElementById('media_type').value
let loading_gif = document.getElementById('loading-gif')
let container_detail = document.getElementById('container-detail')
const API_KEY = 'b807e5f9454227525cea99c772a74b7d'
const yt_api_key = 'AIzaSyDzdWTfIWxZD9gkguQG-tcbehXmatfikGA';


fetch(`https://api.themoviedb.org/3/${media_type}/${id_movie}?api_key=${API_KEY}&append_to_response=images,external_ids,credits,similar`).then(
    (e)=>e.json()
).then(
    (data)=>{
        loading_gif.style.display = 'none'
        console.log(data)
        renderWPApi(data)
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

function extractyear(inp){
    inp = inp.split("-");
    return inp[0];
}

function renderWPApi(data){
    let title = ""
    if(data.title){
        title=data.title + `%20${extractyear(data.release_date)}`
    }
    else{
        title=data.name + `%20${extractyear(data.first_air_date)}` // add year to search keyword to make it more accurate
    }
    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${title}%20${media_type}&format=json&srlimit=1&origin=*`).then(
    (e)=>e.json()
).then(
    (resjson)=>{
        console.log(resjson);
        data.wpid = resjson.query.search[0].pageid;
        //console.log(resjson.query.search[0].pageid)
        renderYTApi(data)
    }).catch(
        (er)=>{
            renderYTApi(data)
    }
    )
}

function renderYTApi(data){
    let title = ""
    if(data.title){title=data.title}
    else{title=data.name}
    fetch(`https://youtube.googleapis.com/youtube/v3/search?maxResults=1&q=${title}%20trailer&key=${yt_api_key}`).then(
          (e)=>e.json()
    ).then(
            (resjson)=>{

            data.ytvidid = resjson.items['0'].id.videoId;
            console.log(data.ytvidid)
            renderComments(data)
    }
    ).catch(
        (er)=>{
            renderHTML(data)
            return er
    }
    )
}
function renderComments(data){
        fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=10&videoId=${data.ytvidid}&order=relevance&key=${yt_api_key}`).then(
          (e)=>e.json()
    ).then(
            (resjson)=>{
            data.ytcomments = resjson.items;
            console.log(data.ytcomments[0].snippet.topLevelComment.snippet);
            renderHTML(data)
    }
    ).catch(
        (er)=>{
            renderHTML(data)
            return er
    }
    )
}



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