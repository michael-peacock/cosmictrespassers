game.Player = me.Entity.extend({
  init: function (x, y) {
	  var settings = {
	          name : "player",
			  image : "player",
	          width : game.data.playerWidth, 
	          height : game.data.playerHeight
	      };
	  this._super(me.Entity, "init", [x, y, settings]);
	  this.z = 2;
      this.dying = false;
      this.alwaysUpdate = true;
	  this.renderable.addAnimation("idle", [0], 1);
	  this.renderable.setCurrentAnimation("idle");
		
	  this.body.setVelocity(4, 0);
	   
	  this.body.collisionType = me.collision.types.PLAYER_OBJECT;
	  this.maxX = me.game.viewport.width - this.width;
      this.name = "PayerEntity";


  },
  update : function (time) {
	    this._super(me.Entity, "update", [time]);
	    

	    if (me.input.isKeyPressed("shoot")) {
	        me.game.world.addChild(me.pool.pull("laser", this.pos.x + game.data.playerWidth/2 - game.Laser.width, this.pos.y - game.Laser.height));
	     
	        // play the "shoot" audio clip
	        me.audio.play("shoot");
	    }

	    
        if (me.input.isKeyPressed("left"))    {
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed("right")) {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        }

	    
	    this.pos.x = this.pos.x.clamp(0, this.maxX);

	    me.collision.check(this);

	    // apply physics to the body (this moves the entity)
        this.body.update(time);

	    return true;
	}
});