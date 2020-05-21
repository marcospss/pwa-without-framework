const content = document.querySelector('[data-content="container"]');
// const recommendations = document.querySelector('[data-content="recommendations"]');
// const similar = document.querySelector('[data-content="similar"]');
const loadingWrapper = document.querySelector('[data-content="loading"]');

const loading = () => (`
    <div class="container-animation">
        <div class="loader"></div>
    </div>
`);

const createCard = (data) => {
    const { id, title, backdrop_path, overview } = data;
    const backdropPath = (backdrop_path) ? `https://image.tmdb.org/t/p/w300${backdrop_path}` : '/images/not-found.png';
    const card = `
        <div class="col s12 m6 l4" data-id="${ id }">
            <div class="card hoverable">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator ${(!backdrop_path) ? 'image-not-found' : ''}" src="${ backdropPath }" alt="${ title }" />
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${ title }<i
                    class="material-icons right">more_vert</i></span>
                <p><a href="/details.html?id=${ id }">Read more</a></p>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">
                    ${ title }
                    <i class="material-icons right">close</i>
                </span>
                <p>${ overview }</p>
            </div>
            </div>
        </div>
    `
    content.innerHTML += card;
}
