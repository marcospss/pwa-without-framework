let nowPlayingList = [];
let nextPage = 1;

const nowPlayingContent = document.querySelector('[data-content="now-playing"]');
const initialContent = document.querySelector('[data-initial="logo"]');
const createNowPlayingList = (data) => data && data.map((item) => createCard(item)).join('');
const loadMoreButton = document.querySelector('[data-trigger="btn-load-more"]');
const toastHTMLError = '<span>An error has occurred. Try again later.</span><button class="btn-flat toast-action">Ok</button>';
let imagesToLoad = [];
const loadNowPlaying = async () => {
  try {
    loadingWrapper.style.display = 'flex';
    let totalPages = 0;
    const response = await nowPlaying(nextPage);
    nowPlayingList = response && response.results;
    totalPages = parseInt(response.total_pages, 10);
    nextPage = parseInt(response.page, 10) + 1;
    initialContent.remove();
    nowPlayingContent.innerHTML += createNowPlayingList(nowPlayingList);
    loadingWrapper.style.display = 'none';
    buttonLoadMoreWrapper.style.display = 'block';
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
    M.toast({ html: toastHTMLError });
  }
};

window.addEventListener('load', () => {
  (async () => await loadNowPlaying())();
  loadMoreButton.addEventListener('click', loadNowPlaying);
});