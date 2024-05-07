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
        const { web_url, snippet } = article;
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        articleElement.innerHTML = `
            <p><a href="${web_url}" target="_blank">${snippet}</a></p>
        `;
        articlesContainer.appendChild(articleElement);
    });
}