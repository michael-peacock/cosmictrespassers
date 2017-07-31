game.EnemyLaser = me.Entity.extend({
    init : function (x, y) {
        this._super(me.Entity, "init", [x, y, { width: game.EnemyLaser.width, height: game.EnemyLaser.height }]);
        this.z = 5;
        this.body.setVelocity(0, 10);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        this.renderable = new (me.Renderable.extend({
            init : function () {
                this._super(me.Renderable, "init", [0, 0, game.EnemyLaser.width, game.EnemyLaser.height]);
            },
            destroy : function () {},
            draw : function (renderer) {
                var color = renderer.getColor();
                renderer.setColor('#FF2222');
                renderer.fillRect(0, 0, this.width, this.height);
                renderer.setColor(color);
            }
        }));
        this.alwaysUpdate = true;
    },

    update : function (time) {
        this.body.vel.y += this.body.accel.y * time / 1000;
        if (this.pos.y + this.height <= 0) {
            me.game.world.removeChild(this);
        }

        this.body.update();
        me.collision.check(this);

        return true;
    },
    onCollision : function (res, other) {
        if (other.body.collisionType === me.collision.types.PLAYER_OBJECT) {
            me.game.world.removeChild(this);
            game.data.playerLives--;
            
            //if (game.data.playerLives == 0) {
            //	me.state.change(me.state.SCORE);
            //} 
            //else {
                game.playScreen.resetPlayerEntity();
            //}
            return true;
        }
        return false;
    }    
});

game.EnemyLaser.width = 5;
game.EnemyLaser.height = 15;