
/* Game namespace */
var game = {

    data : {
        // score
        score : 0,
        enemyCount : 0,
        waveCount : 0,
        enemyColumns : 9,
        enemyRows : 5,
        initialEnemyVelocity : 16,
        enemyVelocity : 16,
        playerWidth: 26,
        playerHeight:16,
        playerLives:3,
        gridSize : 64
        	
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
        
    	this.titleScreen = new game.TitleScreen();
        
    	me.state.set(me.state.MENU,this.titleScreen);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.MENU);        
        this.name = "Game";
    },

    // Run on game resources loaded.
    loaded : function () {
    	
    	// register the player and enemy objects
    	me.pool.register("player", game.Player);
    	me.pool.register("invader1", game.Invader1);
    	me.pool.register("invader2", game.Invader2);    	
    	me.pool.register("invader3", game.Invader3);    
    	me.pool.register("mothership", game.MotherShip, true);    
    	
    	// register laser
    	me.pool.register("laser", game.Laser);
    	me.pool.register("enemyLaser", game.EnemyLaser);
    	
        // set Screen Objects
    	
    	this.gameOverScreen = new game.GameEndScreen();
    	this.playScreen = new game.PlayScreen();

    	
        me.state.set(me.state.GAMEOVER, this.gameOverScreen);
        me.state.set(me.state.PLAY,this.playScreen );


        // start the game
        me.state.change(me.state.MENU);
        
    },
    newGame : function () {
    	
    	this.data.score = 0;
    	this.data.enemyCount = 0;
    	this.data.waveCount = 0;
    	this.data.enemyColumns = 9;
    	this.data.enemyRows = 5;
    	this.data.initialEnemyVelocity = 16;
    	this.data.enemyVelocity = 16;
    	this.data.playerWidth= 26;
    	this.data.playerHeight=16;
    	this.data.playerLives=2;

        this.loaded();
    	
    }
};
