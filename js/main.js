/**
 * CERNE - Lógica Principal de UI
 */

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById('menuToggle');
    const fullScreenMenu = document.getElementById('fullScreenMenu');
    const navbar = document.getElementById('navbar');

    if (menuToggle && fullScreenMenu && navbar) {
        // Toggle do Menu
        menuToggle.addEventListener('click', () => {
            const isActive = fullScreenMenu.classList.toggle('active');
            navbar.classList.toggle('menu-open');
            
            if (isActive) {
                window.lenis && window.lenis.stop();
                navbar.style.color = '#ffffff'; 
            } else {
                window.lenis && window.lenis.start();
                navbar.style.color = 'var(--nav-text)';
            }
        });

        // Fechar o menu ao clicar num link
        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', () => {
                fullScreenMenu.classList.remove('active');
                navbar.classList.remove('menu-open');
                window.lenis && window.lenis.start();
                navbar.style.color = 'var(--nav-text)';
            });
        });
    }
});