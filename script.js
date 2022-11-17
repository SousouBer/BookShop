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

    fragment.appendChild(bookContainer);
    container.appendChild(fragment);
    bookContainer.appendChild(imgContainer);
    bookContainer.appendChild(bookAuthor);
    imgContainer.appendChild(bookImage);
    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(purchaseInfo);
  }

  const showMore = document.getElementsByClassName("addToBagBtn");
  [...showMore].forEach((button) => {
    button.addEventListener("click", addToBag);
  });

  function addToBag() {
    const bookAuthor = this.closest(".book-container").children[1].textContent;
    const book = booksArray.find((item) => item.author === bookAuthor);
    cartItems.push(book);
    updateCartItems();


    // cartItems.forEach((item) => {
    //   const cartItem = document.createElement("div");
    //   cartItem.classList.add("cart-item");

    //   cartItem.innerHTML = `
    //   <div class="item-img-container">
    //   <img
    //     class="item-img"
    //     src="../BookShop/${item.imageLink}"
    //     alt="Item 1"
    //   />
    // </div>
    // <div class="item-info">
    //   <div class="title-and-price">
    //     <div class="item-title">${item.author}</div>
    //     <span class="item-price">$${item.price}</span>
    //   </div>
    //   <span class="stock">In stock</span>
    //   <p class="item-description">${item.title}</p>
    //   <div class="item-amount">
    //     <p class="amount">
    //       <span class="increase">+</span
    //       ><span class="amount-number">${item.amount}</span
    //       ><span class="decrease">-</span>
    //     </p>
    //     <p class="remove-item">
    //       Remove from the cart - <span class="remove_item--x">X</span>
    //     </p>
    //   </div>
    // </div>
    //   `;

    //   cartContainer.appendChild(cartItem);

      // const removeCart = document.getElementsByClassName("remove_item--x");
      // const decreaseAmount = document.getElementsByClassName('decrease');
      // const increaseAmount = document.getElementsByClassName('increase');

      // Array.from(decreaseAmount).forEach(btn => {
      //   btn.addEventListener('click', (e) => {
      //     const element = e.target.closest('.cart-item');
      //     // const elArray = this.closest(".book-container").children[1].textContent;
      //     const elArray = element.getElementsByClassName('item-title')[0].textContent;
      //     const el = booksArray.find(el => el.author === elArray);
      //     el.amount--;

      //   });
      // });


      // [...removeCart].forEach((removeItem) => {
      //   removeItem.addEventListener("click", (e) => {
      //     const element = e.target.closest('.cart-item');
      //     element.remove();
      //   });
      // });
    // });
}

const removeCart = document.getElementsByClassName("remove_item--x");

const increaseAmount = document.getElementsByClassName('increase');
// console.log(decreaseAmount);

      // Array.from(decreaseAmount).forEach(btn => {
      //   btn.addEventListener('click', (e) => {
      //     const element = e.target.closest('.cart-item');
      //     // const elArray = this.closest(".book-container").children[1].textContent;
      //     const elArray = element.getElementsByClassName('item-title')[0].textContent;
      //     const el = booksArray.find(el => el.author === elArray);
      //     el.amount--;
      //     console.log('clicked');
      //   });
      // });

      


      [...removeCart].forEach((removeItem) => {
        removeItem.addEventListener("click", (e) => {
          const element = e.target.closest('.cart-item');
          element.remove();
        });
      });



      function decreaseItemAmount(){
        const decreaseAmount = document.getElementsByClassName('decrease');

        Array.from(decreaseAmount).forEach(btn => {
          btn.addEventListener('click', (e) => {
            const element = e.target.closest('.cart-item');
            // const elArray = this.closest(".book-container").children[1].textContent;
            const elArray = element.getElementsByClassName('item-title')[0].textContent;
            const el = booksArray.find(el => el.author === elArray);
            el.amount--;
            updateCartItems();
          });
        });
      }

function updateCartItems(){
  const cartContainer = document.querySelector(".cart-container");
  cartContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
    <div class="item-img-container">
    <img
      class="item-img"
      src="../BookShop/${item.imageLink}"
      alt="Item 1"
    />
  </div>
  <div class="item-info">
    <div class="title-and-price">
      <div class="item-title">${item.author}</div>
      <span class="item-price">$${item.price}</span>
    </div>
    <span class="stock">In stock</span>
    <p class="item-description">${item.title}</p>
    <div class="item-amount">
      <p class="amount">
        <span class="increase">+</span
        ><span class="amount-number">${item.amount}</span
        ><span class="decrease">-</span>
      </p>
      <p class="remove-item">
        Remove from the cart - <span class="remove_item--x">X</span>
      </p>
    </div>
  </div>
    `;
    cartContainer.appendChild(cartItem);
    decreaseItemAmount();
  })}
}
