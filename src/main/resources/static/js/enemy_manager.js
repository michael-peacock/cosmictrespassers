game.EnemyManager = me.Container.extend({
  init : function () {
      this._super(me.Container, "init", [0, 32,
          this.COLS * 64 - 32,
          this.ROWS * 64 - 32
      ]);
      this.COLS = 9;
      this.ROWS = 4;
      this.vel = 16;
  },
  createEnemies : function () {
	  for (var i = 0; i < this.COLS; i++) {
	      for (var j = 0; j < this.ROWS; j++) {
	          this.addChild(me.pool.pull("enemy", i * 64, j * 64));
	      }
	  }
	  this.updateChildBounds();
  },
  onActivateEvent : function () {
	    var _this = this;
	    this.timer = me.timer.setInterval(function () {
	        _this.pos.x += _this.vel;
	    }, 1000);
	},

	onDeactivateEvent : function () {
	    me.timer.clearInterval(this.timer);
	}  
});