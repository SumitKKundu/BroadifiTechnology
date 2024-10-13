// check mobile orientation for android and ios mobile only
function isMobile() {
    return /Android/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent);
}

function isTablet() {
    return /iPad/i.test(navigator.userAgent);
}
  

function checkOrientation() {
    if (isMobile() && !isTablet() && window.innerHeight < window.innerWidth) {
      document.body.classList.add('landscape');
    } else {
      document.body.classList.remove('landscape');
    }
  }
  
  // initial check
  checkOrientation();
  
  // check on resize
  window.addEventListener('resize', checkOrientation);

  

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
    // play the audio file
    chatTone.play().catch((error) => {
        console.error("Error playing audio:", error);
    });
    let elementHeight = chatContainer.clientHeight; // or chatContainer.offsetHeight
    let scrollHeight = chatContainer.scrollHeight;

    // if current height > actual height, then scroll to bottom
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

function checkConnection(wifiIndicator) {
    if (navigator.onLine) {
        wifiIndicator.style.opacity = "1";
    } else {
        wifiIndicator.style.opacity = "0.25";
    }
}




function loadTeamAnim(){

if(document.querySelector('.broadifi__teamNew')){
    gsap.registerPlugin(ScrollToPlugin);

    // get mobile wifi icon
    let wifiIndicator = document.querySelector('.wifi-connect');

    // check wifi status initially
    checkConnection(wifiIndicator);


    // check wifi status on change
    window.addEventListener('online',  () => wifiIndicator.style.opacity = "1");
    window.addEventListener('offline', () => wifiIndicator.style.opacity = "0.25");



    // print current time on mobile screen
    let currentTime = document.querySelector('#currentTime');
    currentTime.textContent = getCurrentTime();
    setInterval(() => {
        currentTime.textContent = getCurrentTime();
    }, 100);


    // get chat body container
    let chatContainer = document.getElementById('chatContainer');

    // get chat tone audio
    let chatTone = document.getElementById('chatTone');

    // get all chat member divs
    let memberCards = document.querySelectorAll('.member--card');
    let memberTl = gsap.timeline({
        onComplete: () => {
            // once all member divs appear enable  type "Join" input box and sent btn
            msgInput.disabled = false;
        }
    });



    // mobile input box(type "join")
    let msgSendBtn = document.querySelector('.cta--send');
    let msgInput = document.querySelector('.chat--input');

    // disable type "Join" input box
    msgInput.disabled = true;
    msgSendBtn.disabled = true;


    // show all chat member divs one by one
    memberCards.forEach((memberCard, index) => {
        let memberPic = memberCard.querySelector('.member--photo');
        let memberMsg = memberCard.querySelector('.member--msg');

        // Initial state
        gsap.set(memberPic, { scale: 0, transformOrigin: "center center" });
        gsap.set(memberMsg, { autoAlpha: 0, x: -10 });

        // Stagger the animations
        memberTl.to(memberCard, { display: 'inline-grid', onComplete: chatContainerScroll}, index * 2.5) // on complete scroll to chat container to bottom
        memberTl.to(memberPic, { scale: 1}, ">")
        memberTl.to(memberMsg, { autoAlpha: 1, x: 0}, ">")
    });



    let msgReplyCard = document.querySelector('.user-reply');
    let msgReplyTime = msgReplyCard.querySelector('#user-reply-time');
    let msgReply = msgReplyCard.querySelector('#user-reply-msg');


    // HR reply after user type "Join"
    let hRReplyCard = document.querySelector('.hr--reply');

    // mobile screen attachment 
    let ctaAttachment = document.querySelector('.cta--attachment');
    let userAttachmentInput = document.getElementById('chatAttachment');
    let userAttachmentCard = document.querySelector('.user-attachment');
    let userAttachmentTime = userAttachmentCard.querySelector('#user-reply-time');
    let userAttachmentMsg = userAttachmentCard.querySelector('#user-reply-msg');

    userAttachmentInput.disabled = true;

    // HR reply after user send attachment
    let hRLastReplyCard = document.querySelector('.hr--lastreply');


    // make sure mobile input box(type "join") accept only text
    msgInput.addEventListener('input', function(){ 
        // Remove leading spaces and non-letter characters
        msgInput.value = msgInput.value.replace(/^[\s]+/, '').replace(/[^a-zA-Z]/g, '');
    });


    msgInput.addEventListener('keyup', function(){ 
        // if user type "Join" then enable send btn
        if(msgInput.value.toLowerCase() == msgInput.getAttribute('data-text').toLowerCase()){
            msgSendBtn.disabled = false;
        }
        else{
            msgSendBtn.disabled = true;
        }
    });


    // chat send button
    msgSendBtn.addEventListener('click', function(){ 

        chatContainerScroll();

        // print what user type and what time
        msgReplyCard.style.display = 'inline-grid';
        msgReplyTime.textContent = getCurrentTime();
        msgReply.textContent = msgInput.value;

        // then disable+reset mobile input box and disable send button
        msgInput.value = ' ';
        msgInput.disabled = true;
        msgSendBtn.disabled = true;

        // after 2000ms display HR typing
        setTimeout(() => {
            chatContainerScroll();
            hRReplyCard.style.display = 'inline-grid';
            
            // and after 3000ms HR ask to attach CV
            setTimeout(() => {
                chatContainerScroll();
                userAttachmentInput.disabled = false;
                ctaAttachment.classList.add('focused');
                hRReplyCard.querySelector('.typing-ui').style.display = 'none';
                hRReplyCard.querySelector('.member--msg').style.display = 'block';
                msgInput.value = '';
                msgInput.placeholder = 'Attach CV in PDF, DOC, DOCX | Max. 2MB. 👉 👉🏽 👉🏻';

            }, 5000);
        }, 2500);

        // if user attach a file (CV)
        userAttachmentInput.addEventListener('change', function(){
            if(userAttachmentInput.value) {
                // disable attach input
                userAttachmentInput.disabled = true;

                // get attachment file
                let userAttachmentFile = userAttachmentInput.files[0];
                let userAttachmentFileName = userAttachmentFile.name;

                // get attachment extension
                let fileExtension = userAttachmentFileName.split('.').pop();

                // remove extra names
                let userAttachmentVal = userAttachmentInput.value.replace(/^.*[\\\/]/, '');

                // if file name length more than 10 and extract first 15 letter and concatenate file extension
                let extractedVal = userAttachmentVal.length > 15 ? `${userAttachmentVal.slice(0, 15)}...${fileExtension}` : userAttachmentVal;

                // show attachment 
                userAttachmentCard.style.display = 'inline-grid';
                userAttachmentTime.textContent = getCurrentTime();
                userAttachmentMsg.textContent = `🧷 ${extractedVal}`;
                msgInput.placeholder = 'Attachment uploaded';
                chatContainerScroll();

                // once attachment uploaded disable attach input
                ctaAttachment.classList.remove('focused');
                ctaAttachment.disabled = true;
                

                // after 2500 show HR typing
                setTimeout(() => {
                    chatContainerScroll();
                    hRLastReplyCard.style.display = 'inline-grid';
                    
                    // after 5000ms show HR last msg, that says CV sent to technical guys and conversaion end
                    setTimeout(() => {
                        chatContainerScroll();
                        hRLastReplyCard.querySelector('.typing-ui').style.display = 'none';
                        hRLastReplyCard.querySelector('.member--msg').style.display = 'block';
                        msgInput.placeholder = 'Conversation end';

                    }, 5000);
                }, 2500)
            }
        });
    });
}

}