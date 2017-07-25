game.PlayScreen = me.ScreenObject.extend({
  /**
   * action to perform on state change
   */
  onResetEvent : function () {
	  // background
	  me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);

	  // player
      me.game.world.addChild(me.pool.pull("player"), 1);
      
      // enemy
      this.enemyManager = new game.EnemyManager();
      this.enemyManager.createEnemies();
      me.game.world.addChild(this.enemyManager, 2);
      
      // key bindings
      me.input.bindKey(me.input.KEY.LEFT, "left");
      me.input.bindKey(me.input.KEY.RIGHT, "right");
      me.input.bindKey(me.input.KEY.A, "left");
      me.input.bindKey(me.input.KEY.D, "right");
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
  }
});
