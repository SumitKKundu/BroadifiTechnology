// window.addEventListener('DOMContentLoaded', function() {
//     this.alert(1)
// });

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);


// PRELOADER ANIM
if(document.querySelector('.broadifi__preloader')){
    gsap.set(".broadifi__preloader .logoTMask, .broadifi__preloader .logoBMask", { drawSVG: "0%"} )
    gsap.set(".broadifi__preloader svg", {opacity: 0, y: 100} )
    let preloaderTl = gsap.timeline({ ease: "power1.out",});
    preloaderTl.to(".broadifi__preloader svg",  {opacity: 1, y: 0} )
    preloaderTl.to(".broadifi__preloader .logoTMask", { drawSVG: "100%", duration:1})
    preloaderTl.to(".broadifi__preloader .logoBMask", { drawSVG: "100%", duration:1})
    preloaderTl.to(".broadifi__preloader svg",  {opacity: 0, y: 100, duration:0.5} )
    preloaderTl.to(".broadifi__preloader",  {opacity: 0, y: "10%"})
    preloaderTl.to("body > *:not(.broadifi__preloader)", {opacity: 1, y: 0, duration:0.2}, "<")
}


// TEXT FLIP ANIM
if(document.querySelector('.flip-words')){
    let flipTxtAminTl = gsap.timeline({ repeat: -1, ease: "power4.inOut" });
    let targets = document.querySelectorAll(".flip-words > *");
    let numberOfTargets = targets.length;
    let duration = 0.3;
    let pause = 1.4;
    let stagger = duration + pause;
    let repeatDelay = stagger * (numberOfTargets - 1) + pause;

    gsap.set(".flip-words", { autoAlpha: 1 });
    
    flipTxtAminTl.from(targets, {
        y: '100%',
        duration: duration,
        opacity: 0,
        stagger: {
            each: stagger,
            repeat: -1,
            repeatDelay: repeatDelay
        }
    })
    .to(targets, {
            y: "-100%",
            duration: duration,
            opacity: 0,
            stagger: {
                each: stagger,
                repeat: -1,
                repeatDelay: repeatDelay
            }
        },
        stagger
    );
}


// TECHNOLOGY MOVEMENT ANIM
if(document.querySelector('.technology-logs')){
    gsap.to(".technology-logs > span", {
        x: "random(-20, 25)",
        y: "random(-25, 20)",
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
    });
}

// LINE DRAW ANIM
const svgElements = document.querySelectorAll('.line-svg svg');

svgElements.forEach(svgElm => {
    let svgLineAnimTl = gsap.timeline({ repeat: -1, repeatDelay: 0.1 });

    // Setting initial states
    gsap.set(svgElm.querySelectorAll('.pathWhite path'), { opacity: 0 });
    gsap.set(svgElm.querySelectorAll('.pathBlk path'), { opacity: 0, drawSVG: "100% 100%" });

    // Animation sequence
    svgLineAnimTl.to(svgElm.querySelectorAll('.pathBlk path'), 
        { opacity: 1, ease: "power2.out" }
    );

    svgLineAnimTl.fromTo(svgElm.querySelectorAll('.pathBlk path'), 
      { drawSVG: "100% 100%" }, 
      { drawSVG: "0% 100%", duration: 0.15, stagger: 0.1, ease: "power1.out" }
    );

    svgLineAnimTl.to(svgElm.querySelectorAll('.pathWhite path'), 
        { opacity: 1, duration: 0.40, ease: "power2.out" }
    );

    svgLineAnimTl.fromTo(svgElm.querySelectorAll('.pathWhite path'), 
        { drawSVG: "100% 100%" }, 
        { drawSVG: "0% 100%", duration: 0.40, stagger: 0.1, ease: "power2.inOut" }
    );

    svgLineAnimTl.to(svgElm.querySelectorAll('.pathBlk path, .pathWhite path'), 
        { opacity: 0, duration: 0 }
    );
});


// LOGO REVEAL ANIM ON SCROLL
if(document.querySelector('.broadifi__projectsLogo')){
    let getExpandables = document.querySelectorAll('.broadifi__projectsLogo-grid .svg-expandable');

    [...getExpandables].forEach(getExpandable => {
        getExpandable.setAttribute('data-actual-width', getExpandable.scrollWidth);
        gsap.set(getExpandable, {
            width: `${getExpandable.getAttribute('data-width')}px`
        });
    });


    getExpandables.forEach(getExpandable => {
        gsap.to(getExpandable, {
            scrollTrigger: {
                trigger: '.broadifi__projectsLogo',
                start: 'top 75%',
                end: '+=200',
                scrub: 1,
                // markers: true,
            },
            width: `${getExpandable.getAttribute('data-actual-width')}px`
        });
    });
}


// SECTION HEADING ANIM
const sectionHeadings = document.querySelectorAll('.broadifi--section-heading');

sectionHeadings.forEach(heading => {
    const gradText = heading.querySelector('.grad--txt');

    if (gradText) {
        gsap.set(gradText, { yPercent: 200 });

        gsap.to(gradText, {
            yPercent: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: heading,
                start: 'top 80%'
            }
        });
    }
});


