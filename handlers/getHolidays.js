const axios = require("axios");

module.exports = async (bot, msg, match, notifyLists) => {
  const chatId = msg.chat.id;

  // Получаем текущую дату в формате "день месяц"
  const today = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  try {
    // Отправляем сообщение о текущей дате
    bot.sendMessage(chatId, `Сегодня ${today}`);

    // Запрашиваем праздники на прошлый год
    const year = new Date().getFullYear() - 1;
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    // URL для запроса к HolidayAPI
    const url = "https://holidayapi.com/v1/holidays";

    // Параметры запроса
    const params = {
      key: require("../config").holidayApi, // Замените на ваш реальный API-ключ
      country: "RU",
      year: year,
      month: month,
      day: day,
    };

    // Выполняем GET-запрос к API
    const response = await axios.get(url, { params });

    // Проверяем, есть ли праздники
    if (response.data.holidays && response.data.holidays.length > 0) {
      const holidaysList = response.data.holidays
        .map((holiday) => `• ${holiday.name}`)
        .join("\n");

      bot.sendMessage(chatId, `Праздники сегодня:\n${holidaysList}`);
    } else {
      bot.sendMessage(chatId, "Сегодня праздников нет.");
    }
  } catch (error) {
    console.error(
      "Ошибка при получении праздников:",
      error.response?.data || error.message
    );
    bot.sendMessage(chatId, "Не удалось получить информацию о праздниках.");
  }
};
