/**
* Uid.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,

  attributes: {
    createdAt: { type: 'string', autoCreatedAt: true, },
    updatedAt: { type: 'string', autoUpdatedAt: true, },
    id: { type: 'string', columnName: '_id'},

    uid: {
      type: 'string',
      required: true,
      unique: true
    }
  }
};

