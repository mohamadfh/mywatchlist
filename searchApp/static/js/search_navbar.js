//import Send_Request from '/static/js/search.js'

let btn_navbar = document.getElementById('btn-navbar');
let field_search_navbar = document.getElementById('search-field-navbar');

field_search_navbar.addEventListener('keyup',function(event){
   
    if (event.key === 'Enter'){
        event.preventDefault();
        // Trigger the button element with a click
        btn_navbar.click();
    }
});

btn_navbar.addEventListener('click',function(){
    let data = field_search_navbar.value;
location.replace('/search/')
let field_search = document.getElementById('search-field');
console.log('dodshvuhfdsvhsfh',data)


});

