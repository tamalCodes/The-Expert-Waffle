require("dotenv").config();

// client helps us interact with the discord API

const { Client, codeBlock } = require("discord.js");
const client = new Client({
  intents: 131071,
});
const command = require("./src/Command");
const autodetect = require("./src/Automessage");
const profilecommand = require("./src/AdminProfile");
const roleClaim = require("./src/RoleClaims");

// at the top of your file
const { MessageEmbed } = require("discord.js");

// inside a command, event listener, etc.
// const exampleEmbed =

// I want to consolelog whenever the client is ready
// for that i will be using an event listener which listens to the client side if it is "ready" or not
//client.user.username is basically the name of the bot

client.on("ready", () => {
  console.log(`${client.user.username} has started 🚀`);
  autodetect(client);

  // Automations

  autodetect(client);
  roleClaim(client);

  // ping

  command(client, "ping", (message) => {
    message.reply("PONG 🥎");
    message.react("🥎");
  });

  // mbc

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

  // clearch

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

  // status hello world

  command(client, "status", (message) => {
    const content = message.content.replace("!status ", "");

    client.user.setPresence({ activities: [{ name: content }] });
  });

  // waffle

  profilecommand(client, "waffle");

  // help

  command(client, "help", (message) => {
    const exampleEmbed = {
      color: "#AB46D2",
      title: "Commands i offer 🛠",
      fields: [
        { name: "\u200B", value: "\u200B" },
        {
          name: "🍕 `!ping`",
          value: "I will reply you with Pong XD\v\v",
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: "🍕 `!clearch`",
          value: "I clear out the last 100 texts",
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: "🍕 `!mbc`",
          value: "I will tell you the total members",
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: "🍕 `!waffle`",
          value: "I will boast about my creator",
        },
      ],
      footer: {
        text: "The-Expert-Waffle 🦇",
        iconURL: "https://i.ibb.co/WPy4zGM/neonwomanglasses.jpg",
      },
    };
    message.reply({ embeds: [exampleEmbed] });
  });

  // ban

  command(client, "ban", (message) => {
    const { member, mentions } = message;

    if (
      member.permissions.has("ADMINISTRATOR") ||
      member.permissions.has("BAN_MEMBERS") ||
      member.permissions.has("KICK_MEMBERS")
    ) {
      const target = mentions.users.first();

      if (target) {
        const banmember = message.guild.members.cache.get(target.id);
        const banmember_user = banmember.user.username;

        client.users.fetch(target.id).then((user) => {
          try {
            user.send("You have been banned !! ").then(() => {
              message.guild.members.cache.get(target.id).ban();
            });
          } catch (err) {
            console.log("err");
          }
        });
      } else {
        message.author.send("IDK whom to ban sir");
      }
    } else {
      message.delete();
      message.author.send(`<@${member.id}> You donot have such permissions !!`);
    }
  });

  // kick

  command(client, "kick", (message) => {
    const { member, mentions } = message;

    if (
      member.permissions.has("ADMINISTRATOR") ||
      member.permissions.has("BAN_MEMBERS") ||
      member.permissions.has("KICK_MEMBERS")
    ) {
      const target = mentions.users.first();

      if (target) {
        const banmember = message.guild.members.cache.get(target.id);
        const banmember_user = banmember.user.username;

        client.users.fetch(target.id).then((user) => {
          try {
            user.send("You have been kicked !! ").then(() => {
              message.guild.members.cache.get(target.id).kick();
            });
          } catch (err) {
            console.log("err");
          }
        });
      } else {
        message.author.send("IDK whom to kick sir");
      }
    } else {
      message.delete();
      message.author.send(`<@${member.id}> You donot have such permissions !!`);
    }
  });
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
