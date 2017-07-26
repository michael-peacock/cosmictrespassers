
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0,
        enemyCount : 0,
        waveCount : 0,
        enemyColumns : 2,
        enemyRows : 2,
        enemyVelocity : 16
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(960, 640, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        if (!me.audio.init("wav,mp3,ogg") ) {
            alert("Your browser does not support HTML5 audio.");
            return;
        }
        
        
        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }
        


        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
        

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);        
    },

    // Run on game resources loaded.
    loaded : function () {
    	
    	// register the player and enemy objects
    	me.pool.register("player", game.Player);
    	me.pool.register("enemy", game.Enemy);
    	
    	// register laser
    	me.pool.register("laser", game.Laser);
    	
        // set the "Play/Ingame" Screen Object
        this.playScreen = new game.PlayScreen();
        me.state.set(me.state.PLAY, this.playScreen);

        // start the game
        me.state.change(me.state.PLAY);
    }
};
