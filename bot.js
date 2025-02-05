const TelegramBot = require("node-telegram-bot-api");
const config = require("./config");
const db = require("./db/db");
const { loadLists } = require("./utils/loadLists");
const express = require("express");

const app = express();

app.listen(8000, () => {
  console.log("Сервер запущен на порту 8000");
});

// Импорт обработчиков команд
const startHandler = require("./handlers/start");
const addHandler = require("./handlers/add");
const addUserHandler = require("./handlers/addUser");
const addUsersHandler = require("./handlers/addUsers");
const removeHandler = require("./handlers/remove");
const notifyHandler = require("./handlers/notify");
const listsHandler = require("./handlers/lists");
const getHolidays = require("./handlers/getHolidays");
const getVideo = require("./handlers/getVideo");
const sendGame = require("./handlers/sendGame");

// Инициализация бота
const bot = new TelegramBot(config.token, { polling: true });

// Загрузка списков при старте
let notifyLists = loadLists(db);
console.log("Списки загружены из базы данных.");

// Регистрация обработчиков
bot.onText(/\/start/, (msg) => startHandler(bot, msg));
bot.onText(/\/add (.+)/, (msg, match) =>
  addHandler(bot, msg, match, notifyLists, db)
);
bot.onText(/\/add_user (.+) (.+)/, (msg, match) =>
  addUserHandler(bot, msg, match, notifyLists, db)
);
bot.onText(/\/add_users (.+) (.+)/, (msg, match) =>
  addUsersHandler(bot, msg, match, notifyLists, db)
);
bot.onText(/\/remove (.+)/, (msg, match) =>
  removeHandler(bot, msg, match, notifyLists, db)
);
bot.onText(/\/notify (.+)/, (msg, match) =>
  notifyHandler(bot, msg, match, notifyLists)
);
bot.onText(/\/lists/, (msg) => listsHandler(bot, msg, notifyLists));
bot.onText(/\/get_holidays/, (msg) => getHolidays(bot, msg, notifyLists));
bot.onText(/\/видос (.+)/, (msg, match) => getVideo(bot, msg, match));
bot.onText(/\/игра/, (msg) => sendGame(bot, msg));

// Обработка ошибок
bot.on("polling_error", (error) => {
  console.error(`Ошибка опроса: ${error}`);
});

// Сохранение списков при закрытии бота
process.on("SIGINT", () => {
  const { saveLists } = require("./utils/saveLists");
  saveLists(notifyLists, db);
  console.log("Списки сохранены в базу данных.");
  db.close();
  process.exit();
});
