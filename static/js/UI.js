define(['jquery', 'config', 'model'], function($, config, model){
  var UI = {
    arrangeHand: function(length){
      var $hand = $('#hand'),
          totalWidth = config.UI.card.visibleWidth * (length - 1) + config.UI.card.width,
          screenWidth = $(window).width(),
          screenHeight = $(window).height(),
          leftOffset = (screenWidth - totalWidth) / 2,
          topOffset = (screenHeight - totalWidth) / 2,
          bottomOffset = (screenHeight - totalWidth) / 2,
          halfLeftOffset = (screenWidth / 2 - totalWidth) / 2,
          i
      ;
      
      $hand.find('.card').each(function(i){
        var $this = $(this);
        $this
          .css('left', leftOffset)
          .addClass('mine')
          .animate({'left': leftOffset + config.UI.card.visibleWidth * i});
      });
      
      for(i = 0; i < length; ++i) {
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

    }
  };

  return UI;
});
