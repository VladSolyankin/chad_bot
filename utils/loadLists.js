const queries = require("../db/queries");

module.exports.loadLists = (db) => {
  const notifyLists = {};
  const rows = db.prepare(queries.selectAll).all();
  for (const row of rows) {
    if (!notifyLists[row.list_name]) {
      notifyLists[row.list_name] = [];
    }
    notifyLists[row.list_name].push(row.username);
  }
  return notifyLists;
};
