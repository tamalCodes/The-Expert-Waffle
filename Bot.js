require("dotenv").config();

// client helps us interact with the discord API

const { Client, codeBlock } = require("discord.js");
const client = new Client({
  intents: 131071,
});
const command = require("./src/Command");
const firstMessage = require("./src/FirstMessage");

// at the top of your file
const { MessageEmbed } = require("discord.js");

// inside a command, event listener, etc.
// const exampleEmbed =

// I want to consolelog whenever the client is ready
// for that i will be using an event listener which listens to the client side if it is "ready" or not
//client.user.username is basically the name of the bot

client.on("ready", () => {
  console.log(`${client.user.username} has started 🚀`);
  firstMessage(client, process.env.DISCORD_RULES_ID, "hello world", [
    "🔥",
    "🚀",
    "👩‍🎤",
  ]);

  //* !ping

  command(client, "ping", (message) => {
    message.reply("PONG 🥎");
    message.react("🥎");
  });

  //* !mbc

  command(client, "mbc", (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send({
        embeds: [
          new MessageEmbed(guild)
            .setColor("#0099ff")
            .setTitle("**Member count**")
            .setAuthor({
              name: `${guild.name}`,
              iconURL: `${guild.iconURL()}`,
            })
            .setDescription(
              `**${guild.name}** has a total of **${guild.memberCount}** members 📈`
            )
            .setThumbnail(`${guild.iconURL()}`)
            .setFooter({
              text: `${client.user.username}`,
              iconURL: `${client.user.avatarURL()}`,
            }),
        ],
      });
    });
  });

  //* !clearch

  command(client, "clearch", (message) => {
    if (message.member.permissions.has("ADMINISTRATOR")) {
      message.channel.messages.fetch().then((results) => {
        console.log(results.size);
        message.channel.bulkDelete(results);

        message.channel.send({
          embeds: [
            new MessageEmbed()
              .setColor("#F7EC09")
              .setTitle("**Texts Deleted 🔨**")
              .setAuthor({
                name: `${client.user.username}`,
                iconURL: `${client.user.avatarURL()}`,
              })
              .setDescription(`**Deleted the last 100 messages 👨‍🔧**`),
          ],
        });

        // console.log(results);
        //
      });
    }
  });

  //* !status hello world

  command(client, "status", (message) => {
    const content = message.content.replace("!status ", "");

    client.user.setPresence({ activities: [{ name: content }] });
  });
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
