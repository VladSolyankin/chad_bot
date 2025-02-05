const queries = require("../db/queries");

module.exports.saveLists = (notifyLists, db) => {
  const transaction = db.transaction(() => {
    db.prepare(queries.deleteAll).run();
    for (const [listName, usernames] of Object.entries(notifyLists)) {
      for (const username of usernames) {
        db.prepare(queries.insert).run(listName, username);
      }
    }
  });
  transaction();
};
