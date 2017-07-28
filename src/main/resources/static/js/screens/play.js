game.PlayScreen = me.ScreenObject.extend({
	
  // check win/loss condition
	checkIfLoss : function (y) {
	    if (y >= this.player.pos.y) {
	       this.reset();
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
		  me.game.world.removeChild(player);
	  }

	  this.player = new game.Player(playerLocationX,playerLocationY);
	  // Add player to the game world
	  me.game.world.addChild(this.player, 1);
  }
});
