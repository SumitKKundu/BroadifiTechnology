gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

window.addEventListener('DOMContentLoaded', function() {
    // mobile menu
    this.document.querySelector('.btn--menuTgl').addEventListener('click', function(){
        if(document.querySelector('.broadifi--header-nav').classList.contains('hammenu-showing')){
            document.querySelector('.broadifi--header-nav').classList.remove('hammenu-showing')
            gsap.set('.broadifi--header-nav ul a', {
                opacity: 0,
                y: 10,
            }); 
        }
        else{
            document.querySelector('.broadifi--header-nav').classList.add('hammenu-showing');
            gsap.to('.broadifi--header-nav ul a', {
                opacity: 1,
                y: 0,
                stagger: 0.05,
            });
        }
    });
    
   
    // input file
    let inputFiles = document.querySelectorAll('.form-file')
    for (var i = 0, len = inputFiles.length; i < len; i++) {
        customInput(inputFiles[i])
    }

    // service accordian for mobile
    const serviceAccordianBtns = document.querySelectorAll(".broadifi--service-item > h5");

    [...serviceAccordianBtns].forEach(serviceAccordianBtn => {
        serviceAccordianBtn.addEventListener('click', () => {
            serviceAccordianBtn.parentElement.classList.toggle('is-actv');
        })
    });

    if (document.querySelector('.broadifi__bot')) {
        gsap.set('.broadifi__bot, .broadifi__bot ul', {
            scale: 0,
            transformOrigin: "bottom right"
        });
        gsap.set('.broadifi__bot svg', {
            y: 10,
            opacity: 0
        });
    }

    // PRELOADER ANIM
    if(document.querySelector('.broadifi__loader')){
        gsap.set(".broadifi__loader svg", {opacity: 0, y: 100} )
        gsap.set(".broadifi__loader .logoTMask, .broadifi__loader .logoBMask", { drawSVG: "0%"} )
    
        let preloaderTl = gsap.timeline({ 
            ease: "power1.out",
            // onComplete: loadAnims
        });
        preloaderTl.to(".broadifi__loader svg",  {opacity: 1, y: 0} )
        preloaderTl.to(".broadifi__loader .logoTMask", { drawSVG: "100%", duration:1})
        preloaderTl.to(".broadifi__loader .logoBMask", { drawSVG: "100%", duration:1, onComplete: loadAnims}); // call loadAnim() here;
        preloaderTl.to(".broadifi__loader svg",  {opacity: 0, y: 100, duration:0.5} )
        preloaderTl.to(".broadifi__loader",  {opacity: 0, y: "10%", zIndex: "-1"})
        preloaderTl.to(".broadifi__loader ~ header, .broadifi__loader ~ main, .broadifi__loader ~ footer", {opacity: 1, y: 0, duration:0.2, onComplete: loadChatBot, loadTeamAnim}, "<")
    }
    else{
        loadAnims(); 
        loadChatBot();
        loadTeamAnim();
    }

});


function customInput (el) {
    const fileInput = el.querySelector('.input-file')
    const label = el.querySelector('#upload-fileName')
    
    fileInput.onchange =
    fileInput.onmouseout = function () {
        if (!fileInput.value) return
        
        var value = fileInput.value.replace(/^.*[\\\/]/, '')
        el.className += ' -chosen'
        label.innerText = value
    }
}

function loadChatBot(){
    // CHATBOT
    if (document.querySelector('.broadifi__bot')) {
        gsap.to('.broadifi__bot', {opacity: 1})
        let botAppearTl = gsap.timeline({delay: 0.5});
        botAppearTl.to('.broadifi__bot', { scale: 1, duration: 0.3 });
        botAppearTl.to('.broadifi__bot svg', { y: 0, opacity: 1 }, "0.3");

        let botClickTl = gsap.timeline({ paused: true });
        botClickTl.to('.broadifi__bot ul', { scale: 1, duration: 0.2 });

        let isOpen = false;

        document.querySelector('.broadifi__bot').addEventListener('click', function () {
            if (!isOpen) {
                botClickTl.play(); // Play the second timeline
            } else {
                botClickTl.reverse(); // Reverse the second timeline
            }
            isOpen = !isOpen; // Toggle the state
        });
    }
}


