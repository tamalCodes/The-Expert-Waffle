require("dotenv").config();

// client helps us interact with the discord API

const { Client, codeBlock } = require("discord.js");
const client = new Client();

// I want to consolelog whenever the client is ready
// for that i will be using an event listener which listens to the client side if it is "ready" or not
//client.user.username is basically the name of the bot

client.on("ready", () => {
  console.log(`${client.user.username} has started 🚀`);
});

client.on("message", async (message) => {
  if (
    message.content === "BAD" ||
    message.content === "bad" ||
    message.content === "Bad" ||
    message.content === "F"
  ) {
    message.reply({
      embed: {
        color: "#F32424",
        title: `${message.author.username} , Oops! You cannot say that! `,
        description: "Please take care of such words in the future!",
        footer: {
          text: "The-Expert-Waffle 🔨",
        },
      },
    });
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
// console.log(` is online!`);