// VALUES ARW ANIM
if(document.querySelector('.broadifi__values')){
    gsap.set(".dotPath, .arwPath",{ 
        drawSVG: "0%" 
    });
    
    // gsap.set('.broadifi__value-item', {
    //     autoAlpha: 0
    // })
    
    let dottedArwPathAnimTl = gsap.timeline({ 
        ease: "power3",
        scrollTrigger: {
            trigger: '.broadifi__value-item:nth-child(4)',
            start: 'top 70%',
            //markers: true
        }
    });
    
    // dottedArwPathAnimTl.to(".broadifi__value-item:nth-child(1)", {autoAlpha: 1, duration: 0.2});
    // dottedArwPathAnimTl.to(".broadifi__value-item:nth-child(2)", {autoAlpha: 1, duration: 0.2});
    // dottedArwPathAnimTl.to(".broadifi__value-item:nth-child(3)", {autoAlpha: 1, duration: 0.2});
    // dottedArwPathAnimTl.to(".dotted-arw--3 .dotPath", {drawSVG: "100%", duration: 2.5});
    // dottedArwPathAnimTl.to(".broadifi__value-item:nth-child(5)", {autoAlpha: 1, duration: 0}, "-=0.5"); // Check if this is desired
    // dottedArwPathAnimTl.to(".dotted-arw--3 .arwPath", {drawSVG: "100%", duration: 0.2});
    // dottedArwPathAnimTl.to(".dotted-arw--4 .dotPath", {drawSVG: "100%", duration: 2.5});
    // dottedArwPathAnimTl.to(".broadifi__value-item:nth-child(4)", {autoAlpha: 1, duration: 0.2}, "+=0.1"); // Just use "+=0.1"
    // dottedArwPathAnimTl.to(".dotted-arw--4 .arwPath", {drawSVG: "100%", duration: 0.2});
    // dottedArwPathAnimTl.to(".dotted-arw--5 .dotPath", {drawSVG: "100%", duration: 2.5});
    // dottedArwPathAnimTl.to(".dotted-arw--5 .arwPath", {drawSVG: "100%", duration: 0.2});
    
    
    dottedArwPathAnimTl.to(".dotPath", {drawSVG: "100%", duration: 1});
    dottedArwPathAnimTl.to(".arwPath", {drawSVG: "100%", duration: 0.25});
}


if(document.querySelector('.gear-svg')){
    gsap.to('.circlePath', {
        rotate: -360,
        transformOrigin: 'center',
        ease: "linear",
        duration: 2.5,
        repeat: -1
    })
    
    gsap.to('.gearPath', {
        rotate: 360,
        transformOrigin: 'center',
        ease: "linear",
        duration: 2,
        repeat: -1
    })
}



// TESTIMONIAL SLIDER
const testimoni_swiper = new Swiper('.testimoni_swiper', {

    autoplay: {
        delay: 3000,
    },

    // If we need pagination
    pagination: {
      el: '.testimoni_swiper--pagination',
      clickable: true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.testimoni_swiper-nav--next',
      prevEl: '.testimoni_swiper-nav--prev',
    },
  });
  

// TESTIMONIAL ANIM
if (document.querySelector('.broadifi__testimonials')) {
    gsap.set(".maskPath", { 
        drawSVG: "0%", 
        autoAlpha: 1 
    });

    gsap.set(".doodles-svg figure.posi-LT img, .doodles-svg figure.posi-LB img", { 
        y: 100,
        x: 100,
        autoAlpha: 0 
    });

    gsap.set(".doodles-svg figure.posi-RT img, .doodles-svg figure.posi-RB img", { 
        y: 100,
        x: -100,
        autoAlpha: 0 
    });

    let testimoniAnimTl = gsap.timeline({ 
        ease: "power3",
        scrollTrigger: {
            trigger: '.broadifi__testimonials',
            start: 'top 70%',
            // markers: true
        }
    });

    testimoniAnimTl.to(".doodles-svg figure img", {y: 0, x: 0, autoAlpha: 1});

    testimoniAnimTl.to(".doodles-svg figure", {
        x: "random(-20, 25)",
        y: "random(-25, 20)",
        duration: 2,
        ease: "power3",
        repeat: -1,
        yoyo: true,
    });
    
    // MaskPath animation sequence
    let maskPathAnim = gsap.timeline({ repeat: -1});

    maskPathAnim
        .to(".maskPath", { drawSVG: "100%", duration: 1, autoAlpha: 1 })
        .to(".maskPath", { drawSVG: "0%", duration: 0, autoAlpha: 0, delay: 3})

        testimoniAnimTl.add(maskPathAnim, "<");
}


// ACCORDIAN
const accordionBtns = document.querySelectorAll(".accordion-trigger");

[...accordionBtns].forEach(accordionBtn => {
    accordionBtn.addEventListener('click', () => {
        const activePanelIsOpened = accordionBtn.getAttribute("aria-expanded");

        if (activePanelIsOpened === "true") {
          accordionBtn.setAttribute("aria-expanded", false);
          accordionBtn.nextElementSibling.setAttribute("aria-hidden", true);
        } 
        else {
          accordionBtn.setAttribute("aria-expanded", true);
          accordionBtn.nextElementSibling.setAttribute("aria-hidden", false);
        }
    })
});


// TESTIMONIAL ANIM
if (document.querySelector('.broadifi__faqs')) {
    let testimoniAnimTl = gsap.timeline({ 
        ease: "power3",
        scrollTrigger: {
            trigger: '.broadifi__faqs',
            start: 'top 70%',
            // markers: true
        }
    });


    // testimoniAnimTl.to(".doodles-svgs span:not(.arw-svg)", {
    //     x: "random(-20, 25)",
    //     y: "random(-25, 20)",
    //     duration: 1,
    //     ease: "power3",
    //     repeat: -1,
    //     yoyo: true,
    // });
    
    // MaskPath animation sequence
    let maskPathAnim = gsap.timeline({ repeat: -1});

    maskPathAnim
        .to(".arw-svg .maskPath", { drawSVG: "100%", duration: 1, autoAlpha: 1 })
        .to(".arw-svg .maskPath", { drawSVG: "0%", duration: 0, autoAlpha: 0, delay: 3})

        testimoniAnimTl.add(maskPathAnim, "<");
}
