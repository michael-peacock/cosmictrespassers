game.EnemyManager = me.Container.extend({
  init : function () {
      this._super(me.Container, "init", [0, 50,
          this.COLS * game.data.gridSize - 32,
          this.ROWS * game.data.gridSize - 32
      ]);
      this.COLS = game.data.enemyColumns;
      this.ROWS = game.data.enemyRows;
      this.vel =  game.data.initialEnemyVelocity + game.data.waveCount * 5;
      this.name = "EnemyManager";

  },
  createEnemies : function () {
	  // yeah, this is ugly - one row of invader 1
	  // 2 rows each of invader 2 and invader 3 
	
	  for (var i = 0; i < this.COLS; i++) {

          this.addChild(me.pool.pull("invader1", i * game.data.gridSize,  game.data.gridSize));
	          game.data.enemyCount++;
	  }

	  for (var i = 0; i < this.COLS; i++) {
		  for (var j = 1; j < 3; j++) {
          this.addChild(me.pool.pull("invader2", i * game.data.gridSize, game.data.gridSize +  j*game.data.gridSize));
	          game.data.enemyCount++;
		  }    
	  }

	  for (var i = 0; i < this.COLS; i++) {
		  for (var j = 1; j < 3; j++) {
	          this.addChild(me.pool.pull("invader3", i * game.data.gridSize, game.data.gridSize * 3 +  j * game.data.gridSize));
		          game.data.enemyCount++;
			  }  
	  }
	  
      game.data.enemyCount++;
	  
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
	        game.data.initialEnemyVelocity += 5;
	    }
		
		if (this.children.length > 0 && this.createdEnemies) {
			
			var childIndex = common.functions.getRandomInt(0,this.children.length -1);
			var theChild = this.getChildAt(childIndex);
			var randomInt = common.functions.getRandomInt(1,1000);
			if (randomInt > 975) {
			    me.game.world.addChild(
			        me.pool.pull("enemyLaser", 
			    		theChild._absPos.x + game.EnemyLaser.width, 
			    		theChild._absPos.y + game.EnemyLaser.height)
			    	);
			}	
		}
		
	    this._super(me.Container, "update", [time]);
	    this.updateChildBounds();
	},	
	
	onDeactivateEvent : function () {
	    me.timer.clearInterval(this.timer);
	},
	removeChildNow : function (child) {
		
		if (me.state.isCurrent(me.state.PLAY)) {
			this.explodeEnemy(child._absPos.x , child._absPos.y )
			me.audio.play("invaderkilled");
			
			console.log("Removing Enemy: " + child.name + ", Value : " + child.pointValue);
		    game.data.score += child.pointValue;
		    
			this._super(me.Container, "removeChildNow", [child]);
		}
        

	    this.updateChildBounds();
		
	}, 
	explodeEnemy: function(x,y) {
		game.enemyExplosionEmitter.launch(x,y);
	}
	
});

game.MothershipManager = me.Container.extend({
	  init : function () {
	      this._super(me.Container, "init", [0, 16, me.game.viewport.width, 12 ]);
	      this.vel =  0;
		  this.motherShipSettings = {};
		  this.shotCount = 0;
		  this.shipSpawnThreshold = common.functions.getRandomInt(20,50);
		  this.isLeft = common.functions.getRandomInt(0,2);
		  
		  console.log("shipSpawnThreshold = " + this.shipSpawnThreshold);
		  console.log("isLeft = " + this.isLeft);
	  },

	  accumulate : function () {
		  this.shotCount++;		  
		  console.log("shotCount = " + this.shotCount);
	  },
	  onActivateEvent : function () {
		  
	  },

	   update : function (time) {
			
		    this._super(me.Container, "update", [time]);
		    this.updateChildBounds();
		    if (this.shotCount == this.shipSpawnThreshold) {
		    	console.log("Spawning Mothership");
		    	this.spawnMotherShip();
		    }
		},	
		spawnMotherShip : function () {

			this.shotCount = 0;
			this.shipSpawnThreshold = common.functions.getRandomInt(25,75);
  			this.isLeft = common.functions.getRandomInt(0,1);
  			var direction = "";
  			
  			console.log("shipSpawnThreshold = " + this.shipSpawnThreshold);
  			console.log("isLeft = " + this.isLeft);
  			
  			if (this.isLeft === 1) {
  				this.mothershipSettings = {
  					xPos : 10,
  					yPos : 70
  				}
  				direction = "right";
  			} else {
  				// TODO: Need to figure out why this isn't spawning on the right side
  				this.mothershipSettings = {
	  					xPos : me.game.viewport.width - game.MotherShip.width,
	  					yPos : 70
	  				}
  				direction = "left";
  			}
  			
  			this.motherShip = new game.MotherShip(this.mothershipSettings.xPos, this.mothershipSettings.yPos);
  			this.motherShip.setDirection(direction);
  			this.motherShip.body.setVelocity(5,0);
  			this.addChild(this.motherShip);	
			me.audio.playTrack("ufo_highpitch");
  			
			
		},
		onDeactivateEvent : function () {
		    me.timer.clearInterval(this.timer);
		    me.audio.stopTrack("ufo_highpitch");
		},
		removeChildNow : function (child) {
			
			me.audio.stopTrack("ufo_highpitch");
			
			if (!child.exitingCanvas && game.data.playerLives > 0) {
				console.log("Removing Mothership: " + child.name + ", Value : " + child.pointValue);				
				me.audio.play("invaderkilled");
				game.data.score += child.pointValue;
			}
			
			if (me.state.isCurrent(me.state.PLAY) && !child.exitingCanvas && game.data.playerLives > 0) {
				console.log("Removing Mothership: " + child.name + ", Value : " + child.pointValue);
				this.explodeEnemy(child);
				me.audio.play("invaderkilled");
			    game.data.score += child.pointValue;
			}
	        
			this._super(me.Container, "removeChildNow", [child]);
		    this.updateChildBounds();
		},
		explodeEnemy: function(child) {

			var posX = child._absPos.x;
			var posY = child._absPos.y;
			var points = child.pointValue;
			
			var scoreItem = new this.ScoreItem(posX,posY);
			scoreItem.setValue(points);
			
			me.game.world.addChild(scoreItem);
			me.timer.setTimeout(function () {
				try {
					me.game.world.removeChild(scoreItem);
				}
				catch (err) {
					console.log("Error Removing scoreItem" + err);
				}
			}, 500);
		},
		ScoreItem : me.Renderable.extend({
		    /**
		     * constructor
		     */
		    init: function(x, y) {
		        this._super(me.Renderable, "init", [x,y,10,10]);

		        // create a font
		        
		        this.font = new me.Font("Verdana", "10pt", "#FF0000", "right")

		        // local copy of the global score
		        this.value = -1;
		    },
		    setValue : function (val) {
		    	 this.value = val;
		    },

		    /**
		     * update function
		     */
		    update : function () {
		        return false;
		    },

		    /**
		     * draw the score
		     */
		    draw : function (renderer) {
		        this.font.draw(renderer, this.value, this.pos.x, this.pos.y);
		    }

		})
});
