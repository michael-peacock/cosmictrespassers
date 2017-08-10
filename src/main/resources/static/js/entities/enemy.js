game.Invader1 = me.Entity.extend({
  init: function (x, y) {
	  var settings = {
	          image : "invader1",
	          width : 16,
	          height : 16,
	          name : "invader1",
	          pointValue : 30
	      };
   this._super(me.Entity, "init", [x, y, settings]);
   this.pointValue = settings.pointValue;
      
   this.renderable.addAnimation("idle", [0,1], 500);
   this.renderable.setCurrentAnimation("idle");
   this.body.setVelocity(0, 0);
   this.body.collisionType = me.collision.types.ENEMY_OBJECT;

   
  },
  update : function (time) {
	    this._super(me.Entity, "update", [time]);

	    this.body.update();

	    return true;
	}
});

game.Invader2 = me.Entity.extend({
	  init: function (x, y) {
	   var settings = {
		          image : "invader2",
		          width : 22,
		          height : 22,
		          name : "invader2",
		          pointValue : 20
		        	  
		      };  
	   this._super(me.Entity, "init", [x, y, settings]);
	   this.pointValue = settings.pointValue;
	      
	   this.renderable.addAnimation("idle", [0,1], 500);
       this.renderable.setCurrentAnimation("idle");
	   this.body.setVelocity(0, 0);
	   this.body.collisionType = me.collision.types.ENEMY_OBJECT;

	   
	  },

	  update : function (time) {
		    this._super(me.Entity, "update", [time]);
		    
		    this.body.update();

		    return true;
		}

	});

game.Invader3 = me.Entity.extend({
	  init: function (x, y) {
       var settings = {
	          image : "invader3",
	          width : 24,
	          height : 24,
	          name : "invader3",
	          pointValue : 10
	      };
       this._super(me.Entity, "init", [x, y, settings]);
	   this.pointValue = settings.pointValue;
	   
	   this.renderable.addAnimation("idle", [0,1], 500);
       this.renderable.setCurrentAnimation("idle");
	   this.body.setVelocity(0, 0);
	   this.body.collisionType = me.collision.types.ENEMY_OBJECT;

	   
	  },
	  update : function (time) {
		    this._super(me.Entity, "update", [time]);

		    this.body.update();

		    return true;
		}
	});

game.MotherShip = me.Entity.extend({
	  init: function (x, y) {
     var settings = {
	          image : "mothership",
	          width : 48,
	          height : 21,
	          name : "mothership"	          
	      };
     
       this._super(me.Entity, "init", [x, y, settings]);
	   this.pointValue = this.getPointValue();
	   this.body.setVelocity(0, 0);
	   this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
	   this.exitingCanvas = false;
	   this.direction = "right";
	  },

	  setDirection : function(direction) {
		this.direction =  direction; 
	  },
	  getPointValue: function () {
		  // anywhere from 100-500 points
		  return common.functions.getRandomInt(1,5) * 100;
	  }, 

	  update : function (time) {
		    this._super(me.Entity, "update", [time]);
		    
		    if (this.direction === "right") {
		    	this.body.vel.x += this.body.accel.x * time / 1000;
		        if (this.pos.x + this.width >= me.game.viewport.width) {
		        	this.exitingCanvas = true;
		            game.playScreen.motherShipManager.removeChild(this);
		        }
		    }
		    else {
		    	this.body.vel.x -= this.body.accel.x * time / 1000;
		        if (this.pos.x - this.width <= 0) {
		        	this.exitingCanvas = true;
		            game.playScreen.motherShipManager.removeChild(this);
		        }
		    }

		    this.body.update();

		    return true;
		}
	});

game.MotherShip.width = 48;
game.MotherShip.height = 12;


