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

module.exports = { homeMenue };
