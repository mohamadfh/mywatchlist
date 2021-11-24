let bookmarkImportBtn = document.getElementById('bookmark-import')
let watchedImportBtn = document.getElementById('watched-import')
let username = document.getElementById('username-friend').value
let friend_name = document.getElementById('friend-name').value

bookmarkImportBtn.addEventListener('click',()=>{
    if(confirm('Are You sure you want to import '+friend_name+' movies?')){
       importMovies('bookmark')  
    }
   
})

watchedImportBtn.addEventListener('click',()=>{
    if(confirm('Are You sure you want to import '+friend_name+' movies?')){
        importMovies('watched')  
     }})



function importMovies(type){
    console.log(username,type)
    fetch(`/api/import/`, {
        method:'POST', 
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({
            "username_friend":username,
            "type":type
        })
    }).then(()=>{
        alert_toast(friend_name+"'s movies has been imported!")
    })
}