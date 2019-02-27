var snake;
var scl = 20;
var app;
var food;
var tail =[];
var init = function () {
    var loader = PIXI.loader
        .add('images/bg.png')
        .once('complete', function (loader,resorses) {
            start();
        }).
        load();
    start = function () {
        const canvas = document.getElementById('mycanvas');
        app = new PIXI.Application({
            view: canvas,
            width: window.innerWidth,eight: window.innerHeight
        });
        snake.init();
        app.renderer.autoResize = true;
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.ticker.FPS=10;
        app.ticker.add(function (delta) {
           snake.update();
        if(snake.eat(food)){
            snake.total++;
            app.stage.removeChild(food);
            placemeal();
            snake.addTail();
        };
        // snake.show();
        })
        placemeal();
        window.addEventListener('keydown', handler);
        window.addEventListener('resize', onResize);
    }

}
init();
snake = new Snake();
function Snake (){
    const rect = new PIXI.Graphics();
        rect.beginFill(0xFFFF00);
        rect.drawRect(this.x, this.y, scl, scl);

    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 1;
    this.dir = function(x,y){
        this.xspeed = x;
        this.yspeed = y;
    }
    this.init = function () {
        tail.push(rect);
        app.stage.addChild(rect);
    }
    this.addTail= function (){
        const pixes = new PIXI.Graphics();
        pixes.beginFill(0xFFFF00);
        pixes.drawRect(this.x, this.y, scl, scl);
        tail.push(pixes)
        app.stage.addChild(pixes);
    }

    this.eat = function (food){
        var ab = rect.getBounds();
        var bb = food.getBounds();
        return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;

    }

    this.update = function () {
            if (this.x >= 0 && this.x < window.innerWidth - scl) {
                tail[0].x = this.x = this.x + this.xspeed * scl;
            }
            if (this.y >= 0 && this.y < window.innerHeight - scl) {
            if(this.total>1){                                   //if more than 1 pieces
                for(let i=1; i<tail.length; i++ ){
                    tail[i].y = tail[i-1].y;                   //should replace all snake pieces on one step forward
                    tail[i].x = tail[i-1].x;
                    console.log("Trail.Y", tail[1].y);
                }
            }
            tail[0].y = this.y = this.y + this.yspeed * scl; // move head snake one step forward
            console.log("Head.Y",tail[0].y);
            }
    }
};
var handler = function (event) {
    if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
    if (event.keyCode == 37) { // LEFT
       snake.dir(-1,0);
    }
    else if (event.keyCode == 39) { // RIGHT
        snake.dir(1,0);
    } else if (event.keyCode == 38) { // UP
        snake.dir(0,-1);
    } else if (event.keyCode == 40) { // DOWN
        snake.dir(0,1);
    }
}
var onResize = function (event) {
   //app.renderer.resize(window.innerWidth, window.innerHeight);
};

function placemeal(){
    food = new PIXI.Graphics();
    food.beginFill(0x7FFF00);
    food.drawRect(randomInt(5, this.app.renderer.view.width) - scl, randomInt(5, this.app.renderer.view.height), scl, scl);
    app.stage.addChild(food);

}
onResize();
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



