const generator = document.querySelector(".btn-generator");
const colorName = document.querySelectorAll(".color h3");
const colorDivs = document.querySelectorAll(".colors .color");
const copyLibrary = document.querySelector(".library-color .text-color");
const closeLibrary = document.querySelector(".library-color span");
const LibraryColor = document.querySelector(".library-color");
const Library = document.querySelector(".library");
const popup = document.querySelector(".popup-message");
const text = document.querySelector(".message");

let arrayColor = [];

const generateColor = () => {
  let clr = `#`;
  let arrayItems = ["A", "B", "C", "D", "E", "F", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let i = 0; i < 6; i++) {
    clr += `${arrayItems[Math.floor(Math.random() * arrayItems.length)]}`;
  }

  return clr;
};

const randomColors = () => {
  colorDivs.forEach((div, index) => {
    const color = generateColor();
    div.style.backgroundColor = color;
    colorName[index].innerHTML = color;

    checkContrast(color, index);
  });
};

const checkContrast = (color, index) => {
  const luminance = chroma(color).luminance();

  if (luminance > 0.5) {
    colorName[index].style.color = "black";
  } else {
    colorName[index].style.color = "white";
  }
};

const GetColor = (e) => {
  const color = e.target.textContent;
  arrayColor.push(color);
  popupMessage(`color added in library! 😊👌`);
  randomColorLibrary(arrayColor);
};

const popupMessage = (message) => {
  popup.classList.add("active");
  text.innerHTML = `<h3>${message}</h3>`;
  setTimeout(() => {
    popup.classList.remove("active");
  }, 1500);
};

const randomColorLibrary = (arrayColor) => {
  copyLibrary.textContent = "";
  arrayColor.forEach((color) => {
    copyLibrary.innerHTML += `
            <div><p>${color}</p>
            <i class="fa-solid fa-copy"></i></div>
             `;
  });
};

closeLibrary.addEventListener("click", () => {
  LibraryColor.classList.remove("active");
});

Library.addEventListener("click", () => {
  LibraryColor.classList.add("active");
});

colorName.forEach((nameColor) => {
  nameColor.addEventListener("click", GetColor);
});

copyLibrary.addEventListener("click", (e) => {
  const elem = e.target.previousElementSibling;

  if (e.target.classList.contains("fa-copy")) {
    setTimeout(() => {
      popupMessage("Color copied  😊👌!");
    }, 200);
  }

  if (elem) {
    navigator.clipboard.writeText(elem.textContent);
  }
});

generator.addEventListener("click", randomColors);

randomColors();
