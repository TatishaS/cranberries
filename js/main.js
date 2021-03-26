const mySwiper = new Swiper('.swiper-container', {
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.slider-button-next',
    prevEl: '.slider-button-prev',
  },
});

// cart

const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
const modalClose = document.querySelector('.modal-close');
const overlay = document.querySelector('.overlay');
const more = document.querySelector('.more');
const navigationLinks = document.querySelectorAll('.navigation-link');
const longGoodsList = document.querySelector('.long-goods-list');

const getGoods = async () => {
  const result = await fetch('db/db.json');
  if (!result.ok) {
    throw 'Ошибка! ' + result.status;
  }
  return await result.json();
};

// Functions
const openModal = () => {
  console.log(buttonCart);
  modalCart.classList.add('show');
};

const closeModal = () => {
  console.log(buttonCart);
  modalCart.classList.remove('show');
};

// Event handlers
buttonCart.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);

modalCart.addEventListener('click', event => {
  const target = event.target;
  if (target.classList.contains('overlay')) {
    closeModal();
  }
});

// scroll smooth
{
  const scrollLinks = document.querySelectorAll('a.scroll-link');

  for (const scrollLink of scrollLinks) {
    scrollLink.addEventListener('click', e => {
      e.preventDefault();
      const id = scrollLink.getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
}

// goods

const createCard = function ({ label, name, img, description, id, price }) {
  const card = document.createElement('div');
  card.className = 'col-lg-3 col-sm-6';

  card.innerHTML = `
		<div class="goods-card">
			${label ? `<span class="label">${label}</span>` : ''}
			<img
				src="db/${img}"
				alt="${name}"
				class="goods-image"
			/>
			<h3 class="goods-title">${name}</h3>

			<p class="goods-description">${description}</p>

			<button class="button goods-card-btn add-to-cart" data-id="${id}">
				<span class="button-price">$${price}</span>
			</button>
		</div>
	`;
  return card;
};

const renderCards = function (data) {
  longGoodsList.textContent = '';
  const cards = data.map(createCard);
  longGoodsList.append(...cards);

  document.body.classList.add('show-goods');
};

more.addEventListener('click', e => {
  e.preventDefault();
  getGoods().then(renderCards);
});

const filterCards = function (field, value) {
  getGoods()
    .then(data => data.filter(good => good[field] === value))
    .then(renderCards);
};

navigationLinks.forEach(function (link) {
  link.addEventListener('click', e => {
    e.preventDefault();
    const field = link.dataset.field;
    const value = link.textContent;

    field ? filterCards(field, value) : getGoods().then(renderCards);
  });
});
