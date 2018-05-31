/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  //autosubscribe: ['destroy', 'update'],
  attributes: {
    name: {
      type: 'string', required: true
    },
    session: {
      type: 'string', required: true
    },
    currentpage: {
      type: 'string', required: true
    }
  },
  afterCreate: function (values, next) {
    sails.sockets.blast('userUpdated');
    next();
  },
  afterUpdate: function (values, next) {
    sails.sockets.blast('userUpdated');
    next();
  },
  afterDestroy: function (values, next) {
    sails.sockets.blast('userUpdated');
    next();
  }
};

