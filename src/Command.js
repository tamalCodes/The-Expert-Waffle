//* This is the commands page so that we can handle most of the commands here
//* This page is done in order to the perfect message

const { prefix } = require("../config.json");

module.exports = (client, aliases, callback) => {
  if (typeof aliases === "string") {
    aliases = [aliases];
  }

  client.on("message", (message) => {
    const { content } = message;

    const commandcontent = content.toLowerCase();

    aliases.forEach((alias) => {
      const initialcommand = `${prefix}${alias}`;
      const command = initialcommand.toLowerCase();

      // we made startsWith(`${command} `) so that it works on !ping and not on !pinging

      if (
        commandcontent.startsWith(`${command} `) ||
        commandcontent === command
      ) {
        callback(message);
      }
    });
  });
};
