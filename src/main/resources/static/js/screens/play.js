game.PlayScreen = me.ScreenObject.extend({
	
  // check win/loss condition
	checkIfLoss : function (y) {
	    if (y >= this.player.pos.y) {
	    	me.state.change(me.state.GAMEOVER);
	    }
	},	
  /**
   * action to perform on state change
   */
  onResetEvent : function () {
	  
	  // background
	  me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);
	  
      game.data.waveCount += 1;

      // add our HUD to the game world
      this.HUD = new game.HUD.Container();
      me.game.world.addChild(this.HUD);	  
      
      this.resetPlayerEntity();
      // enemy
      this.enemyManager = new game.EnemyManager();
      this.enemyManager.createEnemies();
      me.game.world.addChild(this.enemyManager, 2);
      
      this.motherShipManager = new game.MothershipManager();
      me.game.world.addChild(this.motherShipManager, 2);
      
      
      // key bindings
      me.input.bindKey(me.input.KEY.LEFT, "left", true);
      me.input.bindKey(me.input.KEY.RIGHT, "right", true);
      
      me.input.bindKey(me.input.KEY.A, "left", true);
      me.input.bindKey(me.input.KEY.D, "right", true);
      me.input.bindKey(me.input.KEY.SPACE, "shoot", true);
      

  },

  /**
   * action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function () {
	  
	 // remove key bindings
	 me.input.unbindKey(me.input.KEY.LEFT);
	 me.input.unbindKey(me.input.KEY.RIGHT);
	 me.input.unbindKey(me.input.KEY.A);
	 me.input.unbindKey(me.input.KEY.D);
	 me.input.unbindKey(me.input.KEY.SPACE);
  },
  
  resetPlayerEntity : function() {
	  
	  var player = me.game.world.getChildByName("player")[0];
	  var playerLocationX = me.game.viewport.width / 2 - game.data.playerWidth / 2;
	  var playerLocationY = me.game.viewport.height - game.data.playerHeight - 50;

	  if (player != null) {
		  // TODO: need to get the x,y coordinates of the current player
		  // object before removing it, then play the die effect there
		  
		  me.game.world.removeChild(this.player);
		  
		  this.showPlayerDieEffect(playerLocationX,playerLocationY);
		  
	  }

	  this.player = new game.Player(playerLocationX,playerLocationY);
	  // Add player to the game world
	  me.game.world.addChild(this.player, 1);
  }, 
  showPlayerDieEffect: function(x,y) {
		var image = me.loader.getImage('player_explosion');
		var emitter = new me.ParticleEmitter(x, y, {
		    image: image,
		    totalParticles: 117,
		    angle: 1.5707963267949,
		    angleVariation: 1.55701741164757,
		    maxLife: 1000,
		    speed: 3.28947368421053,
		    speedVariation: 3.28947368421053,
		    maxRotation: 0.744061417955478,
		    minStartScale: 0.328947368421053,
		    maxParticles: 15
		});
		emitter.name = 'explosion';
		emitter.pos.z = 11;
		me.game.world.addChild(emitter);
		// Launch all particles one time and stop, like a explosion
		emitter.streamParticles();

		me.timer.setTimeout(function () {
			me.game.world.removeChild(emitter);		
		}, 1000);
	}
});