function loadAnims(){

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

    if(document.querySelector('.broadifi__homeHero .doodles-svgs')){
        gsap.to(".broadifi__homeHero .doodles-svgs > span", {
            x: "random(-20, 25)",
            y: "random(-25, 20)",
            duration: 2,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
        });
    }

    gsap.to(".broadifi__careers-hero .posiB, .cloud--svg", {
        x: "random(20, 25)",
        y: "random(-25, 20)",
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
    });


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
        { drawSVG: "101% 101%" }, 
        { drawSVG: "0% 100%", duration: 0.15, stagger: 0.1, ease: "power1.out" }
        );

        svgLineAnimTl.to(svgElm.querySelectorAll('.pathWhite path'), 
            { opacity: 1, duration: 0.40, ease: "power2.out" }
        );

        svgLineAnimTl.fromTo(svgElm.querySelectorAll('.pathWhite path'), 
            { drawSVG: "101% 101%" }, 
            { drawSVG: "0% 100%", duration: 0.40, stagger: 0.1, ease: "power2.inOut" }
        );

        svgLineAnimTl.to(svgElm.querySelectorAll('.pathBlk path, .pathWhite path'), 
            { opacity: 0, duration: 0 }
        );
    });


    // LOGO REVEAL ANIM ON SCROLL
    if(document.querySelector('.broadifi__clientsLogo')){
    let mm = gsap.matchMedia();

        mm.add("(min-width: 1280px)", () => {
            let getExpandables = document.querySelectorAll('.broadifi__clientsLogo-grid .svg-expandable');

            [...getExpandables].forEach(getExpandable => {
                getExpandable.setAttribute('data-actual-width', getExpandable.scrollWidth);
                gsap.set(getExpandable, {
                    width: `${getExpandable.getAttribute('data-width')}px`
                });
            });
        
        
            getExpandables.forEach(getExpandable => {
                gsap.to(getExpandable, {
                    scrollTrigger: {
                        trigger: '.broadifi__clientsLogo',
                        start: 'top 80%',
                        end: '+=200',
                        scrub: 1,
                        //markers: true,
                    },
                    width: `${getExpandable.getAttribute('data-actual-width')}px`
                });
            });
        });

        mm.add("(max-width: 1279px)", () => {
            let figs = ".broadifi__clientsLogo-grid > *";
            gsap.set(figs, {opacity: 0, y: 10});

            ScrollTrigger.batch(figs, {
                onEnter: figs => gsap.to(figs, {opacity: 1, y: 0, duration: 1, stagger: 0.25, overwrite: true}),
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
                    start: 'top 90%'
                }
            });
        }
    });


    // VALUES ARW ANIM
    if (document.querySelector('.broadifi__values')) {
        let mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {

            gsap.set(".broadifi__values .dotted-arw .dotPath, .broadifi__values .dotted-arw .arwPath", { 
                drawSVG: "0%" 
            });
        
            function createArrowAnimation(triggerSelector, dotPaths, arwPaths) {
                let dottedArwPathAnimTl = gsap.timeline({ 
                    ease: "power3",
                    scrollTrigger: {
                        trigger: triggerSelector,
                        start: 'top 85%',
                        end: 'bottom 15%', // Initial end position
                        //markers: true,
                        // toggleActions: "play reset play reset",
                        // onEnterBack: function() {
                        //     // Change start and end dynamically when entering back
                        //     this.start = "center center";  // New start position
                        //     // this.end = "bottom 5%";   // New end position
                        //     this.refresh(); // Refresh to apply the changes
                        // }
                    }
                });
        
                dottedArwPathAnimTl.to(dotPaths, { drawSVG: "100%", duration: 1 });
                dottedArwPathAnimTl.to(arwPaths, { drawSVG: "100%", duration: 0.25 });
        
                return dottedArwPathAnimTl;
            }
        
            // Animation for the first set of arrows
            createArrowAnimation(
                '.broadifi__value-item:nth-child(1)',
                ".dotted-arw--1 .dotPath, .dotted-arw--2 .dotPath",
                ".dotted-arw--1 .arwPath, .dotted-arw--2 .arwPath"
            );
        
            // Animation for the second set of arrows
            createArrowAnimation(
                '.broadifi__value-item:nth-child(4)',
                ".dotted-arw--3 .dotPath, .dotted-arw--4 .dotPath, .dotted-arw--5 .dotPath",
                ".dotted-arw--3 .arwPath, .dotted-arw--4 .arwPath, .dotted-arw--5 .arwPath"
            );
        });

        mm.add("(max-width: 767px)", () => {
            gsap.to('.broadifi__values--items .circle-highlther', {
                top: '80%',
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.broadifi__values--items',
                    start: 'top 80%',
                    scrub: 1,
                // markers: true
                }
            })
            let valuePaths = document.querySelectorAll('.broadifi__value-item figure');

            [...valuePaths].forEach(valuePath => {
                gsap.fromTo(valuePath.querySelectorAll('path'), {drawSVG: "0%"}, {drawSVG: "-100%", stagger: 0.3, duration: 0.5, repeat: -1, repeatDelay: 0.2});
            });
            
        });
    }

    // if(document.querySelector('.broadifi__values')){
    //     gsap.set(".broadifi__values .dotted-arw .dotPath, .broadifi__values .dotted-arw .arwPath",{ 
    //         drawSVG: "0%" 
    //     });
        
    //     // gsap.set('.broadifi__value-item', {
    //     //     autoAlpha: 0
    //     // })

    //     let dottedArwPathAnimTlT = gsap.timeline({ 
    //         ease: "power3",
    //         scrollTrigger: {
    //             trigger: '.broadifi__value-item:nth-child(1)',
    //             start: 'top 85%',
    //             // markers: true
    //         }
    //     });

    //     dottedArwPathAnimTlT.to(".dotted-arw--1 .dotPath, .dotted-arw--2 .dotPath", {drawSVG: "100%", duration: 1});
    //     dottedArwPathAnimTlT.to(".dotted-arw--1 .arwPath, .dotted-arw--2 .arwPath", {drawSVG: "100%", duration: 0.25});

        
    //     let dottedArwPathAnimTlB = gsap.timeline({ 
    //         ease: "power3",
    //         scrollTrigger: {
    //             trigger: '.broadifi__value-item:nth-child(4)',
    //             start: 'top 85%',
    //             //markers: true
    //         }
    //     });
        
    //     // dottedArwPathAnimTl.to(".broadifi__value-item:nth-child(1)", {autoAlpha: 1, duration: 0.2});
    //     // dottedArwPathAnimTl.to(".broadifi__value-item:nth-child(2)", {autoAlpha: 1, duration: 0.2});
    //     // dottedArwPathAnimTl.to(".broadifi__value-item:nth-child(3)", {autoAlpha: 1, duration: 0.2});
    //     // dottedArwPathAnimTl.to(".dotted-arw--3 .dotPath", {drawSVG: "100%", duration: 2.5});
    //     // dottedArwPathAnimTl.to(".broadifi__value-item:nth-child(5)", {autoAlpha: 1, duration: 0}, "-=0.5"); // Check if this is desired
    //     // dottedArwPathAnimTl.to(".dotted-arw--3 .arwPath", {drawSVG: "100%", duration: 0.2});
    //     // dottedArwPathAnimTl.to(".dotted-arw--4 .dotPath", {drawSVG: "100%", duration: 2.5});
    //     // dottedArwPathAnimTl.to(".broadifi__value-item:nth-child(4)", {autoAlpha: 1, duration: 0.2}, "+=0.1"); // Just use "+=0.1"
    //     // dottedArwPathAnimTl.to(".dotted-arw--4 .arwPath", {drawSVG: "100%", duration: 0.2});
    //     // dottedArwPathAnimTl.to(".dotted-arw--5 .dotPath", {drawSVG: "100%", duration: 2.5});
    //     // dottedArwPathAnimTl.to(".dotted-arw--5 .arwPath", {drawSVG: "100%", duration: 0.2});
        
        
    //     dottedArwPathAnimTlB.to(".dotted-arw--3 .dotPath, .dotted-arw--4 .dotPath, .dotted-arw--5 .dotPath", {drawSVG: "100%", duration: 1});
    //     dottedArwPathAnimTlB.to(".dotted-arw--3 .arwPath, .dotted-arw--4 .arwPath, .dotted-arw--5 .arwPath", {drawSVG: "100%", duration: 0.25});
    // }


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
        spaceBetween: 30,
        loop: true,

        autoplay: {
        delay: 5000,
        },

    speed: 1500,

        pagination: {
        el: '.testimoni_swiper--pagination',
        clickable: true
        },

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


        // MaskPath animation sequence
        let maskPathAnim = gsap.timeline({ repeat: -1});

        maskPathAnim
            .to(".arw-svg .maskPath", { drawSVG: "100%", duration: 1, autoAlpha: 1 })
            .to(".arw-svg .maskPath", { drawSVG: "0%", duration: 0, autoAlpha: 0, delay: 3})

            testimoniAnimTl.add(maskPathAnim, "<");
    }


    // DOTTED ARW SVG ANIM
    let dottedArwSvgs = document.querySelectorAll('.dotted-arw-svg');

    dottedArwSvgs.forEach((dottedArwSvg) => {
        gsap.set(dottedArwSvg.querySelector('.maskArwPath'), { drawSVG: "0%"});

        let arwSvgAnimTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        
        arwSvgAnimTl.to(dottedArwSvg.querySelector('.maskArwPath'), { drawSVG: "100%", duration: 1});
    });


    // MSG ICON SVG ANIM
    let msgSvgs = document.querySelectorAll('.msg--svg');

    msgSvgs.forEach((msgSvg, index) => {
        const msgSvgsAnimTl = gsap.timeline({
            delay: index * 0.5,
        });

        let msgLinePaths = msgSvg.querySelectorAll('.msgLinePath');
        msgLinePaths.forEach((path) => {
            gsap.set(path, { drawSVG: "0%" });
        });

        let msgLinePaths1 = msgSvg.querySelectorAll('.msgLinePath:not(.msgLinePathReverse)');
        let msgLinePaths2 = msgSvg.querySelectorAll('.msgLinePath.msgLinePathReverse');

        // Add animations to the timeline
        msgSvgsAnimTl.to(msgLinePaths1, { drawSVG: "-100%", stagger: 0.3, duration: 0.5, repeat: -1, repeatDelay: 1 })
        msgSvgsAnimTl.to(msgLinePaths2, { drawSVG: "100%", stagger: 0.3, duration: 0.5, repeat: -1, repeatDelay: 1 }); // Start at the same time as the first animation
    });




    // ANIMATION COUNTER
    let animateCounters = document.querySelectorAll('.animate-counter');

    [...animateCounters].forEach((animateCounter) => {
        let start = parseInt(animateCounter.getAttribute('data-start'), 10);
        let end = parseInt(animateCounter.getAttribute('data-end'), 10);

        gsap.fromTo(animateCounter, 
            { innerText: start }, 
            { 
                innerText: end, 
                duration: 1,
                snap: { innerText: 1 },
                ease: "power1.out",
                onUpdate: () => {
                    animateCounter.innerText = `${Math.round(animateCounter.innerText)}+`;
                },
                scrollTrigger: {
                    trigger: animateCounter,
                    start: "top 80%",
                }
            }
        );
    });



    // TEAM
    // let memberCards = document.querySelectorAll('.member--card');
    // memberCards.forEach((memberCard, index) => {
    //     let memberPic = memberCard.querySelector('.member--photo');
    //     let memberMsg = memberCard.querySelector('.member--msg');
    //     let memberTl = gsap.timeline();
        
    //     gsap.set(memberPic, { scale: 0 });
    //     gsap.set(memberMsg, { autoAlpha: 0, x: -10 });
    

    //     const delay = index * 1; 
    
    //     memberTl.to(memberPic, { scale: 1, delay: delay })
    //             .to(memberMsg, { autoAlpha: 1, x: 0});
    // });


} // end load anim function

