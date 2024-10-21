const TelegramBot = require("node-telegram-bot-api");
const configs = require("./configs");
const { homeMenue } = require("./actions/botActions");
const { destinationLang } = require("./utils/destinationLang");
const { choiceDestLang } = require("./actions/botActions");
const { getUserLang } = require("./actions/botActions");

const token = configs.telegramToken;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  homeMenue(bot, chatId);
});

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const command = query.data;
  const messageId = query.message.message_id;
  const keyboard = destinationLang;

  const actions = ["google", "microsoft"];
  const langs = ["en", "fa", "fr", "es"];

  if (actions.includes(command))
    await choiceDestLang(
      bot,
      chatId,
      "action",
      command,
      keyboard,
      "choice destination lang :",
      messageId
    );

  if (langs.includes(command))
    await getUserLang(
      bot,
      chatId,
      "lang",
      command,
      "متن مورد نظر را ارسال کنید :"
    );
});

bot.on("polling_error", (error) => {
  console.log("polling-error", error);
});
