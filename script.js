fetch("books.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return addData(data);
  });

function addData(books) {
  let booksArray = books.slice();
  const cartItems = [];

  const main = document.querySelector("main");
  const container = document.createElement("div");

  container.classList.add("container");
  main.appendChild(container);
  for (let book of booksArray) {
    const { author, imageLink, title, price, desc } = book;


    const fragment = new DocumentFragment();
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");
    bookContainer.id = book.id;

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    const purchaseInfo = document.createElement("div");
    const addAndShowMore = document.createElement("div");
    const addToBagBtn = document.createElement("button");
    const showMore = document.createElement("button");

    addAndShowMore.classList.add("addAndShowMore");
    purchaseInfo.classList.add("purchaseInfo");
    showMore.classList.add("showMore");
    addToBagBtn.classList.add("addToBagBtn");
    addToBagBtn.innerText = "Add to bag";
    showMore.innerText = "Show more";

    const bookAuthor = document.createElement("h2");
    const bookImage = document.createElement("img");
    const bookTitle = document.createElement("p");
    bookTitle.classList.add("book-title");
    const bookDescription = document.createElement("p");

    const bookCost = document.createElement("span");
    bookCost.classList.add("book-cost");

    bookAuthor.textContent = author;
    bookImage.src = imageLink;
    bookTitle.textContent = title;
    bookCost.textContent = `$${price}`;

    purchaseInfo.appendChild(bookCost);
    purchaseInfo.appendChild(addAndShowMore);
    addAndShowMore.appendChild(showMore);
    addAndShowMore.appendChild(addToBagBtn);

    bookContainer.appendChild(imgContainer);
    imgContainer.appendChild(bookImage);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(purchaseInfo);
    fragment.appendChild(bookContainer);
    container.appendChild(fragment);
  }

  const showMore = document.getElementsByClassName("addToBagBtn");
  [...showMore].forEach((button) => {
    button.addEventListener("click", addToBag);
  });

  function addToBag() {
    const bookId = parseFloat(this.closest('.book-container').id);
    const book = booksArray.find((item) => item.id === bookId);

    if(cartItems.indexOf(book) === -1){
      cartItems.push(book);
    } else {
      cartItems[cartItems.indexOf(book)].amount++;
    }
    updateCartItems();
  }

function updateCartItems(){
  const totalSum = cartItems.reduce((acc, item) => acc + item.price * item.amount, 0);
  const total = document.querySelector('.total');
  total.textContent = totalSum;

  const cartContainer = document.querySelector(".cart-container");
  cartContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.id = item.id;

    cartItem.innerHTML = `
    <div class="item-img-container">
    <img
      class="item-img"
      src="../BookShop/${item.imageLink}"
      alt="Item"
    />
  </div>
  <div class="item-info">
    <div class="title-and-price">
      <div class="item-title">${item.author}</div>
      <span class="item-price">$${item.price * item.amount}</span>
    </div>
    <span class="stock">In stock</span>
    <p class="item-description">${item.title}</p>
    <div class="item-amount">
      <p class="amount">
        <span id="increase">+</span
        ><span id="amount-number">${item.amount}</span
        ><span id="decrease">-</span>
      </p>
      <p class="remove-item">
        Remove from the cart - <span id="remove_item--x">X</span>
      </p>
    </div>
  </div>
    `;
    cartContainer.appendChild(cartItem);

    const decrease = cartItem.querySelector('#decrease');
    const increase = cartItem.querySelector('#increase');
    const removeItem = cartItem.querySelector('#remove_item--x');

    removeItem.addEventListener('click', (e) => {
      const item = e.target.closest('.cart-item');
      const itemInCart = cartItems.find(el => el.id === parseInt(item.id));

      cartItems.splice(cartItems.indexOf(itemInCart), 1);
      item.remove();
      updateCartItems();

    })

    increase.addEventListener('click', () => {
      item.amount++;
      updateCartItems();
    })

    decrease.addEventListener('click', () => {
      if(item.amount <= 1) {
        return;
      } else {
        item.amount--;
        updateCartItems();
      }
    })
  })}
}
