const URL = 'https://api.slingacademy.com/v1/sample-data/photos/';
const images = {};
const imagesMaxCount = 5;
const articleMaxCount = 9;
let articles = [];
let currentIndex = 0;
let selectedElement = document.getElementById("selected-element");
let selectedFilter = document.getElementById("selected-filter");

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
    if(selectedElement && selectedElement.id)
        selectedElement.removeAttribute("id");
    element.id = "selected-element";
    selectedElement = element;
}

function selectFilter(element){
    console.log(selectedFilter)
    if(selectedFilter && selectedFilter.id)
        selectedFilter.removeAttribute("id");
    element.id = "selected-filter";
    selectedFilter = element;
}

async function createArticles(){
    let articleContainer = document.getElementById("articles")
    for(let i = 0; i < articleMaxCount; i++){
        let data = await fetchData(URL, i+1);
        let article = {
            id: i+1,
            date: "29.Jun.2019",
            title: data.photo.title
        };
        articles.push(article);

        const div = document.createElement("div");
        div.classList.add("article-container");

        const image = document.createElement("div");
        image.classList.add("article-image");
        image.style.backgroundImage = `url('${data.photo.url}')`;

        const date = document.createElement("div");
        date.classList.add("article-date");
        date.innerHTML = "29.June.2019";

        const title = document.createElement("div");
        title.classList.add("article-title");
        title.innerHTML = data.photo.title;

        div.appendChild(image);
        div.appendChild(date);
        div.appendChild(title);
        articleContainer.appendChild(div);

        console.log(i)
    }
}

createArticles();

showImage();

