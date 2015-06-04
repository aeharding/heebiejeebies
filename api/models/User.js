var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username    : { type: 'string', unique: true },
    displayName : { type: 'string' },
    email       : { type: 'email',  unique: true },
    passports   : { collection: 'Passport', via: 'user' },
    cards       : { collection: 'Card', via: 'author' }
  }
};

module.exports = User;
