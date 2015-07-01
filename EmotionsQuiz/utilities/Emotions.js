var shuffle = require('./Shuffle');
var emotionsData = require('../data/emotions-alternative.json');

var Emotions = {
  getRandom : function ( tiers ) {
    var shuffled = shuffle( emotionsData );

    for ( var i = 0; i < emotionsData.length; i++ ) {
      if ( tiers.indexOf( emotionsData[i].tier ) !== -1 ) 
        return emotionsData[i];
    }
  },
  getParent : function ( emotion ) {
    var result = null;
    
    if ( emotion.parent ) {
      for ( var i = 0; i < emotionsData.length; i++ ) {
        var e = emotionsData[i];
        
        if ( emotion.parent === e.slug ) {
          return e;
        }
      }
    }
    
    return result;
  },
  getAncestor : function ( emotion ) {
    var e = emotion;
    
    while ( e.parent !== null ) {
      e = Emotions.getParent( e );
    }
    
    return e;
  },
  getWrongAncestors : function ( emotion ) {
    var wrong = [];
    for ( var i = 0; i < emotionsData.length; i++ ) {
      if ( emotionsData[i].slug !== emotion.slug &&
           emotionsData[i].tier === 0) {
        wrong.push( emotionsData[i] );
      }
    }

    var shuffled = shuffle(wrong);

    return shuffled.splice(0, 2);
  }
};

module.exports = Emotions;