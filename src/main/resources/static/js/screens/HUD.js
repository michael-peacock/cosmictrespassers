/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, "init");
        
        this.anchorPoint.set(0, 0);

        // persistent across level change
        this.isPersistent = true;

        // Use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object 
        this.addChild(new game.HUD.ScoreItem(100, 20));
        // add our child enemy count object 
        this.addChild(new game.HUD.EnemyCount(300, 20));
        this.addChild(new game.HUD.WaveCount(500, 20));
        this.addChild(new game.HUD.PlayerLifeCounter(100, me.game.viewport.height - 40));
        
    }
});


game.HUD.ScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {
        this._super(me.Renderable, "init", [x,y,10,10]);

        // create a font
        
        this.font = new me.Font("Verdana", "10pt", "#FFF", "right")

        // local copy of the global score
        this.score = -1;
    },

    /**
     * update function
     */
    update : function (/*dt*/) {

        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (renderer) {
    	
        this.font.draw(renderer, "Score: " + game.data.score, this.pos.x, this.pos.y);
    }

});

game.HUD.EnemyCount = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {
        this._super(me.Renderable, "init", [x,y,10,10]);

        // create a font
        
        this.font = new me.Font("Verdana", "10pt", "#FFF", "right")
 
        this.enemyCount = -1;
    },

    /**
     * update function
     */
    update : function (/*dt*/) {

        if (this.score !== game.data.enemyCount) {
            this.score = game.data.enemyCount;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (renderer) {
    	
        this.font.draw(renderer, "Enemies: " + game.data.enemyCount, this.pos.x, this.pos.y);
    }

});


game.HUD.WaveCount = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {
        this._super(me.Renderable, "init", [x,y,10,10]);
        this.font = new me.Font("Verdana", "10pt", "#FFF", "right")
        
        this.waveCount = -1;
    },

    /**
     * update function
     */
    update : function (/*dt*/) {

        // we don't draw anything fancy here, so just
        // return true if the score has been updated
        if (this.waveCount !== game.data.waveCount) {
            this.waveCount = game.data.waveCount;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (renderer) {
        this.font.draw (renderer, "Wave: " + game.data.waveCount, this.pos.x, this.pos.y);
    }

});

game.HUD.PlayerLifeCounter = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {
        this._super(me.Renderable, "init", [x,y,10,10]);

        // create a font
        
        this.font = new me.Font("Verdana", "10pt", "#FFF", "right")

        // local copy of the global score
        this.playerLives = -1;
    },

    /**
     * update function
     */
    update : function (/*dt*/) {

        if (this.playerLives !== game.data.playerLives) {
            this.playerLives = game.data.playerLives;
            this.redrawPlayerLives = true;
            return true;
        }
        this.redrawPlayerLives = false;
        return false;
    },
    

    /**
     * draw the score
     */
    draw : function (renderer) {
    	
        this.font.draw(renderer, "Lives: " + game.data.playerLives, this.pos.x, this.pos.y);
    }

});