fetch('books.json') 
        .then(response => {
            return response.json();
        })
        .then(data => {
          return addInfo(data);
        });


function addInfo(books){
  const main = document.createElement('main');
  const contentContainer = document.createElement('div');

  contentContainer.classList.add('content-container');
  document.body.appendChild(main);
  main.appendChild(contentContainer);
  
  for(let book of books){
    const { author, imageLink, title, price, desc} = book;

    const divContainer = document.createElement('div');
    divContainer.classList.add('container');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container')

    const h2 = document.createElement('h2');
    const image = document.createElement('img');
    const bookTitle = document.createElement('p');
    const description = document.createElement('p');
    const cost = document.createElement('span');

    h2.textContent = author;
    image.src = imageLink;
    bookTitle.textContent = title;
    cost.textContent = `Price: ${price}`;

    contentContainer.appendChild(divContainer);
    divContainer.appendChild(h2);
    divContainer.appendChild(imgContainer);
    imgContainer.appendChild(image)
    divContainer.appendChild(bookTitle);
    divContainer.appendChild(cost);
  }
}