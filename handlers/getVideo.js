const axios = require("axios");

module.exports = async (bot, msg, match) => {
  const chatId = msg.chat.id;

  // Получаем текст запроса после команды /get_video
  const query = match[1];

  if (!query) {
    return bot.sendMessage(
      chatId,
      "Пожалуйста, укажите запрос для поиска видео."
    );
  }

  try {
    // URL для запроса к YouTube Data API
    const url = "https://www.googleapis.com/youtube/v3/search";

    // Параметры запроса
    const params = {
      key: require("../config").youtubeApi, // Замените на ваш реальный API-ключ YouTube
      part: "snippet",
      type: "video",
      q: query,
      maxResults: 1, // Получаем только одно видео
    };

    // Выполняем GET-запрос к YouTube API
    const response = await axios.get(url, { params });

    // Проверяем, найдены ли видео
    if (response.data.items && response.data.items.length > 0) {
      const videoId = response.data.items[0].id.videoId;
      const videoTitle = response.data.items[0].snippet.title;
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      // Отправляем сообщение с названием и ссылкой на видео
      bot.sendMessage(
        chatId,
        `Видео по вашему запросу "${query}":\n\n${videoTitle}\n${videoUrl}`
      );
    } else {
      bot.sendMessage(chatId, `По запросу "${query}" видео не найдено.`);
    }
  } catch (error) {
    console.error(
      "Ошибка при поиске видео:",
      error.response?.data || error.message
    );
    bot.sendMessage(chatId, "Не удалось найти видео. Попробуйте позже.");
  }
};
