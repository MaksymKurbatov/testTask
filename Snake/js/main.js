/*
 * snake, html5 snake game with pixi.js
 *
 * http://oguzhaneroglu.com/games/snake/
 * https://github.com/rohanrhu/snake
 *
 * Copyright (C) 2017, Oğuzhan Eroğlu <rohanrhu2@gmail.com>
 * Licensed under MIT
 */

var game;
const canvas = document.getElementById('mycanvas');


    game = new Game({

        view: canvas
    });

    game.newGame();
    game.play();
