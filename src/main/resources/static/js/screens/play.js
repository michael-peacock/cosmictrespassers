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
      game.data.playerCount += 1;
	  console.log("Play Screen Reset ... wave " + game.data.waveCount);
	  
	  // create a new particle system and add to game
      game.enemyExplosionEmitter = new game.explosionManager(0, 0, "invader_explosion");
      game.playerExplosionEmitter = new game.explosionManager(0, 0, "player_explosion");
      
      // add our HUD to the game world
      this.HUD = new game.HUD.Container();
      me.game.world.addChild(this.HUD);	  
      
      this.resetPlayerEntity(true);
      
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
      me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.SPACE);
      
      this.name = "PlayScreen";
      

  },

  /**
   * action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function () {

	 // remove particle emitters
	 game.enemyExplosionEmitter.remove();
     game.playerExplosionEmitter.remove();

	 // remove key bindings
	 me.input.unbindKey(me.input.KEY.LEFT);
	 me.input.unbindKey(me.input.KEY.RIGHT);
	 me.input.unbindKey(me.input.KEY.A);
	 me.input.unbindKey(me.input.KEY.D);
	 me.input.unbindKey(me.input.KEY.SPACE);
	 me.input.unbindPointer(me.input.pointer.LEFT);
	 
  },
  
  resetPlayerEntity : function(newGame) {
	  
	  if (!newGame) {

		  var currentX = this.player._absPos.x;
		  var currentY = this.player._absPos.y;	  
		  this.showPlayerDieEffect(currentX,currentY);
		  me.game.world.removeChild(this.player);
			  
		  }
	
	  var initialX = me.game.viewport.width / 2 - game.data.playerWidth / 2;
	  var initialY = me.game.viewport.height - game.data.playerHeight - 50;
	  this.player = new game.Player(initialX,initialY);
	  
	  me.game.world.addChild(this.player, 1);


  }, 
  showPlayerDieEffect: function(x,y) {
		game.playerExplosionEmitter.launch(x,y);
	}
});
