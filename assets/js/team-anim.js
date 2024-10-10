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


function chatContainerScroll(){
    chatTone.play()
    let elementHeight = chatContainer.clientHeight; // or chatContainer.offsetHeight
    let scrollHeight = chatContainer.scrollHeight;

    if(scrollHeight > elementHeight){
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

let currentTime = document.querySelector('#currentTime');
currentTime.textContent = getCurrentTime();
setInterval(() => {
    currentTime.textContent = getCurrentTime();
}, 100);

const chatContainer = document.getElementById('chatContainer');

let memberCards = document.querySelectorAll('.member--card');
let chatTone = document.getElementById('chatTone');
let memberTl = gsap.timeline();

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



let msgSendBtn = document.querySelector('.cta--send');
let msgInput = document.querySelector('.chat--input');

let msgReplyCard = document.querySelector('.user-reply');
let msgReplyTime = msgReplyCard.querySelector('#user-reply-time');
let msgReply = msgReplyCard.querySelector('#user-reply-msg');

let hRReplyCard = document.querySelector('.hr--reply');
let ctaAttachment = document.querySelector('.cta--attachment');


let userAttachmentInput = document.getElementById('chatAttachment');
let userAttachmentCard = document.querySelector('.user-attachment');
let userAttachmentTime = userAttachmentCard.querySelector('#user-reply-time');
let userAttachmentMsg = userAttachmentCard.querySelector('#user-reply-msg');


let hRLastReplyCard = document.querySelector('.hr--lastreply');


msgInput.addEventListener('input', function(){ // Remove leading spaces and non-letter characters
    msgInput.value = msgInput.value.replace(/^[\s]+/, '').replace(/[^a-zA-Z]/g, '');
});

msgSendBtn.addEventListener('click', function(){ // chat send button
    if(msgInput.value.toLowerCase() == msgInput.getAttribute('data-text').toLowerCase()){
        //console.log('matched');
        chatContainerScroll();
        msgReplyCard.style.display = 'inline-grid';
        msgReplyTime.textContent = getCurrentTime();
        msgReply.textContent = msgInput.value;
        msgInput.disabled = true;
        msgSendBtn.disabled = true;

        setTimeout(() => {
            chatContainerScroll();
            hRReplyCard.style.display = 'inline-grid';
            

            setTimeout(() => {
                chatContainerScroll();
                ctaAttachment.classList.add('focused');
                hRReplyCard.querySelector('.typing-ui').style.display = 'none';
                hRReplyCard.querySelector('.member--msg').style.display = 'block';
                msgInput.placeholder = 'Attach CV in PDF, DOC, DOCX | Max. Size 2MB. 👉 👉🏽 👉🏻';

            }, 3000);
        }, 1000);

        
        userAttachmentInput.addEventListener('change', function(){
            if(userAttachmentInput.value) {
                userAttachmentCard.style.display = 'inline-grid';
                userAttachmentTime.textContent = getCurrentTime();

                let file = userAttachmentInput.files[0];
                let fileName = file.name;
                let fileExtension = fileName.split('.').pop();
                let value = userAttachmentInput.value.replace(/^.*[\\\/]/, '');
                let extractedVal = value.length > 15 ? `${value.slice(0, 15)}...${fileExtension}` : value;

                userAttachmentMsg.textContent = `🧷 ${extractedVal}`;
                msgInput.placeholder = 'Attachment uploaded';
                chatContainerScroll();
                ctaAttachment.classList.remove('focused');
                ctaAttachment.disabled = true;
                
                setTimeout(() => {
                    chatContainerScroll();
                    hRLastReplyCard.style.display = 'inline-grid';
                    
                    setTimeout(() => {
                        chatContainerScroll();
                        hRLastReplyCard.querySelector('.typing-ui').style.display = 'none';
                        hRLastReplyCard.querySelector('.member--msg').style.display = 'block';
                        msgInput.placeholder = 'Conversation end';

                    }, 3000);
                }, 1000)
            }
        });

    }
    msgInput.value = '';
});