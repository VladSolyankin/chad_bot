const queries = require("../db/queries");

module.exports = (bot, msg, match, notifyLists, db) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  const listName = match[1].toLowerCase();

  if (notifyLists[listName] && notifyLists[listName].includes(username)) {
    notifyLists[listName] = notifyLists[listName].filter((u) => u !== username);
    db.prepare(queries.delete).run(listName, username);
    bot.sendMessage(chatId, `Вы удалены из списка "${listName}".`);
  } else {
    bot.sendMessage(chatId, `Вас нет в списке "${listName}".`);
  }
};
