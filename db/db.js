const Database = require("better-sqlite3");

const db = new Database("./notifyLists.db", { verbose: console.log });

// Создание таблицы для хранения списков, если она не существует
db.exec(`
  CREATE TABLE IF NOT EXISTS notify_lists (
    list_name TEXT,
    username TEXT,
    UNIQUE(list_name, username)
  )
`);

module.exports = db;
