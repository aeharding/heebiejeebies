var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    createdAt: { type: 'string', autoCreatedAt: true, },
    updatedAt: { type: 'string', autoUpdatedAt: true, },
    id: { type: 'string', columnName: '_id'},

    username    : { type: 'string', unique: true },
    displayName : { type: 'string' },
    email       : { type: 'string',  unique: true },
    passports   : { collection: 'Passport', via: 'user' },
    cards       : { collection: 'Card', via: 'author' },
    location    : { type: 'string', maxLength: 50 }
  }
};

module.exports = User;
