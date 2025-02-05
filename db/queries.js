module.exports = {
  insert:
    "INSERT OR IGNORE INTO notify_lists (list_name, username) VALUES (?, ?)",
  delete: "DELETE FROM notify_lists WHERE list_name = ? AND username = ?",
  selectAll: "SELECT list_name, username FROM notify_lists",
  deleteAll: "DELETE FROM notify_lists",
};
