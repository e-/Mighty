define(['jquery', 'config'], function($, config){
  var UI = {
    arrangeHand: function(){
      var $hand = $('#hand'),
          length = $hand.find('.card').length,
          totalWidth = config.UI.card.visibleWidth * (length - 1) + config.UI.card.width,
          screenWidth = $(window).width(),
          leftOffset = (screenWidth - totalWidth) / 2
      ;
      
      $hand.find('.card').each(function(i){
        var $this = $(this);
        $this
          .css('left', leftOffset)
          .animate({'left': leftOffset + config.UI.card.visibleWidth * i});
      });
    }
  };

  return UI;
});
