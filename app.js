;(function($) {
  var timeoutPopupModule = {
    currentConfig: {
      activityEvents: 'mousemove mousewheel mousedown keypress touchmove touchend',
      idleTimer: 3000,
    },
    init: function() {
      this.timeoutID = undefined;
      this.cacheDom();
      this.bindEvents();
      this.startTimer();
      console.log("initialized");
    },
    cacheDom: function() {
      this.$body          = $('body');
      this.$popupOverlay  = $('#popup_overlay');
      this.$testButton    = $('#test_button');
      this.$closeButton   = $('#close_button');
    },
    bindEvents: function() {
      this.$closeButton.on('click', this.closePopUp.bind(this));
      window.addEventListener("mousemove", this.resetTimer.bind(this), false);
      window.addEventListener("mousewheel", this.resetTimer.bind(this), false);
      window.addEventListener("mousedown", this.resetTimer.bind(this), false);
      window.addEventListener("keypress", this.resetTimer.bind(this), false);
      window.addEventListener("touchmove", this.resetTimer.bind(this), false);
      window.addEventListener("touchend", this.resetTimer.bind(this), false);
    },
    closePopUp: function() {
      console.log("close popup function called");
      this.$popupOverlay.css('display', 'none');
    },
    openPopUp: function() {
      console.log("3 seconds is up!");
      $("#popup_overlay").css('display', 'block'); // refactor this
    },
    isPopupOpen: function() {
      var popupOpen = this.$popupOverlay.is(':visible');
      if(popupOpen === true) {
        return true;
      }
      return false;
    },
    resetTimer: function() {
      if(this.isPopupOpen() !== true) {
        console.log("timer is reset");
        window.clearTimeout(this.timeoutID);
        this.startTimer();
        this.changeBackground();
      }
    },
    startTimer: function() {
      if(this.isPopupOpen() !== true) {
        console.log("timer started");
        this.timeoutID = window.setTimeout(this.openPopUp, this.currentConfig.idleTimer);
      }
    },
    changeBackground: function() {
      $("body").css("background-color", "#CD5C5C");
      setTimeout(function(){
        $("body").css("background-color", "#90EE90");
      }, 400);
    }
  };

  timeoutPopupModule.init();

}(jQuery));
