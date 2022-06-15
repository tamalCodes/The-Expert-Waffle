require("dotenv").config();

// client helps us interact with the discord API

const { Client, codeBlock } = require("discord.js");
const client = new Client({ intents: 131071 });
const command = require("./src/Command");

// I want to consolelog whenever the client is ready
// for that i will be using an event listener which listens to the client side if it is "ready" or not
//client.user.username is basically the name of the bot

client.on("ready", () => {
  console.log(`${client.user.username} has started 🚀`);

  command(client, "ping", (message) => {
    message.reply("PONG 🥎");
    message.react("🥎");
  });
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
