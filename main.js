let menu = document.getElementById('menu-toggle');
let list = document.getElementById('list');

menu.addEventListener('click', ()=>{
    menu.classList.toggle('active');
    list.classList.toggle('active');
})

document.querySelectorAll('#list a').forEach(link => {
    link.addEventListener('click', ()=>{
        menu.classList.remove('active');
        list.classList.remove('active');
    });
});

// Smooth scroll to section
        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }