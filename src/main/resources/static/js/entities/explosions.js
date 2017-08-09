/*
 * Based on aaschmitz/melonjs-improved-particles - from https://github.com/aaschmitz/melonjs-improved-particles
 */
game.explosionManager = me.Object.extend({           
    init: function(x, y, imageName) {
        // create a new emitter
        this.emitter = new me.ParticleEmitter(x, y);
        this.imageName = imageName;
        this.emitter.z = 10;

        // start the emitter with pre-defined params
        this.start(x, y);
        
        // add the emitter to game
        me.game.world.addChild(this.emitter);
        me.game.world.addChild(this.emitter.container);
    },

    start: function(x, y) {
        // set the emitter params
        this.emitter.image = me.loader.getImage(this.imageName);
        this.emitter.totalParticles = 75;
        this.emitter.minLife = 1000;
        this.emitter.maxLife = 3000;
        this.emitter.speed = 9.5;
        this.emitter.speedVariation = 5.55623100303951;
        this.emitter.angle = 0;
        this.emitter.angleVariation = 6.283185307179586,
        this.emitter.minStartScale = 0.001;
        this.emitter.maxStartScale = 0.638297872340426;

        // move the emitter
        this.emitter.pos.set(x, y);
    },

    launch: function(x, y) {		
        // move the emitter
        this.emitter.pos.set(x, y);
	
        // launch the emitter particles!
        this.emitter.burstParticles();
    },

    remove: function() {
	// remove the emitters from game		
        me.game.world.removeChild(this.emitter.container);
        me.game.world.removeChild(this.emitter);
    }
});
