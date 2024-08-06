
const images = ['images/img2.jpeg', 'images/img3.jpeg', 'images/img4.jpeg'];

let currentIndex = 0;

function changeImageAtInterval() {
    const imageElement = document.getElementById('displayed-image');

    imageElement.src = images[currentIndex];
    imageElement.alt = `Image ${currentIndex + 1}`;

    currentIndex = (currentIndex + 1) % images.length;
}

const intervalId = setInterval(changeImageAtInterval, 2000);
