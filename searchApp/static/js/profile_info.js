let darkModeBox = document.getElementById('dark-mode')
let privateBox = document.getElementById('private')

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

// Get info and show it
fetch(`${BASE_URL}get-profile-info/`, {
    method:'GET', 
    headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
    }
}).then((res)=>res.json()).then((data)=>{
darkModeBox.checked = data.darkMode
privateBox.checked = data.private

})


function updateProfileSetting(){
    fetch(`${BASE_URL}get-profile-info/`, {
        method:'POST', 
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({"darkMode":document.getElementById('dark-mode').checked,
         "private":document.getElementById('private').checked,
         "user":document.getElementById('username').value
    })
    }).then(()=>{
        alert_toast('Setting got Updated')
    })
}


