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

const reactions = ["💜", "💚", "💙", "💛"];

const addReactions = (message, reactions) => {
  for (const reaction of reactions) {
    message.react(reaction);
    setTimeout(() => {
      addReactions(message, reactions);
    }, 750);
  }
};

client.on("message", async (message) => {
  if (
    message.content.toLowerCase() === "bad" ||
    message.content.toLowerCase() === "f"
  ) {
    message.delete();

    message.reply("**Sorry but**", {
      embed: {
        color: "#F32424",
        title: `**${message.author.username} , Oops! You cannot say that!**`,
        description: "Please take care of such words in the future!",
        image: {
          url: "https://media.giphy.com/media/Ju7l5y9osyymQ/giphy.gif",
        },

        footer: {
          text: "The-Expert-Waffle 🔨",
        },
      },
    });
  } else if (
    message.content.toLowerCase() === "good morning" ||
    message.content.toLowerCase() === "good afternoon" ||
    message.content.toLowerCase() === "good evening" ||
    message.content.toLowerCase() === "good night"
  ) {
    addReactions(message, reactions);
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
// console.log(` is online!`);
