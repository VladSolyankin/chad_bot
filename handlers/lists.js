module.exports = (bot, msg, notifyLists) => {
  const chatId = msg.chat.id;

  if (Object.keys(notifyLists).length === 0) {
    bot.sendMessage(chatId, "Списки оповещений пусты.");
    return;
  }

  const listsInfo = Object.entries(notifyLists)
    .map(
      ([listName, users]) =>
        `Список "${listName}": ${users.length} пользователей`
    )
    .join("\n");

  bot.sendMessage(chatId, `Списки оповещений:\n${listsInfo}`);
};
