function timestamp(schema) {
  schema.add({
    lastModifiedDate: Date,
  });

  schema.pre('save', function(next) {
    let now = Date.now();
    this.lastModifiedDate = now;
    next();
  });

  schema.pre('findOneAndUpdate', function(next) {
    let now = Date.now();
    this.update({}, {$set: {lastModifiedDate: now}});
    next();
  });
}

module.exports = {timestamp};
