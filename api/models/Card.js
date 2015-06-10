/**
* Card.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,

  attributes: {
    top: {
      type: 'string',
      required: true,
      maxLength: 300
    },
    smiley: {
      type: 'integer',
      required: true,
      min: 1,
      max: 10
    },
    bottom: {
      type: 'string',
      required: true,
      maxLength: 300
    },
    author: {
      model: 'User',
      required: true
    },
    attribution: {
      type: 'boolean',
      defaultsTo: false
    },
    uid: {
      type: 'String',
      primaryKey: true,
      required: true
    }
  }
};

