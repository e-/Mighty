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
    arrangeHand: function(i, length){
      var $hand = $('#hand' + i),
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
        offset = (screenWidth - config.UI.hand.width) / 2 + (config.UI.hand.width - config.UI.card.width * length) / 2;
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
      
      if(i == 1){ // my card
        return [
          center[0],
          center[1] + config.UI.table.cardCenterRadius
        ];
      }
    },
    moveCard: function($card, pos){
      var
          screenWidth = $(window).width(),
          screenHeight = $(window).height(),
          $dummy = $card.clone().appendTo($('body')),
          offset = $card.offset();

      $dummy
        .removeClass('mine')
        .css('left', offset.left)
        .css('top', offset.top)
        .animate({
          left: pos[0] - config.UI.card.width / 2,
          top: pos[1] - config.UI.card.height / 2
        }, 250)
      ;
    }
  };

  return UI;
});
