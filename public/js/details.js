const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"), 10);
const toastHTMLErrorDetails = '<span>An error occurred while loading details. Try again later.</span><button class="btn-flat toast-action">Ok</button>';
/**
 * DETAILS
 */
const detailsContent = document.querySelector('[data-content="details"]');
const renderDetails = (data) => {
  const { id, title, backdrop_path, overview } = data;
  const backdropPath = backdrop_path
    ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
    : "/images/not-found.png";

    const details =`
            <nav class="grey z-depth-3">
            <div class="nav-wrapper ml-40">
                <div class="col s12">
                <a href="/" class="breadcrumb">Home</a>
                <a href="/discover.html" class="breadcrumb">Discover</a>
                <span class="breadcrumb" data-content="breadcrumb">${ title }</span>
                </div>
            </div>
        </nav>
        <section class="row" data-id="${id}">
            <header class="col s12 header">
                <figure>
                    <img src="${ backdropPath }" alt="${ title }" />
                </figure>
                <h1 class="title" data-content="title">${ title }</h1>
            </header>
        </section>
        <section class="row description">
            <div class="col s12">
                <p>${ overview }</p>
            </div>
        </section>
    `;
    detailsContent.innerHTML = details;
};

const loadDetails = async () => {
    try {
        loadingWrapper.style.display = 'flex';
        const responseDetails = await details(id);
        renderDetails(responseDetails);
        detailsContent.style.display = 'block';
        loadingWrapper.style.display = 'none';
    } catch (error) {
        loadingWrapper.style.display = 'none';
        M.toast({ html: toastHTMLErrorDetails });
    }
    
};
/**
 * RECOMMENDATIONS
 */
let recommendationsList = [];
let nextPage = 1;
const recommendationsContent = document.querySelector('[data-content="recommendations"]');
const recommendationsListResults = document.querySelector('[data-content="recommendations-list"]');
const createRecommendationsList = (data) => data && data.map((item) => createCard(item)).join('');
const loadMoreButton = document.querySelector('[data-trigger="btn-load-more"]');

const loadRecommendations = async () => {
  try {
    loadingWrapper.style.display = 'flex';
    let totalPages = 0;
    const responseRecommendations = await recommendations(id, nextPage);
    recommendationsList = responseRecommendations && responseRecommendations.results;
    if(recommendationsList.length) {
        recommendationsContent.style.display = 'block';
    }
    totalPages = parseInt(responseRecommendations.total_pages, 10);
    nextPage = parseInt(responseRecommendations.page, 10) + 1;
    recommendationsListResults.innerHTML += createRecommendationsList(recommendationsList);
    loadingWrapper.style.display = 'none';
    lazyLoadingImages();

    if (nextPage > totalPages) {
      loadMoreButton.style.display = 'none';
    }

    if(loadMoreButton.classList.contains('disabled')) {
      loadMoreButton.classList.remove('disabled');
    }

  } catch (error) {
    loadMoreButton.classList.add('disabled');
    loadingWrapper.style.display = 'none';
    const toastHTMLErrorDetails = '<span>An error occurred while loading Recommendations. Try again later.</span><button class="btn-flat toast-action">Ok</button>';
    M.toast({ html: toastHTMLErrorDetails });
  }
};

window.addEventListener('load', () => {
  (async () => {
    if(!Number.isInteger(id)) {
        M.toast({ html: toastHTMLErrorDetails });
        return;
    }
      await loadDetails();
      await loadRecommendations();
  })();
  loadMoreButton.addEventListener('click', loadRecommendations);
});
