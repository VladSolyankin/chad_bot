const queries = require("../db/queries");

module.exports = (bot, msg, match, notifyLists, db) => {
  const chatId = msg.chat.id;
  const listName = match[2].toLowerCase();
  const usernames = match[1].split(";").map((username) => username.trim());

  if (!notifyLists[listName]) {
    notifyLists[listName] = [];
  } else {
    bot.sendMessage(chatId, `Список "${listName}" уже существует.`);
    return;
  }

  for (const username of usernames) {
    if (!notifyLists[listName].includes(username)) {
      notifyLists[listName].push(username);
      db.prepare(queries.insert).run(listName, username);
    }
  }

  bot.sendMessage(
    chatId,
    `Пользователи "${usernames.join(", ")}" добавлены в список "${listName}"!`
  );
};
