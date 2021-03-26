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
const cartTableGoods = document.querySelector('.cart-table__goods');
const cardTableTotal = document.querySelector('.card-table__total');

const getGoods = async () => {
  const result = await fetch('db/db.json');
  if (!result.ok) {
    throw 'Ошибка! ' + result.status;
  }
  return await result.json();
};

const cart = {
  cartGoods: [
    {
      id: '099',
      name: 'Dior Часы',
      price: 999,
      count: 1,
    },
    {
      id: '090',
      name: 'Кеды Converse',
      price: 39,
      count: 3,
    },
  ],
  renderCart() {
    cartTableGoods.textContent = '';
    this.cartGoods.forEach(({ id, name, price, count }) => {
      const trGood = document.createElement('tr');
      trGood.className = 'cart-item';
      trGood.dataset.id = id;

      trGood.innerHTML = `
        <td>${name}</td>
        <td>${price}$</td>
        <td><button class="cart-btn-minus">-</button></td>
        <td>${count}</td>
        <td><button class="cart-btn-plus">+</button></td>
        <td>${price * count}$</td>
        <td><button class="cart-btn-delete">x</button></td>
      `;
      cartTableGoods.append(trGood);
    });

    const totalPrice = this.cartGoods.reduce((sum, item) => {
      return sum + item.price * item.count;
    }, 0);

    cardTableTotal.textContent = totalPrice + '$';
  },
  deleteGood(id) {
    console.log(this.cartGoods);
    this.cartGoods = this.cartGoods.filter(item => id !== item.id);
    this.renderCart();
  },
  minusGood(id) {
    for (const item of this.cartGoods) {
      if (item.id === id) {
        if (item.count <= 1) {
          this.deleteGood(id);
        } else {
          item.count--;
        }

        break;
      }
    }
    this.renderCart();
  },
  plusGood(id) {
    for (const item of this.cartGoods) {
      if (item.id === id) {
        item.count++;
        break;
      }
    }
    this.renderCart();
  },
  addCartGoods(id) {},
};

cartTableGoods.addEventListener('click', e => {
  const target = event.target;

  if (target.tagName === 'BUTTON') {
    const id = target.closest('.cart-item').dataset.id;
    if (target.classList.contains('cart-btn-delete')) {
      cart.deleteGood(id);
    }
    if (target.classList.contains('cart-btn-minus')) {
      cart.minusGood(id);
    }

    if (target.classList.contains('cart-btn-plus')) {
      cart.plusGood(id);
    }
  }
});

// Functions
const openModal = () => {
  cart.renderCart();
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
