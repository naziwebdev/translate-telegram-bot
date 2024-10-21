const redis = require("../redis");

const homeMenue = (bot, chatId) => {
  const inlineKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "google engine ترجمه با ", callback_data: "google" },
          { text: "microsoft engine ترجمه با ", callback_data: "microsoft" },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, "choice the engine of translate : ", inlineKeyboard);
};

const choiceDestLang = async (
  bot,
  chatId,
  field,
  command,
  keyboard,
  message,
  messageId
) => {
  await redis.set(`user:${chatId}:${field}`, command , "EX" , 60*5);

  bot.editMessageText(message, {
    chat_id:chatId,
    message_id:messageId,
    reply_markup:keyboard.reply_markup
  })
};

module.exports = { homeMenue, choiceDestLang };
