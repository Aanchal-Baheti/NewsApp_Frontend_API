const API_KEY = "3f7e0de9756e4d5ca7a9ed696dcbd0e8";
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load', () => fetchNews("India"));

//<<<-----FETCHING DATA-------->>>
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML ='';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone, article){
    const cardImage = cardClone.querySelector('#news-img');
    const cardTitle = cardClone.querySelector('#news-title');
    const cardSource = cardClone.querySelector('#news-source');
    const cardDesc = cardClone.querySelector('#news-desc');

    const date = new Date(article.publishedAt).toLocaleString(
        "en-US", { timeZone: "Asia/Jakarta"}
    );

    cardImage.src = article.urlToImage;
    cardTitle.innerHTML = article.title;
    cardDesc.innerHTML = article.description;
    cardSource.innerHTML = `${article.source.name} • ${date}`;
   
    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank"); //new tab
    })
}

//<<--------NavItem Handling---------->>>
let curSelectedNav = null;
function onClickNavItem(id){
        fetchNews(id);
        const navItem = document.getElementById(id);
        curSelectedNav?.classList.remove('active');
        curSelectedNav = navItem;
        curSelectedNav.classList.add('active');
        document.getElementById('search-message').textContent = '';
}

//<<--------Searchbar Handling---------->>>
let searchButton =  document.getElementById('search-button');
let searchText =  document.getElementById('search-input'); 
let searchMessage = document.getElementById('search-message');

searchButton.addEventListener('click', ()=> {
        const query = searchText.value;
        if(!query) return;
        fetchNews(query);
        searchText.value = '';
        searchMessage.textContent = `News related to your search: ${query}`;
        curSelectedNav?.classList.remove('active');
        curSelectedNav = null ;
        window.scrollTo({ top: 0, behavior: 'smooth' });
});
 
//<-------reload on clicking logo------>
function reload(){
        window.location.reload();
}