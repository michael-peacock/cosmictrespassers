game.EnemyManager = me.Container.extend({
  init : function () {
      this._super(me.Container, "init", [0, 32,
          this.COLS * 64 - 32,
          this.ROWS * 64 - 32
      ]);
      this.COLS = game.data.enemyColumns;
      this.ROWS = game.data.enemyRows;
      this.vel =  game.data.enemyVelocity;

  },
  createEnemies : function () {
	  for (var i = 0; i < this.COLS; i++) {
	      for (var j = 0; j < this.ROWS; j++) {
	          this.addChild(me.pool.pull("enemy", i * 64, j * 64));
	          game.data.enemyCount++;
	      }
	  }
	  this.updateChildBounds();
	  this.createdEnemies = true;
  },
  onActivateEvent : function () {
	    var _this = this;
	    this.timer = me.timer.setInterval(function () {
	        var bounds = _this.childBounds;

	        if ((_this.vel > 0 && (bounds.right + _this.vel) >= me.game.viewport.width) ||
	            (_this.vel < 0 && (bounds.left + _this.vel) <= 0)) {
	            _this.vel *= -1;
	            _this.pos.y += 16;
	            if (_this.vel > 0) {
	              _this.vel += 5;
	            }
	            else {
	              _this.vel -= 5;
	            }
	            game.playScreen.checkIfLoss(bounds.bottom);
	        }
	        else {
	            _this.pos.x += _this.vel;
	        }
	    }, 1000);
	},

	update : function (time) {
		// this is the check for the win condition
		// triple = ftw!
		if (this.children.length === 0 && this.createdEnemies) {
	        game.playScreen.reset();
	        game.data.enemyVelocity += 5;
	    }
	    this._super(me.Container, "update", [time]);
	    this.updateChildBounds();
	},	
	
	onDeactivateEvent : function () {
	    me.timer.clearInterval(this.timer);
	},
	removeChildNow : function (child) {
	    this._super(me.Container, "removeChildNow", [child]);
        // play the "shoot" audio clip
        me.audio.play("invaderkilled");
	    this.updateChildBounds();
	}
});
