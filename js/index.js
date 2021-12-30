// VARIABLES
let employees = [];
let urlAPI = `https://randomuser.me/api/?results=12&nat=US`;
let gridContainer = document.querySelector(".grid-container");
let overlay = document.querySelector(".overlay");
let modalContainer = document.querySelector(".modal-content");
let modalClose = document.querySelector(".modal-close");

//fetch information from API
fetch(urlAPI)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(displayEmployees)
  .catch((err) => console.log(err));

// loops through employee data and adds content to the page through a template literal statement.
function displayEmployees(employeeData) {
  let employees = employeeData;
  let employeeHTML = "";
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
        <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        </div>
        </div>
        `;
  });
  gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture,
  } = employees[index];

  let date = new Date(dob.date);

  let modalHTML = `<div>
        <img class="avatar" src="${picture.large}" />
        </div>
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
  `;
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
  modalContainer.setAttribute("data-index", index);
}

gridContainer.addEventListener("click", (e) => {
  if (e.target !== gridContainer) {
    let card = e.target.closest(".card");
    let index = card.getAttribute("data-index");

    displayModal(index);
  }
});
modalClose.addEventListener("click", () => {
  overlay.classList.add("hidden");
});
