// =========================================================
// !!! IMPORTANT: CHANGE THIS DATE AND TIME !!!
// The time is currently set for quick testing (Oct 29, 2025 at 11:17 PM IST).
// Change 'October 29, 2025 23:17:00' to your actual birthday date.
// =========================================================
const birthdayDate = new Date("October 31, 2025 22:39:00 GMT+0530").getTime();

// Get the main elements from the HTML
const timerElement = document.getElementById("timer");
const countdownPage = document.getElementById("countdown-page");
const wishPage = document.getElementById("wish-page");
const surprisesSection = document.getElementById("surprises-section"); 
const confettiContainer = document.getElementById("confetti-container");

// Function to generate the confetti pieces
function startConfettiBlast() {
    const pieces = 100; // Number of confetti pieces
    const colors = ['#ff69b4', '#ffd43b', '#64ffda', '#ff5722'];

    for (let i = 0; i < pieces; i++) {
        const confetto = document.createElement('div');
        confetto.className = 'confetto';
        
        // Randomly position and color the confetti
        confetto.style.left = Math.random() * 100 + 'vw'; 
        confetto.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetto.style.animationDelay = Math.random() * 0.5 + 's'; 
        confetto.style.transform = `scale(${Math.random() * 0.8 + 0.2}) rotate(${Math.random() * 360}deg)`; 

        confettiContainer.appendChild(confetto);
    }
    
    // Clear confetti after 5 seconds
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000); 
}


// === LOGIC: Play Video on Hover (Remains functional) ===
function setupVideoHover() {
    const videoContainers = document.querySelectorAll('.video-hover');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        
        if (video) {
            video.pause(); 
        }

        container.addEventListener('mouseenter', () => {
            if (video) {
                video.currentTime = 0;
                video.play().catch(error => {
                    console.log("Autoplay prevented:", error);
                });
            }
        });

        container.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 0; 
            }
        });
    });
}
// =========================================


// Update the count down every 1 second
const countdownInterval = setInterval(function() {

    // Removed the animation-stopping logic. The timer starts instantly.

    const now = new Date().getTime();
    const distance = birthdayDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    timerElement.innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    // Transition Logic: If the countdown is finished
    if (distance < 0) {
        clearInterval(countdownInterval); 
        
        timerElement.innerHTML = "0d 0h 0m 0s"; 
        
        // 1. Hide the countdown
        countdownPage.style.opacity = '0'; 
        
        setTimeout(() => {
            countdownPage.style.display = 'none'; 

            // 2. Show the wish page
            wishPage.style.display = 'flex'; 
            wishPage.style.opacity = '1'; 
            
            // 3. Start the confetti blast!
            startConfettiBlast();
            
            // 4. Set up the video hover functionality
            setupVideoHover();

            // 5. Show the surprise content
            surprisesSection.style.display = 'block'; 
            
        }, 1000); 

        // 6. Auto-scroll to the surprises
        setTimeout(() => {
            surprisesSection.scrollIntoView({ behavior: 'smooth' });
        }, 4000); 
    }
}, 1000);