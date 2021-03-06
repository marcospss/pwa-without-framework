// const nowPlayingContent = document.querySelector('[data-content="now-playing"]');
// const recommendations = document.querySelector('[data-content="recommendations"]');
// const similar = document.querySelector('[data-content="similar"]');
const loadingWrapper = document.querySelector('[data-content="loading"]');
const buttonLoadMoreWrapper = document.querySelector('[data-content="btn-load-more"]');

const loading = () => `
    <div class="container-animation">
        <div class="loader"></div>
    </div>
`;

const createCard = (data) => {
  const { id, title, backdrop_path, overview } = data;
  const backdropPath = backdrop_path
    ? `https://image.tmdb.org/t/p/w300${backdrop_path}`
    : "/images/not-found.png";

  const card = `
        <div class="col s12 m6 l4" data-id="${id}">
            <div class="card hoverable">
            <div class="wrapper-image card-image waves-effect waves-block waves-light">
                <img class="activator ${
                  !backdrop_path ? "image-not-found" : ""
                }" src="/images/not-found.png" data-src="${backdropPath}" alt="${title}" />
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${title}<i
                    class="material-icons right">more_vert</i></span>
                <p class="text-right"><a href="/details.html?id=${id}" class="btn-small waves-effect waves-light grey darken-4">Read more<i class="material-icons right">navigate_next</i></a></p>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">
                    ${title}
                    <i class="material-icons right">close</i>
                </span>
                <p>${overview}</p>
            </div>
            </div>
        </div>`;
    return card;
};

/**
 * Lazy Loading Images
 */
const loadImages = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = () => {
    image.removeAttribute("data-src");
  };
};

const lazyLoadingImages = () => {
  let imagesToLoad = [];
  imagesToLoad = document.querySelectorAll('img[data-src]');
  if('IntersectionObserver' in window) {
    let observer = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if(item.isIntersecting) {
          loadImages(item.target);
          observer.unobserve(item.target);
        }
      });
    });
    imagesToLoad.forEach((img) => {
      observer.observe(img);
    });
  }
  else {
    imagesToLoad.forEach((img) => {
      loadImages(img);
    });
  }
};
