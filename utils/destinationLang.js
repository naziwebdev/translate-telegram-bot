const destinationLang = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "english", callback_data: "en" },
        { text: "persian", callback_data: "fa" },
      ],
      [
        { text: "franch", callback_data: "fr" },
        { text: "spanish", callback_data: "es" },
      ],
    ],
  },
};

module.exports = { destinationLang };
