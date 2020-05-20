let nowPlayingList = [];
let nextPage = 1;
let hasError = false;
let messageError = null;

const createList = (data) => data && data.forEach((item) => createCard(item));
const loadMoreButton = document.querySelector('[data-trigger="btn-load-more"]');

const loadNowPlaying = async () => {
  try {
      
    loadingWrapper.style.display = 'flex';
    let totalPages = 0;
    const response = await nowPlaying(nextPage);
    nowPlayingList = response && response.results;
    totalPages = parseInt(response.total_pages, 10);
    nextPage = parseInt(response.page, 10) + 1;
    hasError = false;
    messageError = null;
    createList(nowPlayingList);
    loadingWrapper.style.display = 'none';

    if (nextPage > totalPages) {
      loadMoreButton.style.display = 'none';
    }

  } catch (error) {
    hasError = true;
    messageError = error;
    console.log('error', error);
  }
};

window.addEventListener('load', () => {
  (async () => await loadNowPlaying())();

  loadMoreButton.addEventListener('click', loadNowPlaying);
});
