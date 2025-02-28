const basilChefs = ["mama", "papa", "baby"];
const basilTexture = ["greasy", "frozen", "spicy"];
const titleElement = document.querySelector('h2')

function random(array) {
    const max = array.length
    const randomIndex = Math.floor(Math.random() * max)
    return array[randomIndex]
}

const recipeName = `My ${random(basilChefs)}'s ${random(basilTexture)} pesto`

//console.log(recipeName)

titleElement.innerHTML = recipeName

// === popover === //

const modal = document.querySelector(".modal");
const modalOuter = document.querySelector(".modal-outer");


function showPopover(event) {
    if (event.target.matches(".beta")) {
      modalOuter.classList.add("open");
    } else if (event.target.matches(".closer, .modal-outer")) {
      modalOuter.classList.remove("open");
    } else return;
    event.preventDefault();
  }

// function showPopover(event) {
//     if (!event.target.matches(".beta, .closer")) return;
//     modalOuter.classList.toggle("open");
//     event.preventDefault();
//   }

document.addEventListener('click', showPopover)