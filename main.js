let menu = document.getElementById('menu-toggle');
let list = document.getElementById('list');

menu.onclick = function(){  
    menu.classList.toggle('active');
    list.classList.toggle('active');
}