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
  },
  afterCreate: function () {
    sails.sockets.blast('userUpdated');
  },
  afterUpdate: function () {
    sails.sockets.blast('userUpdated');
  },
  afterDestroy: function () {
    sails.sockets.blast('userUpdated');
  }
};

