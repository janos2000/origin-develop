const URL = 'https://api.slingacademy.com/v1/sample-data/photos/';
const images = [];
let titles = document.getElementsByClassName("main-image-title");
let currentIndex = 1;

const fetchData = async (url, imageId) => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        var img = document.getElementById("main-image-" + imageId);

        img.setAttribute("alt", data.photo.title);
        img.src = data.photo.url;
        titles[imageId - 1].innerHTML = data.photo.title;

        images.push(img);

    } catch (error) {
        console.error(error);
    }
}

function showImage(){
    let i;
    let images = document.getElementsByClassName("main-image-slides");

    if(currentIndex > images.length) {
        currentIndex = 1;
    }
    if(currentIndex < 1){
        currentIndex = images.length;
    }

    for(i = 0; i < images.length; i++){
        images[i].style.display = "none";
    }
    console.log(currentIndex)

    images[currentIndex - 1].style.display = "block";
}

function changeImage(n){
    currentIndex += n;
    showImage();
}

for (let i = 1; i <= 5; i++) {
    fetchData(URL + i, i);
}

showImage(currentIndex);



