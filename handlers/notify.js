module.exports = (bot, msg, match, notifyLists) => {
  const chatId = msg.chat.id;
  const listName = match[1].toLowerCase();

  if (!notifyLists[listName] || notifyLists[listName].length === 0) {
    bot.sendMessage(chatId, `Список "${listName}" пуст.`);
    return;
  }

  const mentions = notifyLists[listName]
    .map((username) => `@${username}`)
    .join(" ");
  bot.sendMessage(chatId, `Внимание, список "${listName}": ${mentions}`);
};
