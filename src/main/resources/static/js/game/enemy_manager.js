game.EnemyManager = me.Container.extend({
  init : function () {
      this._super(me.Container, "init", [0, 32,
          this.COLS * 64 - 32,
          this.ROWS * 64 - 32
      ]);
      this.COLS = game.data.enemyColumns;
      this.ROWS = game.data.enemyRows;
      this.vel =  game.data.enemyVelocity;

  },
  createEnemies : function () {
	  // yeah, this is ugly - one row of invader 1
	  // 2 rows each of invader 2 and invader 3 
	  for (var i = 0; i < this.COLS; i++) {

          this.addChild(me.pool.pull("invader1", i * 64,  64));
	          game.data.enemyCount++;
	  }

	  for (var i = 0; i < this.COLS; i++) {
		  for (var j = 1; j < 3; j++) {
          this.addChild(me.pool.pull("invader2", i * 64, 64 +  j*64));
	          game.data.enemyCount++;
		  }    
	  }

	  for (var i = 0; i < this.COLS; i++) {
		  for (var j = 1; j < 3; j++) {
	          this.addChild(me.pool.pull("invader3", i * 64, 192 +  j*64));
		          game.data.enemyCount++;
			  }  
	  }

	  
	  this.updateChildBounds();
	  this.createdEnemies = true;
  },
  onActivateEvent : function () {
	    var _this = this;
	    this.timer = me.timer.setInterval(function () {
	        var bounds = _this.childBounds;

	        if ((_this.vel > 0 && (bounds.right + _this.vel) >= me.game.viewport.width) ||
	            (_this.vel < 0 && (bounds.left + _this.vel) <= 0)) {
	            _this.vel *= -1;
	            _this.pos.y += 16;
	            if (_this.vel > 0) {
	              _this.vel += 5;
	            }
	            else {
	              _this.vel -= 5;
	            }
	            game.playScreen.checkIfLoss(bounds.bottom);
	        }
	        else {
	            _this.pos.x += _this.vel;
	        }
	    }, 1000);
	},

	update : function (time) {

		// this is the check for new wave condition
		if (this.children.length === 0 && this.createdEnemies ) {
	        game.playScreen.reset();
	        game.data.enemyVelocity += 5;
	    }
		
		if (this.children.length > 0 && this.createdEnemies) {
			
			var childIndex = common.functions.getRandomInt(0,this.children.length -1);
			var theChild = this.getChildAt(childIndex);
			var randomInt = common.functions.getRandomInt(1,1000);
			if (randomInt > 975) {
			    me.game.world.addChild(me.pool.pull("enemyLaser", theChild._absPos.x + game.EnemyLaser.width, theChild._absPos.y + game.EnemyLaser.height));
			}	
		}
		
	    this._super(me.Container, "update", [time]);
	    this.updateChildBounds();
	},	
	
	onDeactivateEvent : function () {
	    me.timer.clearInterval(this.timer);
	},
	removeChildNow : function (child) {
		
		console.log("Removing Enemy: " + child.name + ", Value : " + child.pointValue);
		if (me.state.isCurrent(me.state.PLAY)) {
			me.audio.play("invaderkilled");
		    game.data.score += child.pointValue;
		}
        
		this._super(me.Container, "removeChildNow", [child]);
	    this.updateChildBounds();
		
	}
});

game.MothershipManager = me.Container.extend({
	  init : function () {
	      this._super(me.Container, "init", [0, 16, me.game.viewport.width, 12 ]);
	      this.vel =  0;
	      this.enemyManager = null;
	  },
	  createMotherShip : function () {
		  
		  while (this.enemyManager.children.length > 0 && this.enemyManager.createdEnemies) {
			  
		  
		  // wait a random amount of time between 1 - 3 sec
		  var motherShip = new game.MotherShip(0,16);
		  motherShip.body.setVelocity(25, 0);
		  this.addChild(motherShip, 0,16);

		  }
		  this.updateChildBounds();
	  },
	  onActivateEvent : function () {
		    var _this = this;
		    this.timer = me.timer.setInterval(function () {}, 1000);
		},

	   update : function (time) {
			
		    this._super(me.Container, "update", [time]);
		    this.updateChildBounds();
		},	
		
		onDeactivateEvent : function () {
		    me.timer.clearInterval(this.timer);
		},
		removeChildNow : function (child) {
			console.log("Removing Enemy: " + child.name + ", Value : " + child.pointValue);
			me.audio.play("invaderkilled");
		    game.data.score += child.pointValue;
	        
			this._super(me.Container, "removeChildNow", [child]);
		    this.updateChildBounds();
		}
	});
