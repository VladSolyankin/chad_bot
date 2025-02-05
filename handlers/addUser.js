const queries = require("../db/queries");

module.exports = (bot, msg, match, notifyLists, db) => {
  const chatId = msg.chat.id;
  const username = match[1];
  const listName = match[2].toLowerCase();

  if (!notifyLists[listName]) {
    notifyLists[listName] = [];
  }

  if (!notifyLists[listName].includes(username)) {
    notifyLists[listName].push(username);
    db.prepare(queries.insert).run(listName, username);
    bot.sendMessage(
      chatId,
      `Пользователь "${username}" добавлен в список "${listName}"!`
    );
  } else {
    bot.sendMessage(
      chatId,
      `Пользователь "${username}" уже в списке "${listName}".`
    );
  }
};
