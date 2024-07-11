const newsApiKey = 'd33534e32a2e4e91ab519acfb9ab8b42'; // Setup value of apiKey with your actual News API key
const meaningCloudApiKey = '3cad836143b352a37661657d43213759'; // Replace with your actual MeaningCloud API key

function clearPreviousResults() {
    const resultsPreviousSection = document.getElementById('results');
    resultsPreviousSection.innerHTML = '';
}

document.getElementById('factCheckForm').addEventListener('reset', function(event) {
    // Clear previous results.
    clearPreviousResults();
});

document.getElementById('factCheckForm').addEventListener('submit', async function(event) {
    // Prevent default form submission behavior.
    event.preventDefault();
    
    // Get the query from the input field.
    const query = document.getElementById('query').value;
    
    // Get the selected sort option.
    const sortOption = document.querySelector('input[name="sort"]:checked').value;

    // Get the selected language.
    const language = document.getElementById('language').value;
    
    // Construct the API URL with the query, sort option, language, and API key.
    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=${sortOption}&language=${language}&apiKey=${newsApiKey}`;

    
    // Construct the API URL with the query, sort option, and API key.
    //const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=${sortOption}&apiKey=${newsApiKey}`;

    try {
        // Fetch data from the API.
        const response = await fetch(apiUrl);
        
        // If the response is not ok, throw an error.
        if (!response.ok) throw new Error('Network response was not ok');
        
        // Parse the response data as JSON.
        const data = await response.json();
        
        // Call displayResults with the parsed data.
        displayResults(data);
    } catch (error) {
        // Call displayError with an error message.
        displayError('Error fetching data. Please try again.');
        console.error('Error fetching data:', error);
    }
});

function displayResults(data) {
    // Clear previous results.
    clearPreviousResults();

    // If no articles are found, display an error message and return.
    if (!data.articles || data.articles.length === 0) {
        displayError('No results found. Please try a different query.');
        return;
    }

    // For each article in data.articles:
    const resultsSection = document.getElementById('results');
    data.articles.forEach(article => {

    // Do not add if article is [Removed]    
    if (article.title !== '[Removed]') {

        // Create a result card with title, source, publication date, description, and a link to read more.
        const resultElement = document.createElement('div');
        resultElement.classList.add('result');
        //console.log(article.url);
        resultElement.innerHTML = `
            <h2>${article.title}</h2>
            <p><strong>Source:</strong> ${article.source.name}</p>
            <p><strong>Author:</strong> ${article.author}</p>
            <p><strong>Published At:</strong> ${new Date(article.publishedAt).toLocaleDateString()}</p>
            <p>${article.description}</p>
            <img src="${article.urlToImage}" alt="news" class="centerToImage">
            <p class="readMore"><a href="${article.url}" target="_blank">Read more</a></p>
            <div class="summarize-container">
                <button class="summarize" onclick="summarizeArticle('${article.url}', this)">Summarize</button>
            </div>
            <div class="summary"></div>
            <div class="progress-bar" style="display: none;">
                <div class="progress"></div>
            </div>
        `;
        // Append the result card to the results section.
        resultsSection.appendChild(resultElement);
    }  
    });
}

function displayError(message) {
    // Display the error message in the results section.
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = `<p class="error">${message}</p>`;
}

async function summarizeArticle(url, button) {
    const resultDiv = button.closest('.result');
    const summaryDiv = resultDiv.querySelector('.summary');
    const progressBar = resultDiv.querySelector('.progress-bar');

    progressBar.style.display = 'block';

    try {
        const response = await fetch(`https://api.meaningcloud.com/summarization-1.0?key=${meaningCloudApiKey}&url=${encodeURIComponent(url)}&sentences=10`, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Log the response to the console
        console.log('API response:', data);

        if (data.status.code === '0') {
            summaryDiv.innerHTML = `<p>${data.summary}</p>`;
        } else {
            summaryDiv.innerHTML = `<p>Summary not available. Please try again later.</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        summaryDiv.innerHTML = `<p>There was an error processing your request. Please try again later.</p>`;
    } finally {
        progressBar.style.display = 'none';
    }
}
