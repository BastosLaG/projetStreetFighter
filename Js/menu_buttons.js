
var click = new Audio('./assets/sound/main_menu/dmc5_button.mp3');

function openSettings() {
    document.getElementById("settingsOverlay").style.display = "block";
}

function closeSettings() {
    document.getElementById("settingsOverlay").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("volumeControl").addEventListener("input", function(e) {
        var volume = e.target.value;
        document.getElementById("music").volume = volume;
    });
});

function toggleCredits() {
    var creditsOverlay = document.getElementById("CreditsOverlay");
    if (creditsOverlay.style.display === "block") {
        creditsOverlay.style.display = "none";
    } else {
        creditsOverlay.style.display = "block";
    }
}

//////*  Credits button   *//////
document.getElementById('creditButton').addEventListener('click', function () {
    click.play(); 
    toggleCredits();
});

//////*  Start button   *//////
document.getElementById('startButton').addEventListener('click', function () {
    click.play(); 
    setTimeout(function() {
        window.location.assign('game.html');
    }, 530); 
});

//////*  Demo button   *//////
document.getElementById('DemoButton').addEventListener('click', function () {
    click.play();
    setTimeout(function() {
        window.location.assign('demo.html');
    }, 530);
});


//////*  Settings button   *//////
document.getElementById('settingButton').addEventListener('click', function () {
    click.play(); 
    openSettings();
});

//////*  Credits button   *//////
document.getElementById('creditButton').addEventListener('click', function () {
    click.play();
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
