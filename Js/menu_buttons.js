//////*  Start button   *//////
document.getElementById('startButton').addEventListener('click', function () {
    window.location.assign('game.html');
    // mettre les sons de click
});

//////*  Settings button   *//////
document.getElementById('settingButton').addEventListener('click', function () {
    // mettre liens vers settings.html
    // mettre les sons de click
});


//////*  Credits button   *//////
document.getElementById('creditButton').addEventListener('click', function () {
    // mettre liens vers settings.html
    // mettre les sons de click
});

//////*  About buttons   *//////
document.addEventListener("DOMContentLoaded", function () {

    const menuButtons = document.querySelectorAll(".menuButton");

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


// //////*  Disable menu interaction   *//////
// function disableMenuInteraction() {
//     var menuButtons = document.querySelectorAll(".menuButton");
//     menuButtons.forEach(function (button) {
//         button.classList.add("disable-interaction");
//         button.style.opacity = "0";
//     });
// };

// function enableMenuInteraction() {
//     var menuButtons = document.querySelectorAll(".menuButton");
//     menuButtons.forEach(function (button) {
//         button.classList.remove("disable-interaction");
//         button.style.opacity = "1";
//     });
// };

// disableMenuInteraction();
// setTimeout(function () {
//     enableMenuInteraction();
// }, 4500);

// //////*  Remove intro element   *//////
// document.addEventListener('DOMContentLoaded', function() {
//     var introElement = document.querySelector('.intro-background');
//     if (introElement) {
//         introElement.addEventListener('animationend', removeIntroElement);
//     }
// });

// function removeIntroElement() {
//     var introElement = document.querySelector('.intro-background');
//     if (introElement) {
//         introElement.parentNode.removeChild(introElement);
//         // Or introElement.style.display = 'none';
//     }
// };
