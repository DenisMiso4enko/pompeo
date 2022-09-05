

// burger
const burger = document.querySelector('.burger')
const menu = document.querySelector('.nav')
const barBurger = document.querySelectorAll('.bar')
const body = document.body

burger.addEventListener('click', () => {
    burger.classList.toggle('active')
    menu.classList.toggle('active')
    body.classList.toggle('stopscroll')
})
document.querySelectorAll('.nav__menu').forEach(n => n.addEventListener('click', () => {
    burger.classList.remove('active')
    menu.classList.remove('active')
    body.classList.remove('stopscroll')
}))


// open cart 
const openCartBtn = document.querySelector('#open-cart')
const shoppingCart = document.querySelector('.shoping-cart')
const closeBtnCart = document.querySelector('.btn-close')
const fadeBlock = document.querySelector('#modal')
const fade = document.querySelector('.fade-block')

openCartBtn.addEventListener('click', () => {
    fadeBlock.classList.remove('hidden')
    body.classList.toggle('stopscroll')
    fade.addEventListener('click', function() {
        fade.classList.add('hidden')
        body.classList.remove('stopscroll')
    })
})
closeBtnCart.addEventListener('click', () => {
    fadeBlock.classList.add('hidden')
    body.classList.remove('stopscroll')
})

shoppingCart.addEventListener('click', (event) =>  event.stopPropagation())

window.addEventListener('click', setCounters)
shoppingCart.addEventListener('click', setCounters)
function setCounters(e) {
    let counter 
    if (e.target.dataset.action === 'plus' || e.target.dataset.action === 'minus') {
        const counterWrapper = e.target.closest('.product__desc-amount');
        counter = counterWrapper.querySelector("[data-counter]");
    }

    if (e.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;
      }
      if (e.target.dataset.action === 'minus') {
        if (parseInt(counter.innerText) > 1) {
          counter.innerText = --counter.innerText;
        }
      }
}


const cartData = []

const cartCount = document.querySelector('.btn-cart span')
cartCount.textContent = `${cartData.length}`

// add products to shopping cart
const cartWrapper = document.querySelector('.shopping-cart__container');
checkEmptyCart()
function addProducts(e) {
    if (e.target.hasAttribute('data-cart')) {
        const card = e.target.closest('.products__cards-item');
        const productInfo = {
            id: card.dataset.id,
            img: card.querySelector('.products__photo img').getAttribute('src'),
            name: card.querySelector('.product__name').innerText,
            price: card.querySelector('.product__price').innerText,
            // counter: card.querySelector("[data-counter]").innerText,
        }

        const itemInCart = cartWrapper.querySelector(
            `[data-id="${productInfo.id}"]`
          );

        if (itemInCart) {
            const counterElement = itemInCart.querySelector("[data-counter]");
            //counterElement.innerText = //parseInt(counterElement.innerText) + parseInt(productInfo.counter);
          } else {
            const cartItemHTML = `
            <div class="cart-item" data-id="${productInfo.id}">
                 <div class="cart-item__info">
                     <img src="${productInfo.img}" alt="${productInfo.name}">
                     <h3 class="cart-item__title">${productInfo.name}</h3>
                     <p class="cart-item__price">${productInfo.price}</p>
                     
                     <div class="product__desc-amount">
                           <div class="items__contror" data-action="minus">-</div>
                           <div class="items__counter" data-counter>1</div>
                           <div class="items__contror" data-action="plus">+</div>
                     </div>
                 </div>
                 <button data-action="remove" class="btn-remove">X</button>
             </div>
            `
            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML)
            cartData.push(productInfo)
            cartCount.textContent = `${cartData.length}`
            checkEmptyCart()
          }


       // card.querySelector('[data-counter]').innerText = '1'
    }
}
window.addEventListener('click', addProducts)


shoppingCart.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'remove') {
        const parent = e.target.closest('.cart-item')
        const id = parent.dataset.id
        const index = cartData.indexOf(prodict => prodict.id === id)
        cartData.splice(index, 1)
        parent.remove()
        checkEmptyCart()
        cartCount.textContent = `${cartData.length}`
    }
})

function checkEmptyCart() {
    if (cartData.length === 0) {
        const emptyCartHTML = `
        <h3 id="empty">Your shopping cart is empty</h3>
        `
        cartWrapper.insertAdjacentHTML('afterbegin', emptyCartHTML)
    }
    if (cartData.length > 0) {
        const emptyListEl = document.querySelector('#empty')
        emptyListEl ? emptyListEl.remove() : null
    }
}



// scroll
const sections = document.querySelectorAll('.section')
const links = document.querySelectorAll('.nav__link')
const menuList = document.querySelector('.nav__menu')

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            links.forEach((link) => {
                if (link.getAttribute('href').replace('#', '') === entry.target.id) {
                    link.classList.add('active')
                } else {
                    link.classList.remove('active')
                }
               
            })
        }
    })
}, {
    threshold: 0.3,
})
sections.forEach((section) => observer.observe(section))

menuList.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav__link')) {
        e.preventDefault()
        const id = e.target.getAttribute('href').replace('#', '')
        window.scrollTo({
            top: document.getElementById(id).offsetTop,
            behavior: "smooth",
        })
    }
})

