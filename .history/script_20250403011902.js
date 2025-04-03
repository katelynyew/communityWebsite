const tl = gsap.timeline({defaults: {ease: 'power1.out'}});


// tl.to('.slider', {y: "-100%", duration: 1.5, delay: 0.5});
// tl.to(".intro", {y: "-100%", duration: 1}, "-=1");  /*   -=1 means start one sec faster*/
// tl.fromTo("nav", {opacity: 0}, {opacity: 1, duration: 1});
// tl.fromTo(".big-text", {opacity: 0}, {opacity: 1, duration: 1});

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    const contentHolderHeight = document.querySelector(".content-holder").offsetHeight;
    const imgHolderHeight = window.innerHeight;
    const additionalScrollHeight = window.innerHeight;
    

    const totalBodyHeight = contentHolderHeight + imgHolderHeight + additionalScrollHeight;
    document.body.style.height = `${totalBodyHeight}px`;
});

// Reset the page when it loads
window.addEventListener('load', () => {
    // Reset any GSAP animations or properties
    gsap.set("nav", { opacity: 0 });  // Set nav to invisible
    gsap.set(".header", { opacity: 1 });  // Reset header to visible
    gsap.set(".website-content", { position: 'absolute', top: 'auto' });  // Reset the position of website content

    // Ensure ScrollTrigger resets
    ScrollTrigger.refresh();
});

// Initially set the nav to be invisible
gsap.set("nav", { opacity: 0 });

// ScrollTrigger to fade in the nav after scrolling past the website-content section
gsap.to("nav", {
    opacity: 1,  // Fade in the nav
    scrollTrigger: {
        trigger: ".website-content",  // Trigger after the website-content section
        start: "bottom top",  // Start when the bottom of .website-content hits the top of the viewport
        end: "bottom top",  // Continue for the entire scroll of website-content
        
        markers: false,  // Optional: Remove if you don't need markers
        toggleActions: "play none none reverse", // Re-trigger on scroll
    }
});

// ScrollTrigger to fade out the nav after scrolling back up
gsap.to("nav", {
    opacity: 0,  // Fade out the nav
    scrollTrigger: {
        trigger: ".website-content",  // Trigger after the website-content section
        start: "top top",  // Start when the top of .website-content hits the top of the viewport
        end: "+=100%",  // Continue for the entire scroll of website-content
        scrub: 0.5,
        markers: false,  // Optional: Remove if you don't need markers
        toggleActions: "reverse none none play", // Re-trigger on scroll
    }
});

// ScrollTrigger for fading out header
gsap.to(".big-text", {
    opacity: 0,  // Fade out
    scrollTrigger: {
        trigger: ".website-content",
        start: "top top",  // Start fading out when the top of the website-content reaches the top of the viewport
        end: "+=100%",  // Keep fading out while scrolling further
        scrub: 1,  // Smooth transition based on scroll
        onEnter: () => gsap.to(".big-text", { opacity: 0, duration: 0.5 }),
        onLeaveBack: () => gsap.to(".big-text", { opacity: 1, duration: 0.5 }),  // Fade in when scrolling back
   
    }
});

gsap.to("#logo-img2", {
    y: "-200px", // Move the title up
    duration: 1,
    ease: "power1.out",
    scrollTrigger: {
        trigger: ".website-content", 
        start: "top top", // Start when .title is near the top of the viewport
        end: "+=100%", // End when it reaches this position
        scrub: 1, // Smooth animation
        markers: false // Set to true if you want to see scroll markers
    }
});

ScrollTrigger.create({
    trigger: ".website-content",
    start: "-0.1% top",
    end: "bottom bottom",
    onEnter: () => {
        gsap.set(".website-content", { position: 'fixed', top: '0' });
    },
    
    onLeaveBack: () => {
        gsap.set(".website-content", { position: 'absolute', top: 'auto' });
    }

});



gsap.to(".img-holder", {
    //scale: 1,
    rotation: 0,
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    ease: "power2.inOut",
    trigger: ".img-holder",
    scrollTrigger: {
        start: "top top",
        end: `+=200%`,
        scrub: 1,
        
    }
});

ScrollTrigger.create({
    trigger: ".img-holder",
    start: "top top",
    end: "+=200%",
    pin: true,
    anticipatePin: 1,
    onLeave: () => {
        gsap.set(".website-content", { position: "absolute", top: "auto" }); // Unpin the image
    },
    onLeaveBack: () => {
        gsap.set(".website-content", { position: "absolute", top: "auto" }); // Ensure the image scrolls back properly
    }
    
});

// gsap.to(".header .letters:first-child", {
//     x: () => -innerWidth *3,
//     scale: 10,
//     ease: "power2.inOut",
//     scrollTrigger: {
//         start: "top top",
//         end: `+=200%`,
//         scrub: 1
//     }
// });
// gsap.to(".header .letters:last-child", {
//     x: () => innerWidth *3,
//     scale: 10,
//     ease: "power2.inOut",
//     scrollTrigger: {
//         start: "top top",
//         end: `+=200%`,
//         scrub: 1
//     }
// });