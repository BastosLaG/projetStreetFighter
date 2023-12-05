const container = document.querySelector(".container");
const containerCarrousel = container.querySelector(".container-carrousel");
const carrousel = container.querySelector(".carrousel");
const carrouselItems = carrousel.querySelectorAll(".carrousel-item");

// Iniciamos variables que cambiaran su estado.
let isMouseDown = false;
let currentMousePos = 0;
let lastMousePos = 0;
let lastMoveTo = 0;
let moveTo = 0;

const createCarrousel = () => {
  const carrouselProps = onResize();
  const length = carrouselItems.length; // Longitud del array
  const degress = 360 / length; // Grados por cada item
  const gap = 20; // Espacio entre cada item
  const tz = distanceZ(carrouselProps.w, length, gap)
  
  const fov = calculateFov(carrouselProps);
  const height = calculateHeight(tz);

  container.style.width = tz * 2 + gap * length + "px";
  container.style.height = height + "px";

  carrouselItems.forEach((item, i) => {
    const degressByItem = degress * i + "deg";
    item.style.setProperty("--rotatey", degressByItem);
    item.style.setProperty("--tz", tz + "px");
  });
};

// Funcion que da suavidad a la animacion
const lerp = (a, b, n) => {
  return n * (a - b) + b;
};

// https://3dtransforms.desandro.com/carousel
const distanceZ = (widthElement, length, gap) => {
  return (widthElement / 2) / Math.tan(Math.PI / length) + gap; // Distancia Z de los items
}

// Calcula el alto del contenedor usando el campo de vision y la distancia de la perspectiva
const calculateHeight = z => {
  const t = Math.atan(90 * Math.PI / 180 / 2);
  const height = t * 2 * z;

  return height;
};

// Calcula el campo de vision del carrousel
const calculateFov = carrouselProps => {
  const perspective = window
    .getComputedStyle(containerCarrousel)
    .perspective.split("px")[0];

  const length =
    Math.sqrt(carrouselProps.w * carrouselProps.w) +
    Math.sqrt(carrouselProps.h * carrouselProps.h);
  const fov = 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI);
  return fov;
};

// Obtiene la posicion X y evalua si la posicion es derecha o izquierda
const getPosX = x => {
  currentMousePos = x;

  moveTo = currentMousePos < lastMousePos ? moveTo - 2 : moveTo + 2;

  lastMousePos = currentMousePos;
};

const update = () => {
  lastMoveTo = lerp(moveTo, lastMoveTo, 0.05);
  carrousel.style.setProperty("--rotatey", lastMoveTo + "deg");

  requestAnimationFrame(update);
};

const onResize = () => {
  // Obtiene la propiedades del tamaño de carrousel
  const boundingCarrousel = containerCarrousel.getBoundingClientRect();

  const carrouselProps = {
    w: boundingCarrousel.width,
    h: boundingCarrousel.height
  };

  return carrouselProps;
};

const initEvents = () => {
  // Eventos del mouse
  carrousel.addEventListener("mousedown", () => {
    isMouseDown = true;
    carrousel.style.cursor = "grabbing";
  });
  carrousel.addEventListener("mouseup", () => {
    isMouseDown = false;
    carrousel.style.cursor = "grab";
  });
  container.addEventListener("mouseleave", () => (isMouseDown = false));

  carrousel.addEventListener(
    "mousemove",
    e => isMouseDown && getPosX(e.clientX)
  );

  // Eventos del touch
  carrousel.addEventListener("touchstart", () => {
    isMouseDown = true;
    carrousel.style.cursor = "grabbing";
  });
  carrousel.addEventListener("touchend", () => {
    isMouseDown = false;
    carrousel.style.cursor = "grab";
  });
  container.addEventListener(
    "touchmove",
    e => isMouseDown && getPosX(e.touches[0].clientX)
  );

  window.addEventListener("resize", createCarrousel);

  update();
  createCarrousel();
};

initEvents();
document.getElementById('J1').addEventListener('click', function () {
    // mettre les sons de click

});

document.getElementById('J2').addEventListener('click', function () {
    // mettre les sons de click

});

document.getElementById('J3').addEventListener('click', function () {
    // mettre les sons de click

});

document.addEventListener("DOMContentLoaded", function () {

    let menuButtons = document.querySelectorAll(".menuButton");

    menuButtons.forEach(function (button) {
        let textSize = parseInt(window.getComputedStyle(button).fontSize);
        let textSizeHover = textSize + (textSize * 0.1);

        button.addEventListener("mouseover", function () {
            button.style.fontSize = textSizeHover + "px";
            button.style.textShadow = "0 0 10px #f6f2ff";
            button.setAttribute('title', button.textContent);
        });

        button.addEventListener("mouseout", function () {
            button.style.fontSize = textSize + "px";
            button.style.textShadow = "none";
        });
    });
});