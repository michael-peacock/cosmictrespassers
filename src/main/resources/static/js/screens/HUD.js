/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, "init");

        // persistent across level change
        this.isPersistent = true;

        // Use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object 
        this.addChild(new game.HUD.ScoreItem(-5, -25));
        // add our child enemy count object 
        this.addChild(new game.HUD.EnemyCount(-5, -5));
        this.addChild(new game.HUD.WaveCount(-200, -5));
    }
});

game.HUD.ScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {
        this.relative = new me.Vector2d(x, y);

        // call the super constructor
        // (size does not matter here)
        this._super(me.Renderable, "init", [
            me.game.viewport.width + x,
            me.game.viewport.height + y,
            10,
            10
        ]);

        // create a font
        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'), 0.50, "right", "bottom");

        // local copy of the global score
        this.score = -1;
    },

    /**
     * update function
     */
    update : function (/*dt*/) {
        this.pos.x = me.game.viewport.width + this.relative.x;
        this.pos.y = me.game.viewport.height + this.relative.y;

        // we don't draw anything fancy here, so just
        // return true if the score has been updated
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
    	this.font.set("right");
        this.font.draw (renderer, "Score: " + game.data.score, this.pos.x, this.pos.y);
    }

});

game.HUD.EnemyCount = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {
        this.relative = new me.Vector2d(x, y);

        // call the super constructor
        // (size does not matter here)
        this._super(me.Renderable, "init", [
            me.game.viewport.width + x,
            me.game.viewport.height + y,
            10,
            10
        ]);

        // create a font
        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'), 0.50, "right", "bottom");

        // local copy of the global score
        this.enemyCount = -1;
    },

    /**
     * update function
     */
    update : function (/*dt*/) {
        this.pos.x = me.game.viewport.width + this.relative.x;
        this.pos.y = me.game.viewport.height + this.relative.y;

        // we don't draw anything fancy here, so just
        // return true if the score has been updated
        if (this.enemyCount !== game.data.enemyCount) {
            this.enemyCount = game.data.enemyCount;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (renderer) {
    	this.font.set("right");
        this.font.draw (renderer, "Enemies: " + game.data.enemyCount, this.pos.x, this.pos.y);
    }

});

game.HUD.WaveCount = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {
        this.relative = new me.Vector2d(x, y);

        // call the super constructor
        // (size does not matter here)
        this._super(me.Renderable, "init", [
            me.game.viewport.width + x,
            me.game.viewport.height + y,
            10,
            10
        ]);

        // create a font
        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'), 0.50, "right", "bottom");

        // local copy of the global score
        this.waveCount = -1;
    },

    /**
     * update function
     */
    update : function (/*dt*/) {
        this.pos.x = me.game.viewport.width + this.relative.x;
        this.pos.y = me.game.viewport.height + this.relative.y;

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
    	this.font.set("right");
        this.font.draw (renderer, "Wave: " + game.data.waveCount, this.pos.x, this.pos.y);
    }

});