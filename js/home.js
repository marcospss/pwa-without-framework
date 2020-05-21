let nowPlayingList = [];
let nextPage = 1;

const createList = (data) => data && data.forEach((item) => createCard(item));
const loadMoreButton = document.querySelector('[data-trigger="btn-load-more"]');
const toastHTMLError = '<span>An error has occurred. Try again later.</span><button class="btn-flat toast-action">Ok</button>';

const loadNowPlaying = async () => {
  try {
    loadingWrapper.style.display = 'flex';
    let totalPages = 0;
    const response = await nowPlaying(nextPage);
    nowPlayingList = response && response.results;
    totalPages = parseInt(response.total_pages, 10);
    nextPage = parseInt(response.page, 10) + 1;
    createList(nowPlayingList);
    loadingWrapper.style.display = 'none';

    if (nextPage > totalPages) {
      loadMoreButton.style.display = 'none';
    }

    if(loadMoreButton.classList.contains('disabled')) {
      loadMoreButton.classList.remove('disabled');
    }

  } catch (error) {
    loadMoreButton.classList.add('disabled');
    loadingWrapper.style.display = 'none';
    M.toast({ html: toastHTMLError });
  }
};

window.addEventListener('load', () => {
  (async () => await loadNowPlaying())();
  loadMoreButton.addEventListener('click', loadNowPlaying);
});
