const URL = 'https://api.slingacademy.com/v1/sample-data/photos/';
const images = {};
const imagesMaxCount = 5;
const articleMaxCount = 9;
const trendingArticlesMaxCount = 5;
let articles = [];
let currentIndex = 0;
let selectedElement = document.getElementById("selected-element");
let selectedFilter = document.getElementById("selected-filter");
let mainTrendingArticle = document.getElementById("main-trending");

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
            title: data.photo.title,
            url: `url('${data.photo.url}')`
        };
        articles[i] = article;

        const div = document.createElement("div");
        div.classList.add("article-container");

        const image = document.createElement("div");
        image.classList.add("article-image");
        image.style.backgroundImage = article.url;

        const date = document.createElement("div");
        date.classList.add("article-date");
        date.innerHTML = "29.June.2019";

        const title = document.createElement("div");
        title.classList.add("article-title");
        title.innerHTML = article.title;

        div.appendChild(image);
        div.appendChild(date);
        div.appendChild(title);
        articleContainer.appendChild(div);

    }
}

async function creaeteTrenidnArticles() {
    let articleContainer = document.getElementById("articles-trending")
    for(let i = 0; i < trendingArticlesMaxCount; i++){
        let article;
        if(i < articles.length) {
            article = articles[i];
        }else{
            let data = await fetchData(URL, i+1);
            article = {
                id: i+1,
                date: "29.Jun.2019",
                title: data.photo.title,
                url: `url('${data.photo.url}')`
            };
            articles.push(article);
        }

        console.log(articles[i].id)

        const container = document.createElement("div");
        container.classList.add("article-container");

        const image = document.createElement("div");
        image.classList.add("trending-image");
        if(!mainTrendingArticle) {
            image.id = "main-trending";
            mainTrendingArticle = image;
        }
        image.style.backgroundImage = article.url;

        const date = document.createElement("div");
        date.classList.add("trending-date");
        date.innerHTML = "29.June.2019";

        const title = document.createElement("div");
        title.classList.add("trending-title");
        title.innerHTML = article.title;

        image.appendChild(date);
        image.appendChild(title);
        container.appendChild(image);
        articleContainer.appendChild(container);

    }
    for(let i = 0; i < articles.length; i++){
        console.log(articles[i]);
    }
}

createArticles();


creaeteTrenidnArticles();
showImage();

