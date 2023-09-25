const URL = 'https://api.slingacademy.com/v1/sample-data/photos/';
const images = {};
const imagesMaxCount = 10;
let currentIndex = 0;
let selectedElement = document.getElementById("selected-element");

const fetchData = async (url, imageId) => {
    try {
        const response = await fetch(url + imageId);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function showImage() {
    let title = document.getElementById("main-image-title");
    let img = document.getElementById("main-image-slider");
    let counter = document.getElementById("main-image-counter");
    let data;

    if(images[currentIndex] !== undefined){
        data = images[currentIndex];
    }else{
        try {
            data = await fetchData(URL, currentIndex + 1);

            images[currentIndex] = data;


        } catch (error) {
            console.log(error)
        }
    }

    title.innerHTML = data.photo.title;
    img.style.backgroundImage = `url('${data.photo.url}')`;
    counter.innerHTML = (currentIndex + 1).toString() + "/" + imagesMaxCount.toString();


}
function changeImage(n) {
    currentIndex += n;
    if (currentIndex >= imagesMaxCount) {
        currentIndex = 0;
    }
    if (currentIndex < 0) {
        currentIndex = imagesMaxCount - 1;
    }
    showImage(images[currentIndex]);
}

function selectElement(element){
    console.log(element);
    if(selectedElement && selectedElement.id)
        selectedElement.removeAttribute("id");
    element.id = "selected-element";
    selectedElement = element;
    console.log(selectedElement);
}


showImage();