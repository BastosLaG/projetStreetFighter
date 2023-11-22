
var click = new Audio('./assets/sound/main_menu/dmc5_button.mp3');

//////*  Start button   *//////
document.getElementById('startButton').addEventListener('click', function () {
    click.play(); // Jouer l'effet sonore
    setTimeout(function() {
        window.location.assign('game.html');
    }, 590); // Retarder de 300 millisecondes (ajustez selon vos besoins)
});

//////*  Settings button   *//////
document.getElementById('settingButton').addEventListener('click', function () {
    click.play(); // Jouer l'effet sonore
    // Mettre liens vers settings.html
});

//////*  Credits button   *//////
document.getElementById('creditButton').addEventListener('click', function () {
    click.play(); // Jouer l'effet sonore
    // Mettre liens vers credits.html
});

//////*  About buttons   *//////
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

document.addEventListener("DOMContentLoaded", function () {
    var introVideo = document.getElementById('intro');
    if (introVideo) {
        introVideo.onended = function() {
            // Actions à effectuer après la fin de la vidéo
            enableMenuInteraction(); // Réactiver les interactions du menu
            introVideo.style.display = 'none'; // Cacher la vidéo
        };
    }

    disableMenuInteraction(); // Désactiver les interactions du menu pendant la vidéo
});
//////*  Disable menu interaction   *//////
function disableMenuInteraction() {
    var menuButtons = document.querySelectorAll(".menuButton");
    menuButtons.forEach(function (button) {
        button.classList.add("disable-interaction");
        button.style.opacity = "0";
    });
};

function enableMenuInteraction() {
    var menuButtons = document.querySelectorAll(".menuButton");
    menuButtons.forEach(function (button) {
        button.classList.remove("disable-interaction");
        button.style.opacity = "1";
    });
};

disableMenuInteraction();
setTimeout(function () {
    enableMenuInteraction();
}, 21800);

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
