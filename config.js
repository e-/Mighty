define(function(){
  var config = {
    lobby: {
      chatHistoryMaximumNumber: 20
    },
    room: {
      playerMaximumNumber: 5
    },
    UI: {
      card: {
        width: 120,
        height: 174
      },
      hand: {
        width: 500
      },
      table: {
        cardCenterRadius: 80
      },
      room: {
        chatDuration: 3000
      }
    },
    server: {
      port: 3000
    }
  };

  return config;
});
