// Image arrays for each box
const imageArrays = {
    "award-box-1": [
        "https://i.imgur.com/VIviau6.jpg",
        "https://i.imgur.com/J5jBage.jpg"
    ],
    "award-box-2": [
        "https://i.imgur.com/wQrbOnE.png",
        "https://i.imgur.com/OD3bK0n.jpg"
    ],
    "award-box-3": [
        "https://i.imgur.com/wikIfNU.jpg",
        "https://i.imgur.com/9wnuAfc.png"
    ],
    "award-box-4": [
        "https://i.imgur.com/OD3bK0n.jpg",
       
    ],

    "award-box-5" : [
    "https://i.imgur.com/J5jBage.jpg",
    "https://i.imgur.com/J5jBage.jpg"
    ],

    "award-box-6" : [
        "https://i.imgur.com/E5KYb19.jpg",
        "https://i.imgur.com/E5KYb19.jpg"
        ],
};

// Function to cycle images for a specific box
function cycleImages(boxId) {
    const imgElement = document.querySelector(`#${boxId} .images img`);
    const images = imageArrays[boxId];
    let currentIndex = 0;

    if (imgElement) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            imgElement.src = images[currentIndex];
        }, 5000);
    } else {
        console.error(`Image element for box ${boxId} not found.`);
    }
}

// Start cycling images for all boxes dynamically
Object.keys(imageArrays).forEach(boxId => {
    cycleImages(boxId);
});

// Confetti function
// Confetti function
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    if (!confettiContainer) {
        console.error('Confetti container not found!');
        return;
    }

    for (let i = 0; i < 500; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti-piece');
        confettiPiece.style.left = `${Math.random() * 100}%`;
        confettiPiece.style.animationDelay = `${Math.random() * 2}s`;
        confettiContainer.appendChild(confettiPiece);
    }

    confettiContainer.style.display = 'block';

    setTimeout(() => {
        confettiContainer.style.display = 'none';
        confettiContainer.innerHTML = ''; // Clear confetti pieces after animation
    }, 4000);  // Stops the confetti after 4 seconds
}


document.querySelectorAll('.award-box').forEach(box => {
    const giftWrap = box.querySelector('.gift-wrap');
    const revealButton = box.querySelector('.reveal-button');
    const hiddenContent = box.querySelector('.hidden-content');
    const images = box.querySelector('.images');
    const imgTag = images ? images.querySelector('img') : null;
    const awardTitle = box.querySelector('.award-title');
    const countdownContainer = document.getElementById('countdown-container');
    const leaderboardRanks = box.querySelectorAll('.rank');

    // Ensure revealButton is only clicked for the correct box
    if (revealButton) {
        revealButton.addEventListener('click', () => {
            if (giftWrap) giftWrap.style.display = 'none';  // Hide the gift wrap

            let counter = 5;
            if (countdownContainer) {
                countdownContainer.textContent = counter;
                countdownContainer.style.display = 'flex';
            }

            const interval = setInterval(() => {
                counter--;
                if (countdownContainer) {
                    countdownContainer.textContent = counter;
                }

                if (counter === 0) {
                    clearInterval(interval);
                    if (countdownContainer) countdownContainer.style.display = 'none';
                    if (hiddenContent) hiddenContent.classList.add('visible');
                    if (awardTitle) awardTitle.style.display = 'block';

                    // Ensure the correct image for the box
                    if (imgTag && imageArrays[box.id]) {
                        const boxImages = imageArrays[box.id];
                        imgTag.src = boxImages[Math.floor(Math.random() * boxImages.length)];
                        if (images) images.style.display = 'block';
                    }

                    leaderboardRanks.forEach(rank => rank.classList.add('animate'));

                    createConfetti();
                }
            }, 1000);
        });
    } else {
        console.error('Reveal button not found in box:', box);
    }
});
