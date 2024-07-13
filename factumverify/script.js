// Object to store API keys
const apiKeys = {
    newsApiKey: 'd33534e32a2e4e91ab519acfb9ab8b42', // Setup value of apiKey with your actual News API key
    meaningCloudApiKey: '3cad836143b352a37661657d43213759' // Replace with your actual MeaningCloud API key
};

// Function to show or hide the progress bar
function toggleProgressBar(display, elementId = 'mainProgressBar') {
    const progressBar = document.getElementById(elementId);
    if (progressBar) { // Check if progressBar element exists
        progressBar.style.display = display ? 'block' : 'none';
    } else {
        console.warn(`Progress bar element with ID ${elementId} not found.`);
    }
}

// Function to clear previous results from the results section
function clearPreviousResults() {
    document.getElementById('results').innerHTML = '';
}

// Function to display an error message in the results section
function displayError(message) {
    document.getElementById('results').innerHTML = `<p class="error">${message}</p>`;
}

// Function to create and return a result element based on the article data
function createResultElement(article, index) {
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');
    resultElement.innerHTML = `
        <h2>${article.title}</h2>
        <p><strong>Source:</strong> ${article.source.name}</p>
        <p><strong>Author:</strong> ${article.author}</p>
        <p><strong>Published At:</strong> ${new Date(article.publishedAt).toLocaleDateString()}</p>
        <p>${article.description}</p>
        <img src="${article.urlToImage}" alt="news" class="centerToImage">
        <p class="readMore"><a href="${article.url}" target="_blank">Read more</a></p>
        <div class="summarize-container">
            <button class="summarize" onclick="summarizeArticle('${article.url}', this, 'progressBar-${index}')">Summarize</button>
        </div>
        <div class="summary"></div>
        <div id="progressBar-${index}" class="progress-bar" style="display: none;">
            <div class="progress"></div>
        </div>
    `;
    return resultElement;
}

// Function to display the results in the results section
function displayResults(data) {
    // Clear previous results
    clearPreviousResults();

    // Check if there are no articles and display an error message if so
    if (!data.articles || data.articles.length === 0) {
        displayError('No results found. Please try a different query.');
        return;
    }

    // Get the results section element
    const resultsSection = document.getElementById('results');
    
    // Loop through each article and append the result element to the results section
    data.articles.forEach((article, index) => {
        if (article.title !== '[Removed]') {
            resultsSection.appendChild(createResultElement(article, index));
        }
    });
}

// Function to fetch data from the given URL
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

// Function to summarize the article using the MeaningCloud API
async function summarizeArticle(url, button, progressBarId) {
    // Get the closest result element and the summary div
    const resultDiv = button.closest('.result');
    const summaryDiv = resultDiv.querySelector('.summary');
    
    // Show the progress bar
    toggleProgressBar(true, progressBarId);

    try {
        // Construct the API URL for summarization
        const apiUrl = `https://api.meaningcloud.com/summarization-1.0?key=${apiKeys.meaningCloudApiKey}&url=${encodeURIComponent(url)}&sentences=10`;
        
        // Fetch the summarization data
        const data = await fetchData(apiUrl);

        // Check the response status and display the summary or an error message
        if (data.status.code === '0') {
            summaryDiv.innerHTML = `<p>${data.summary}</p>`;
        } else {
            summaryDiv.innerHTML = `<p>Summary not available. Please try again later.</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        summaryDiv.innerHTML = `<p>There was an error processing your request. Please try again later.</p>`;
    } finally {
        // Hide the progress bar
        toggleProgressBar(false, progressBarId);
    }
}

// Event listener for the form reset event to clear previous results
document.getElementById('factCheckForm').addEventListener('reset', clearPreviousResults);

// Event listener for the form submit event to fetch and display news articles
document.getElementById('factCheckForm').addEventListener('submit', async function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Show the progress bar
    toggleProgressBar(true);

    // Get the query, sort option, and language from the form inputs
    const query = document.getElementById('query').value;
    const sortOption = document.querySelector('input[name="sort"]:checked').value;
    const language = document.getElementById('language').value;
    
    // Construct the API URL for fetching news articles
    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=${sortOption}&language=${language}&apiKey=${apiKeys.newsApiKey}`;

    try {
        // Fetch the news articles data
        const data = await fetchData(apiUrl);
        
        // Display the results
        displayResults(data);
    } catch (error) {
        // Display an error message if there is an error fetching data
        displayError('Error fetching data. Please try again.');
        console.error('Error fetching data:', error);
    } finally {
        // Hide the progress bar
        toggleProgressBar(false);
    }
});
