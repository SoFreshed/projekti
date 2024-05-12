const apiKey = 'KOZiVNFYUL52y3ZAvncqXHwUhHdJeajb';
const apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const defaultSection = 'home';

document.getElementById('article-search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const keyword = document.getElementById('search-keyword').value;
    searchArticles(keyword);
});

async function searchArticles(keyword) {
    try {
        const response = await fetch(`${apiUrl}?q=${keyword}&api-key=${apiKey}`);
        const data = await response.json();
        

        if (data && data.response) {
            displayArticles(data.response.docs);
        } else {
            console.error('Invalid response from API:', data);
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}

function displayArticles(articles) {
    const articlesContainer = document.getElementById('articles-container');
    articlesContainer.innerHTML = '';

    articles.forEach(article => {
        const { web_url, headline, snippet, multimedia } = article;

        const image = multimedia.find(media => media.type === 'image');
        if (!image) return;

        const imageUrl = `https://www.nytimes.com/${image.url}`;

        const articleElement = document.createElement('div');
        articleElement.classList.add('article');

        const articleBox = document.createElement('div');
        articleBox.classList.add('article-box');

        const heading = document.createElement('h3');
        const headingLink = document.createElement('a');
        headingLink.href = web_url;
        headingLink.target = '_blank';
        headingLink.textContent = headline.main;
        heading.appendChild(headingLink);
        articleBox.appendChild(heading);

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = headline.main;
        imageElement.classList.add('article-image');
        articleBox.appendChild(imageElement);

        const snippetPara = document.createElement('p');
        snippetPara.textContent = snippet;
        articleBox.appendChild(snippetPara);

        articleElement.appendChild(articleBox);
        articlesContainer.appendChild(articleElement);
    });
}