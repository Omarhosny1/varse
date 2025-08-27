let menu = document.getElementById('menu-toggle');
let list = document.getElementById('list');

menu.onclick = function(){  
    menu.classList.toggle('active');
    list.classList.toggle('active');
}

// animation scroll
function animation(sectionSelector, cardSelector){
let features = document.getElementById(sectionSelector);
window.onscroll = function() {
    let value = scrollY;
    let offset = features.offsetTop;
    if(value >= offset - 650){
        document.querySelectorAll(cardSelector).forEach(card =>{
            card.classList.add("animate");
        });
    }
};
window.addEventListener("scroll", onscroll);
onscroll();
}
animation("feature-card", ".feature-card");
animation("appscreen", ".appscreen");
animation("tech-category", ".tech-category");
animation("team-member", ".team-member");

window.removeEventListener("scroll",onscroll);

// Function to activate links while scrolling
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)



