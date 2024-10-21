const TelegramBot = require("node-telegram-bot-api");
const configs = require("./configs");
const axios = require("axios");

const redis = require("./redis");
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

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text.startsWith("/")) {
    const action = await redis.get(`user:${chatId}:action`);
    const lang = await redis.get(`user:${chatId}:lang`);

    if (action && lang) {
      const response = await axios.get(
        `https://one-api.ir/translate/?token=${configs.apiToken}&action=${action}&lang=${lang}&q=` +
          encodeURIComponent(text)
      );

      bot.sendMessage(chatId, response.data.result);

      await redis.del(`user:${chatId}:action`);
      await redis.del(`user:${chatId}:lang`);
    }

    homeMenue(bot, chatId);
  }
});

bot.on("polling_error", (error) => {
  console.log("polling-error", error);
});
