module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;

  // Ссылка на игру
  const gameLink = "https://thorium.rocks/games/flappy-bird/";

  try {
    // Отправляем сообщение с ссылкой на игру
    await bot.sendMessage(
      chatId,
      `Вот игра Flappy Bird:\n\n[Нажми, чтобы играть](${gameLink})`,
      { parse_mode: "Markdown" }
    );

    console.log("Ссылка на игру отправлена.");
  } catch (error) {
    console.error("Ошибка при отправке ссылки:", error.message);
    bot.sendMessage(chatId, "Не удалось отправить ссылку на игру.");
  }
};
