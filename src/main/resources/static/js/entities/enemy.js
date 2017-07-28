game.Invader1 = me.Entity.extend({
  init: function (x, y) {
      this._super(me.Entity, "init", [x, y, {
          image : "invader1",
          width : 16,
          height : 16
      }]);
      
   this.chooseShipImage();
   this.body.setVelocity(0, 0);
   this.body.collisionType = me.collision.types.ENEMY_OBJECT;

   
  },

  chooseShipImage: function () {
	    var frame = ~~(Math.random() * 3);
	    this.renderable.addAnimation("idle", [0,1], 500);
	    this.renderable.setCurrentAnimation("idle");
  }, 

  update : function (time) {
	    this._super(me.Entity, "update", [time]);

	    this.body.update();

	    return true;
	}
});

game.Invader2 = me.Entity.extend({
	  init: function (x, y) {
	      this._super(me.Entity, "init", [x, y, {
	          image : "invader2",
	          width : 22,
	          height : 22
	      }]);
	      
	   this.chooseShipImage();
	   this.body.setVelocity(0, 0);
	   this.body.collisionType = me.collision.types.ENEMY_OBJECT;

	   
	  },

	  chooseShipImage: function () {
		    this.renderable.addAnimation("idle", [0,1], 500);
		    this.renderable.setCurrentAnimation("idle");
	  }, 

	  update : function (time) {
		    this._super(me.Entity, "update", [time]);
		    
		    var randomInt = common.functions.getRandomInt(1,1000);
		    
	        
		    if (randomInt == 50) {
		        me.game.world.addChild(me.pool.pull("enemyLaser", this.pos.x - game.EnemyLaser.width, this.pos.y - game.EnemyLaser.height));
		     
		        // play the "shoot" audio clip
		        //me.audio.play("shoot");
		    }		    
		    
		    this.body.update();

		    return true;
		}

	});

game.Invader3 = me.Entity.extend({
	  init: function (x, y) {
	      this._super(me.Entity, "init", [x, y, {
	          image : "invader3",
	          width : 24,
	          height : 24
	      }]);
	      
	   this.chooseShipImage();
	   this.body.setVelocity(0, 0);
	   this.body.collisionType = me.collision.types.ENEMY_OBJECT;

	   
	  },

	  chooseShipImage: function () {
		    this.renderable.addAnimation("idle", [0,1], 500);
		    this.renderable.setCurrentAnimation("idle");
	  }, 

	  update : function (time) {
		    this._super(me.Entity, "update", [time]);

		    this.body.update();

		    return true;
		}
	});
