// Définition de la classe de base pour un combattant dans le jeu.
export class Fighter {
    // Constructeur de la classe Fighter, appelé lors de la création d'une nouvelle instance.
    constructor(name, x, y, velocity) {
        this.name = name; // Nom du combattant.
        this.image = new Image(); // Image du sprite du combattant.
        this.frames = new Map(); // Stockage des cadres d'animation sous forme de Map.
        this.position = { x, y }; // Position initiale du combattant sur le canvas.
        this.velocity = velocity; // Vitesse de déplacement du combattant.
        this.animationFrame = 1; // Index de la frame d'animation actuelle.
        this.animationtimer = 1; // Chronomètre pour le contrôle de l'animation.
        this.state = 'idle'; // État initial du combattant, 'idle' par défaut.
        this.animation = {}; // Objets contenant les séquences d'animations.
        this.entryPlayed = false; // Indique si l'animation d'entrée a été jouée.
        this.jumping = false; // Indique si le combattant est en train de sauter.
        this.velocityY = 0; // Vitesse verticale pour la gestion des sauts.
        this.gravity = 0.25; // Valeur de la gravité affectant le combattant.
        this.regardeDroite = true; // Booléen indiquant si le combattant regarde à droite.
    }


    // Fonction pour générer une map des frames d'animation.
    gen_map(text, listePosition) {
        for (let i = 1; i - 1 < listePosition.length; i++) {
            // Ajout de chaque frame à la map avec une clé unique.
            this.frames.set(text + i, [listePosition[i - 1], [listePosition[i - 1][2] / 2, listePosition[i - 1][3]]]);
        }
        return this.frames; // Retourne la map mise à jour.
    }

    // Génère un objet contenant des séquences d'animations.
    gen_AnimationObject(animationName, baseName, numFrames) {
        this.animation[animationName] = []; // Crée un tableau pour une animation spécifique.
        for (let i = 1; i <= numFrames; i++) {
            // Remplissage du tableau avec les noms des frames.
            this.animation[animationName].push(`${baseName}-${i}`);
        }
        return this.animation; // Retourne l'objet d'animation mis à jour.
    }

    // Changement de l'état du combattant.
    changeState(newState) {
        if (this.animation[newState]) {
            // Si l'animation existe pour le nouvel état, mise à jour de l'état et réinitialisation de la frame d'animation.
            this.state = newState;
            this.animationFrame = 0;
        } else {
            // Message d'erreur si l'état n'existe pas.
            console.error("État inconnu :", newState);
        }
    }

    // Mise à jour de l'état du combattant.
    update(time, ctx, floor) {
        // Gestion des divers aspects du combattant à chaque frame.
        this.handleEntry(time); // Gestion de l'entrée du combattant.
        this.handleJump(time, floor); // Gestion des sauts.
        this.handleMovement(time, ctx); // Gestion du mouvement.
        this.handleAnimations(time); // Gestion des animations.
    }

    // Gestion de l'entrée du combattant sur la scène.
    handleEntry(time) {
        if (this.state === 'entry' && !this.entryPlayed) {
            this.updateAnimation(time, 'entry', () => {
                this.changeState('idle');
                this.entryPlayed = true;
            });
        }
    }
    // Gestion du saut du combattant.
    handleJump(time, floor) {
        if (this.jumping) {
            this.velocityY += this.gravity;
            

            this.updateAnimation(time, 'jump', () => {
                if (this.position.y >= floor) {
                    this.position.y = floor;
                    this.jumping = false;
                    this.velocityY = 0;
                    this.changeState('idle');
                }
            });

            if (this.position.y > floor) {
                this.position.y = floor;
                this.jumping = false;
                this.velocityY = 0;
                this.changeState('idle');
            }
        }

    }

    // Gestion du mouvement du combattant.
    handleMovement(time, ctx) {
        this.position.x += this.velocity * time.delta;
        this.checkBounds(ctx.canvas.width);
    }
    // Vérification des limites du canvas pour éviter que le combattant ne sorte de l'écran.
    checkBounds(canvasWidth) {
        let spriteData = this.frames.get(this.animation[this.state][this.animationFrame]);
        if (!spriteData) return;

        let spriteWidth = spriteData[0][2];
        if (this.position.x > canvasWidth - spriteWidth / 2) {
            this.position.x = canvasWidth - spriteWidth / 2;
        } else if (this.position.x < spriteWidth / 2) {
            this.position.x = spriteWidth / 2;}
    }
    // Gestion des animations en fonction de l'état du combattant.
    handleAnimations(time) {
        let animationEndHandlers = {
            'punch': () => this.changeState('idle'),
            'hadoken': () => this.changeState('idle'),
            'up_kick': () => this.changeState('idle'),
            'low_kick': () => this.changeState('idle'),
            'ki' : () => this.changeState('idle'),

        };

        if (animationEndHandlers[this.state]) {
            this.updateAnimation(time, this.state, animationEndHandlers[this.state]);
        }
    }

    updateAnimation(time, animationType, onComplete) {
        if (this.animationFrame >= this.animation[animationType].length - 1) {
            onComplete();
        } else if (time.passed > this.animationtimer + 94) {
            this.animationtimer = time.passed;
            this.animationFrame++;
        }
    }

    draw_debug(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(Math.floor(this.position.x) - 4.5, Math.floor(this.position.y));
        ctx.lineTo(Math.floor(this.position.x) + 4.5, Math.floor(this.position.y));
        ctx.moveTo(Math.floor(this.position.x), Math.floor(this.position.y) - 4.5);
        ctx.lineTo(Math.floor(this.position.x), Math.floor(this.position.y) + 4.5);
        ctx.stroke();
    }

    draw(ctx) {
        let frameData = this.frames.get(this.animation[this.state][this.animationFrame]);
        if (!frameData) {
            console.error("Données de frame manquantes pour l'état:", this.state, "et la frame:", this.animationFrame);
            return;
        }

        let [[x, y, width, height], [originX, originY]] = frameData;

        ctx.save();

        if (!this.regardeDroite) {
            ctx.scale(-1, 1);
            ctx.translate(-this.position.x * 2, 0);
        }
        ctx.drawImage(
            this.image,
            x, y,
            width, height,
            Math.floor(this.position.x) - originX, Math.floor(this.position.y) - originY,
            width, height
        );

        this.draw_debug(ctx);

        ctx.restore();
    }
}
