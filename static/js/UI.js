define(['jquery', 'config', 'model'], function($, config, model){
  var UI = {
    arrangeHand: function(length){
      var $hand = $('#hand'),
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
     
      
/*      for(i = 0; i < length; ++i) {
        $('#hand2').append(
          model.Card.getBack$()
            .addClass('rotate-right')
            .css('top', topOffset)
            .animate({'top': topOffset + config.UI.card.visibleWidth * i})
        );
      }

      for(i = 0; i < length; ++i) {
        $('#hand3').append(
          model.Card.getBack$()
            .css('left', halfLeftOffset)
            .animate({'left': halfLeftOffset + config.UI.card.visibleWidth * i})
        );
      }

      for(i = 0; i < length; ++i) {
        $('#hand3').append(
          model.Card.getBack$()
            .css('left', halfLeftOffset)
            .animate({'left': halfLeftOffset + config.UI.card.visibleWidth * i})
        );
      }
      
      for(i = 0; i < length; ++i) {
        $('#hand4').append(
          model.Card.getBack$()
            .css('left', halfLeftOffset + screenWidth / 2)
            .animate({'left': halfLeftOffset + screenWidth / 2 + config.UI.card.visibleWidth * i})
        );
      }

      
      for(i = 0; i < length; ++i) {
        $('#hand5').append(
          model.Card.getBack$()
            .addClass('rotate-left')
            .css('bottom', bottomOffset)
            .animate({'bottom': bottomOffset + config.UI.card.visibleWidth * i})
        );
      }
*/
    }
  };

  return UI;
});
