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

// Functions
const openModal = function () {
  console.log(buttonCart);
  modalCart.classList.add('show');
};

const closeModal = function () {
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

  for (let i = 0; i < scrollLinks.length; i++) {
    scrollLinks[i].addEventListener('click', function (e) {
      e.preventDefault();
      const id = scrollLinks[i].getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
}

// goods

const more = document.querySelector('.more');
const navigationItems = document.querySelectorAll('.navigation-item');
const longGoodsList = document.querySelector('.long-goods-list');

const getGoods = async function () {
  const result = await fetch('db/db.json');
  if (!result.ok) {
    throw 'Ошибка! ' + result.status;
  }
  return await result.json();
};

const createCard = function (objCard) {
  const card = document.createElement('div');
  card.className = 'col-lg-3 col-sm-6';
  card.innerHTML = `
		<div class="goods-card">
			${objCard.label ? `<span class="label">${objCard.label}</span>` : ''}
			<img
				src="db/${objCard.img}"
				alt="${objCard.name}"
				class="goods-image"
			/>
			<h3 class="goods-title">${objCard.name}</h3>

			<p class="goods-description">${objCard.description}</p>

			<button class="button goods-card-btn add-to-cart" data-id="${objCard.id}">
				<span class="button-price">$${objCard.price}</span>
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

more.addEventListener('click', function (e) {
  e.preventDefault();
  getGoods().then(renderCards);
});
