/**
 * CERNE - Motor de Animação
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Inicializar Lenis (Física de Scroll)
    window.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time) {
        window.lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { window.lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0, 0);

    gsap.registerPlugin(ScrollTrigger);

    // 2. Animação Inicial (Hero Section)
    const tl = gsap.timeline();
    tl.to("#heroTitle", { opacity: 1, duration: 0.1 })
      .from("#heroTitle > div", { y: 100, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power4.out" })
      .to("#heroIntro", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8");

    // 3. Efeito de Revelação de Imagens (Cinematic Mask + Zoom Out)
    gsap.utils.toArray('.img-reveal-container').forEach(container => {
        const img = container.querySelector('img');
        const imgTl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top 85%", 
            }
        });
        
        imgTl.to(container, { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "power4.inOut" })
             .to(img, { scale: 1, duration: 1.5, ease: "power4.inOut" }, "<");
    });

    // 4. Fade-Up geral no scroll
    gsap.utils.toArray('.gs-fade-up').forEach(elem => {
        gsap.from(elem, {
            y: 40, 
            opacity: 0, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: { 
                trigger: elem, 
                start: "top 90%" 
            }
        });
    });
});