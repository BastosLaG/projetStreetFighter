// Importation des classes des combattants et autres composants nécessaires.
import { Fighter } from './fighters/Fighter.js';
import { Bastien } from './fighters/Bastien.js';
import { Ludovic } from './fighters/Ludovic.js';
import { Mehdi } from './fighters/Mehdi.js';
import { Tomas } from './fighters/Tomas.js';
import { Stage } from './gestions/Stage.js';
import { FpsCounter } from './gestions/FpsCounter.js';

// Fonction exécutée une fois que la fenêtre a fini de charger.
window.onload = function() {
    // Sélection du canvas et initialisation du contexte de rendu 2D.
    let canvasInfo = document.querySelector('canvas');
    let ctx = canvasInfo.getContext('2d');

    // Définition de la position du sol.
    let floor = 200;

    // Désactivation de l'anti-aliasing pour un style pixel-art.
    ctx.imageSmoothingEnabled = false;

    // Création d'une instance de Perso.
    let bastien = new Bastien(100, floor, 0, floor);
    let bastien2 = new Bastien(300, floor, 0, floor); 

    // Initialisation des objets à dessiner et mettre à jour.
    let objets = [
        new Stage("./assets/Background.jpg"),
        bastien,
        bastien2,
        new FpsCounter(),
    ];

    // Gestion des événements de pression des touches.
    window.addEventListener('keydown', function(event) {
        bastien.handleKey(event);
    });

    // Gestion des événements de relâchement des touches.
    window.addEventListener('keyup', function(event) {
        bastien.handleKeyup(event);
    });

    // Structure pour le suivi du temps entre les frames.
    let frames_time = {
        passed: 0,
        delta: 0,
    };

    // Fonction de la boucle de jeu, appelée à chaque frame.
    function frame(time) {

        // Mise à jour du temps écoulé depuis la dernière frame.
        frames_time = {
            delta: (time - frames_time.passed) / 1000,
            passed: time,
        }

        // Mise à jour de chaque objet.
        for (let objet of objets) {
            objet.update(frames_time, ctx, floor);
        }
        // Dessin de chaque objet.
        for (let objet of objets) {
            objet.draw(ctx);
        }
        // Demande de la prochaine frame.
        window.requestAnimationFrame(frame);
    }

    

    // Début de la boucle de jeu.
    window.requestAnimationFrame(frame);

    // Affichage de débogage.
    console.log(ctx);
    console.log("document is ready!");
}
