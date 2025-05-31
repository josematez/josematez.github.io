function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Timeline animation
function checkTimelineVisibility() {
    const timelineContents = document.querySelectorAll('.timeline-content');
    const triggerBottom = window.innerHeight * 0.8;

    timelineContents.forEach(content => {
        const contentTop = content.getBoundingClientRect().top;
        
        if (contentTop < triggerBottom) {
            content.classList.add('visible');
        }
    });
}

// Initial check and scroll event listener
document.addEventListener('DOMContentLoaded', () => {
    checkTimelineVisibility();
    window.addEventListener('scroll', checkTimelineVisibility);
});


