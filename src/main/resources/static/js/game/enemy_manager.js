game.EnemyManager = me.Container.extend({
  init : function () {
      this._super(me.Container, "init", [0, 32,
          this.COLS * 64 - 32,
          this.ROWS * 64 - 32
      ]);
      this.COLS = game.data.enemyColumns;
      this.ROWS = game.data.enemyRows;
      this.vel =  game.data.initialEnemyVelocity + game.data.waveCount * 5;

  },
  createEnemies : function () {
	  // yeah, this is ugly - one row of invader 1
	  // 2 rows each of invader 2 and invader 3 
	/*  for (var i = 0; i < this.COLS; i++) {

          this.addChild(me.pool.pull("invader1", i * 64,  64));
	          game.data.enemyCount++;
	  }

	  for (var i = 0; i < this.COLS; i++) {
		  for (var j = 1; j < 3; j++) {
          this.addChild(me.pool.pull("invader2", i * 64, 64 +  j*64));
	          game.data.enemyCount++;
		  }    
	  }
*/
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
		
		console.log("Removing Enemy: " + child.name + ", Value : " + child.pointValue);
		
		if (me.state.isCurrent(me.state.PLAY)) {
			this.explodeEnemy(child._absPos.x , child._absPos.y )
			me.audio.play("invaderkilled");
		    game.data.score += child.pointValue;
		}
        
		this._super(me.Container, "removeChildNow", [child]);
	    this.updateChildBounds();
		
	}, 
	explodeEnemy: function(x,y) {
		var image = me.loader.getImage('invader_explosion');
		var emitter = new me.ParticleEmitter(x, y, {
		    image: image,
		    width: 10,
		    totalParticles: 100,
		    angle: 0,
		    angleVariation: 6.283185307179586,
		    minLife: 500,
		    maxLife: 1000,
		    speed: 7.11246200607903,
		    speedVariation: 3.55623100303951,
		    minStartScale: 0.01,
		    maxStartScale: 0.638297872340426
		});
		emitter.name = 'explosion';
		emitter.pos.z = 11;
		me.game.world.addChild(emitter);
		// Launch all particles one time and stop, like a explosion
		emitter.burstParticles();
		me.game.world.removeChild(emitter);		

		me.timer.setTimeout(function () {
			me.game.world.removeChild(emitter);		
		}, 500);
	}
	
});

game.MothershipManager = me.Container.extend({
	  init : function () {
	      this._super(me.Container, "init", [0, 16, me.game.viewport.width, 12 ]);
	      this.vel =  0;
		  this.motherShipSettings = {};
	  },

	  onActivateEvent : function () {
		    var _this = this;
	    	var msDelay = common.functions.getRandomInt(5000,10000);
	    	  
	  		var msTimer = 	me.timer.setInterval(function () {

	  			var isLeft = common.functions.getRandomInt(0,1);
	  			
	  			if (isLeft) {
	  				_this.mothershipSettings = {
	  					xPos : 10,
	  					yPos : 70,
	  					xVel : 3
	  				}
	  				
	  			} else {
	  				_this.mothershipSettings = {
		  					xPos : me.game.viewport.width,
		  					yPos : 70,
		  					xVel : -3
		  				}
	  			}
	  			
	  			_this.motherShip = new game.MotherShip(_this.mothershipSettings.xPos, _this.mothershipSettings.yPos);
	  			_this.motherShip.body.setVelocity(_this.mothershipSettings.xVel, 0);
	  			_this.addChild(_this.motherShip);	
	  			}, msDelay);
		},

	   update : function (time) {
			
		    this._super(me.Container, "update", [time]);
		    this.updateChildBounds();
		},	
		
		onDeactivateEvent : function () {
		    me.timer.clearInterval(this.timer);
		},
		removeChildNow : function (child) {
			console.log("Removing Mothership: " + child.name + ", Value : " + child.pointValue);
			
			if (!child.exitingCanvas) {
				me.audio.play("invaderkilled");
				game.data.score += child.pointValue;
			}
			
			if (me.state.isCurrent(me.state.PLAY) && !child.exitingCanvas) {
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
				me.game.world.removeChild(scoreItem);		
			}, 500);
		},
		ScoreItem : me.Renderable.extend({
		    /**
		     * constructor
		     */
		    init: function(x, y) {
		        this._super(me.Renderable, "init", [x,y,10,10]);

		        // create a font
		        
		        this.font = new me.Font("Verdana", "10pt", "#FFF", "right")

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
