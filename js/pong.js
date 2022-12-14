
    var canvas;
    var game;
    var i = 0;
    var j = 0;
    var coup = 0;
    const PLAYER_HEIGHT = 100;
    const PLAYER_WIDTH = 5;
    function draw() {
        var context = canvas.getContext('2d');

     /*-------------------------------------------------*/
    document.getElementById("pong").disabled = true;
    document.getElementById("snake").disabled = false;
    document.getElementById("spacein").disabled = false;
    document.getElementById("doodle").disabled = false;
    /*-------------------------------------------------*/
        // Draw field
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        // Draw middle line
        context.strokeStyle = 'white';
        context.beginPath();
        context.moveTo(canvas.width / 2, 0);
        context.lineTo(canvas.width / 2, canvas.height);
        context.stroke();
        // Draw score
        context.font = '50px Arial';
        context.fillStyle = 'white';
        context.fillText(i, canvas.width / 4, canvas.height / 2);
        context.fillText(j, 3 * canvas.width / 4, canvas.height / 2);
    
        //marque un texte en haut de lecran
        context.font = '20px Arial';
        context.fillStyle = 'white';
        context.fillText("Entrée pour restart ", 0, 50);
    
        //compteur de coup
        context.font = '25px Arial';
        context.fillStyle = 'grey';
        //place texte en bas à gauche
        context.fillText("Coup: " + coup, 0, canvas.height - 10);
    
    
    
        // Draw players
    context.fillStyle = 'white';
    context.fillRect(0, game.player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    context.fillRect(canvas.width - PLAYER_WIDTH, game.computer.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    // Draw ball
    context.beginPath();
    context.fillStyle = 'white';
    context.arc(game.ball.x, game.ball.y, game.ball.r, 0, Math.PI * 2, false);
    context.fill();
    }
    
    document.addEventListener('DOMContentLoaded', function () {
        canvas = document.getElementById('canvas');
        game = {
            player: {
                y: canvas.height / 2 - PLAYER_HEIGHT / 2
            },
            computer: {
                y: canvas.height / 2 - PLAYER_HEIGHT / 2
            },
            ball: {
                x: canvas.width / 2,
                y: canvas.height / 2,
                r: 5,
                speed: {
                    x: 2,
                    y: 2
                }
            }
        }
        draw();
        play();
    });
    
    function play() {
        game.ball.x += game.ball.speed.x;
        game.ball.y += game.ball.speed.y;
        draw();
        ballMove();
        computerMove();
        winable();
        score();
    
        requestAnimationFrame(play);
    }
    
    document.addEventListener('mousemove', playerMove);
    function playerMove(event) {
        var canvasLocation = canvas.getBoundingClientRect();
        var mouseLocation = event.clientY - canvasLocation.y;
        game.player.y = mouseLocation - PLAYER_HEIGHT / 2;
    
        if (mouseLocation < PLAYER_HEIGHT / 2) {
            game.player.y = 0;
        } else if (mouseLocation > canvas.height - PLAYER_HEIGHT / 2) {
            game.player.y = canvas.height - PLAYER_HEIGHT;
        } else {
            game.player.y = mouseLocation - PLAYER_HEIGHT / 2;
        }
    }
    
    
    function computerMove() {
        game.computer.y += game.ball.speed.y * 0.85;
    }
    function ballMove() {
        // Rebounds on top and bottom
        if (game.ball.y > canvas.height || game.ball.y < 0) {
            game.ball.speed.y *= -1;
        }
        if (game.ball.x > canvas.width + 1 ) {
            collide(game.computer);
            coup++;
        } else if (game.ball.x < PLAYER_WIDTH) {
            collide(game.player);
            coup++;
        }
        
        game.ball.x += game.ball.speed.x;
        game.ball.y += game.ball.speed.y;
    }
    
    function collide(player) {
        // The player does not hit the ball
        if (game.ball.y < player.y || game.ball.y > player.y + PLAYER_HEIGHT) {
            // Set ball and players to the center
            game.ball.x = canvas.width / 2;
            game.ball.y = canvas.height / 2;
            game.player.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
            game.computer.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
            
            // Reset speed
            game.ball.speed.x = 2;
        } else {
            // Increase speed and change direction
            game.ball.speed.x *= -1.2;
        }
        changeDirection(player.y);
    }
    
    function changeDirection(playerPosition) {
        var impact = game.ball.y - playerPosition - PLAYER_HEIGHT / 2;
        var ratio = 100 / (PLAYER_HEIGHT / 2);
        // Get a value between 0 and 10
    
        game.ball.speed.y = Math.round(impact * ratio / 10);
    }
    
    function winable() {
        if (i == 10) {
            alert("You win!");
            i=0;
        } else if (j == 10) {
            alert("You lose!");
            j=0;
        }
    }
    
    function score() {
        
        //si la balle touche le bord droit
        if (game.ball.x > canvas.width + 1) {
            i++;
        }
        //si la balle touche le bord gauche
        if (game.ball.x < 0) {
            j++;
        }
        console.log(" player: " + i + " computer: " + j);
    }
    
    document.addEventListener('keydown', stop);
    function stop(event) {
        //si j'appuie sur entrée
        if (event.keyCode == 13) {
        cancelAnimationFrame(play);
    
        game.ball.x = canvas.width / 2;
        game.ball.y = canvas.height / 2;
        game.player.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
        game.computer.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
        // Reset speed
        game.ball.speed.x = 2;
        game.ball.speed.y = 2;
    
        i = 0;
        j = 0;
        coup = 0;
        }
    }
    
    





