module.exports = {


  friendlyName: 'Ultrasonicdata',


  description: 'Ultrasonic dummy data spammer',


  inputs: {

  },


  fn: async function (inputs, exits) {

    sails.log('Spamming dummy data for ultrasonic sensors... (`ultrasonicdata`)');

    // All done
    return exits.success();

  }


};

