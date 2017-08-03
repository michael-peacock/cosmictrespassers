game.EnemyExplosion = me.ParticleEmitter.extend({
	

	
	
	  onDestroyEvent : function () {
		  me.game.world.removeChild(this);
	  }
}); 