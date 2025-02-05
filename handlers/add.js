const queries = require("../db/queries");

module.exports = (bot, msg, match, notifyLists, db) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  const listName = match[1].toLowerCase();

  if (!notifyLists[listName]) {
    notifyLists[listName] = [];
  }

  if (!notifyLists[listName].includes(username)) {
    notifyLists[listName].push(username);
    db.prepare(queries.insert).run(listName, username);
    bot.sendMessage(chatId, `Вы добавлены в список "${listName}"!`);
  } else {
    bot.sendMessage(chatId, `Вы уже в списке "${listName}".`);
  }
};
