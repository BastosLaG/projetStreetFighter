import { Bastien } from './fighters/Bastien.js';
import { Ludovic } from './fighters/Ludovic.js';
import { Mehdi } from './fighters/Mehdi.js';
import { Tomas } from './fighters/Tomas.js';
import { Stage } from './gestions/Stage.js';
import { FpsCounter } from './gestions/FpsCounter.js';
import { FighterDirection, FighterState } from './constants/dfight.js';
import { STAGE_FLOOR } from './constants/stage.js';


function populateMoveDropdown() {
    let dropdown = document.getElementById('state-dropdown');
    
    Object.entries(FighterState).forEach(([, value]) => {
        let option = document.createElement('option');
        option.setAttribute('value', value);
        option.innerText = value;
        dropdown.appendChild(option);
    });
}
    
function handleFormSubmit(event, fighters) {
    event.preventDefault();

    let selectedCheckbox = Array
    .from(event.target.querySelectorAll('input:checked'))
    .map(checkbox => checkbox.value);

    let options = event.target.querySelector('select');
    
    fighters.forEach(fighters => {
        if (selectedCheckbox.includes(fighters.name)) {
            fighters.changeState(options.value);
        }
    });
}


window.addEventListener('load', function() { 
    populateMoveDropdown();

    let canvasInfo = document.querySelector('canvas');
    let ctx = canvasInfo.getContext('2d');
    

    ctx.imageSmoothingEnabled = false;

    let fighters = [
        new Bastien(100, STAGE_FLOOR, FighterDirection.RIGHT),
        new Mehdi(300, STAGE_FLOOR, FighterDirection.LEFT),
    ];

    let objets = [
        new Stage("./assets/Background.jpg"),
        ...fighters,
        new FpsCounter(),
    ];

    let frames_time = {
        passed: 0,
        delta: 0,
    };


    // Fonction de la boucle de jeu, appelée à chaque frame.
    function frame(time) {
        window.requestAnimationFrame(frame);
        frames_time = {
            delta: (time - frames_time.passed) / 1000,
            passed: time,
        }
        for (let objet of objets) {
            objet.update(frames_time, ctx, STAGE_FLOOR);
        }
        for (let objet of objets) {
            objet.draw(ctx);
        }
    }

    this.document.addEventListener('submit', (event) => handleFormSubmit(event,fighters));
    
    window.requestAnimationFrame(frame);
    console.log(ctx);
    console.log("document is ready!");
});
