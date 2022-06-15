//* This is the commands page so that we can handle most of the commands here instead of clogging up the Bot.js file

const { prefix } = require("../config.json");

module.exports = (client, aliases, callback) => {
  if (typeof aliases === "string") {
    aliases = [aliases];
  }

  client.on("message", (message) => {
    const { content } = message;

    aliases.forEach((alias) => {
      const command = `${prefix}${alias}`;

      if (content.startsWith(`${command} `) || content === command) {
        callback(message);
      }
    });
  });
};
