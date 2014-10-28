define(['jquery', 'config', 'model'], function($, config, model){
  var UI = {
    arrangeMyHand: function(length){
      var $hand = $('#hand0'),
          screenWidth = $(window).width(),
          screenHeight = $(window).height(),
          visibleWidth,
          leftOffset;

      if(length <= 1)
        visibleWidth = Infinity;
      else 
        visibleWidth = (config.UI.hand.width - config.UI.card.width) / (length - 1);

      if(visibleWidth < config.UI.card.width) {
        leftOffset = (screenWidth - config.UI.hand.width) / 2;
      } else {
        visibleWidth = config.UI.card.width;
        leftOffset = (screenWidth - config.UI.hand.width) / 2 + (config.UI.hand.width - config.UI.card.width * length) / 2;
      }

      $hand.find('.card').each(function(i){
        var $this = $(this);
        $this
          .css('left', $this.css('left') == 'auto' ? leftOffset : $this.css('left'))
          .addClass('mine')
          .stop()
          .animate({'left': leftOffset + visibleWidth * i});
      });
   },
   createOthersHand: function(length){
     var i;
      for(i = 0; i < length; ++i) {
        $('#hand1').append(
          model.Card.getBack$().addClass('rotate-right')
        );
      }

      for(i = 0; i < length; ++i) {
        $('#hand2').append(
          model.Card.getBack$()
        );
      }

      for(i = 0; i < length; ++i) {
        $('#hand3').append(
          model.Card.getBack$()
        );
      }
      
      for(i = 0; i < length; ++i) {
        $('#hand4').append(
          model.Card.getBack$().addClass('rotate-left')
        );
      }
    },
    arrangeHand: function(i){
      var $hand = $('#hand' + i),
          length = $hand.find('.card').length,
          range,
          offset,
          visibleRange,
          cssName;

      if(i == 1 || i == 4) {
        range = $(window).height();
        cssName = 'top';
      }
      else {
        range = $(window).width() / 2;
        cssName = 'left';
      }

      if(length <= 1)
        visibleRange = Infinity;
      else 
        visibleRange = (config.UI.hand.width - config.UI.card.width) / (length - 1);

      if(visibleRange < config.UI.card.width) {
        offset = (range - config.UI.hand.width) / 2;
      } else {
        visibleRange = config.UI.card.width;
        offset = (range - config.UI.hand.width) / 2 + (config.UI.hand.width - config.UI.card.width * length) / 2;
      }

      if(i == 3) offset += $(window).width() / 2;

      $hand.find('.card').each(function(i){
        var $this = $(this),
            anim = {};
        anim[cssName] = offset + visibleRange * i;
        $this
          .css(cssName, $this.css(cssName) == 'auto' ? offset : $this.css(cssName))
          .stop()
          .animate(anim);
      });
    },
    getCenter: function(){
      return [
        $(window).width() / 2,
        $(window).height() / 2
      ];
    },
    getTableCardCenter: function(i){
      var center = UI.getCenter();
      
      switch(i){
        case 0:
          return [
            center[0],
            center[1] + config.UI.table.cardCenterRadius
          ];
        case 1:
        case 2:
        case 3:
        case 4:
          var ang = Math.PI / 3 * (4 - i);
          return [
            center[0] + Math.cos(ang) * config.UI.table.cardCenterRadius,
            center[1] - Math.sin(ang) * config.UI.table.cardCenterRadius
          ];
      }
    },
    moveCard: function($card, src, dst){
      var
          $dummy = $card.clone().appendTo($('body')),
          offset = $card.offset();
      if(src) {
        $dummy.css('left', src[0] - config.UI.card.width / 2).css('top', src[1] - config.UI.card.height / 2);
      } else {
        $dummy.css('left', offset.left).css('top', offset.top);
      }

      $dummy
        .removeClass('mine')
        .animate({
          left: dst[0] - config.UI.card.width / 2,
          top: dst[1] - config.UI.card.height / 2
        }, 250)
      ;
    },
    getPlayerCardCenter: function(i){
      var screenWidth = $(window).width(),
          screenHeight = $(window).height();
      switch(i) {
        case 0: return [screenWidth / 2, screenHeight];
        case 1: return [0, screenHeight / 2];
        case 2: return [screenWidth / 4, 0];
        case 3: return [screenWidth * 3 / 4, 0];
        case 4: return [screenWidth, screenHeight / 2];
      }
    }
  };

  return UI;
});
