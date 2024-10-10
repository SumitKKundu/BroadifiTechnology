
gsap.registerPlugin(ScrollToPlugin);


    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        return formattedTime;
    }


    const chatContainer = document.getElementById('chatContainer');

    function chatContainerScroll(){
        let elementHeight = chatContainer.clientHeight; // or chatContainer.offsetHeight
        let scrollHeight = chatContainer.scrollHeight;


        if(scrollHeight > elementHeight){
           chatTone.play()
            // console.log('Element Height:', elementHeight);
            // console.log('Scroll Height:', scrollHeight);
            
            gsap.to(chatContainer, {
                scrollTo: {
                    y: chatContainer.scrollHeight,
                    // autoKill: false
                },
                duration: 10,
                ease: "circ.out",
            });
        }
    }


    let memberCards = document.querySelectorAll('.member--card');
    let chatTone = document.getElementById('chatTone');
    let memberTl = gsap.timeline();
    chatTone.play()
    memberCards.forEach((memberCard, index) => {
        let memberPic = memberCard.querySelector('.member--photo');
        let memberMsg = memberCard.querySelector('.member--msg');
    
        // Initial state
        gsap.set(memberPic, { scale: 0, transformOrigin: "center center" });
        gsap.set(memberMsg, { autoAlpha: 0, x: -10 });

        // Stagger the animations
        memberTl.to(memberCard, { display: 'inline-grid', onComplete: chatContainerScroll}, index * 2.5)
        memberTl.to(memberPic, { scale: 1}, ">")
        memberTl.to(memberMsg, { autoAlpha: 1, x: 0}, ">")
    });
    
   

    // let memberCards = document.querySelectorAll('.member--card');
    // memberCards.forEach((memberCard, index) => {
    //     let memberPic = memberCard.querySelector('.member--photo');
    //     let memberMsg = memberCard.querySelector('.member--msg');
    //     let memberTl = gsap.timeline({onComplete: () => console.log('done')});
        
    //     gsap.set(memberPic, { scale: 0 });
    //     gsap.set(memberMsg, { autoAlpha: 0, x: -10 });
    

        
    //     const memberAppearDelay = index * 400; 
    //     setTimeout(() => {
    //         memberCard.style.display = 'grid';
    //         console.log(memberCard, index);
    //         chatContainerScroll();
    //         console.log(memberAppearDelay)
    //         memberTl.to(memberPic, { scale: 1, delay: memberAppearDelay })
    //                 .to(memberMsg, { autoAlpha: 1, x: 0});
    //     }, memberAppearDelay);
        
        
        
    // });


   
    // const container = document.getElementById('chatContainer');

    //  memberCards.forEach((memberCard) => {
    //     let memberPic = memberCard.querySelector('.member--photo');
    //     let memberMsg = memberCard.querySelector('.member--msg');
    //     let memberTl = gsap.timeline();
        
    //     gsap.set(memberPic, { scale: 0 });
    //     gsap.set(memberMsg, { autoAlpha: 0, x: -10 });
    // });
    
    // const startAnimation = (memberCard, index) => {
    //     let memberPic = memberCard.querySelector('.member--photo');
    //     let memberMsg = memberCard.querySelector('.member--msg');
    //     let memberTl = gsap.timeline();
    
    //     const delay = index * 1;
    
    //     memberTl.to(memberPic, { scale: 1, delay: delay })
    //             .to(memberMsg, { autoAlpha: 1, x: 0});
    // };
    
    // // Create an intersection observer
    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach((entry) => {
    //         if (entry.isIntersecting) {
    //             // Start animation if the card is in the viewport
    //             const index = Array.from(memberCards).indexOf(entry.target);
    //             startAnimation(entry.target, index);
    //             // Stop observing the card after the animation starts
    //             observer.unobserve(entry.target);
    //         } else {
    //             // If not in viewport, scroll the container to the bottom
    //             gsap.to(container, {
    //                 scrollTo: { y: container.scrollHeight, autoKill: false },
    //                 duration: 1,
    //                 ease: 'power1.inOut'
    //             });
    //         }
    //     });
    // }, {
    //     root: container, // Set the container as the root
    //     threshold: 0.1 // Adjust this value to determine when to trigger the animation
    // });

    // // Observe each memberCard
    // memberCards.forEach((memberCard) => {
    //     observer.observe(memberCard);
    // });

    let msgSendBtn = document.querySelector('.cta--send');
    let msgInput = document.querySelector('.chat--input');

    let msgReplyCard = document.querySelector('.user-reply');
    let msgReplyTime = document.getElementById('user-reply-time');
    let msgReply = document.getElementById('user-reply-msg');

    let hRReplyCard = document.querySelector('.hr--reply');
    let ctaAttachment = document.querySelector('.cta--attachment');

    msgInput.addEventListener('input', function(){ // Remove leading spaces and non-letter characters
        msgInput.value = msgInput.value.replace(/^[\s]+/, '').replace(/[^a-zA-Z]/g, '');
    });
    
    msgSendBtn.addEventListener('click', function(){ // chat send button
        if(msgInput.value.toLowerCase() == msgInput.getAttribute('data-text').toLowerCase()){
            console.log('matched');
            chatContainerScroll();
            msgReplyCard.style.display = 'inline-grid';
            msgReplyTime.textContent = getCurrentTime();
            msgReply.textContent = msgInput.value;

            setTimeout(() => {
                chatContainerScroll();
                hRReplyCard.style.display = 'inline-grid';
                ctaAttachment.classList.add('focused');

            }, 500);
        }
        msgInput.value = '';
    });

    