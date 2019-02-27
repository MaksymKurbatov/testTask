function Snake (){

    var ball =PIXI.Sprite.fromImage('images/bg.png');;
    ball.x = this.x;
    ball.y = this.y;

    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;

    this.dir = function(x,y){
        this.xspeed = x;
        this.yspeed = y;
    }
    this.init = function () {
        app.stage.addChild(ball);
    }
    this.update = function () {
        ball.x = this.x = this.x + this.xspeed;
        ball.y = this.y = this.y+ this.yspeed;
        // console.log(this)
    }

};