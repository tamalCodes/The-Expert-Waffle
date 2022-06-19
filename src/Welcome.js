const mongo = require("../database/Db");
const command = require("./Command");
const welcomeSchema = require("../models/WelcomeSchema");
const { MessageEmbed } = require("discord.js");

//^ !setwelcome <write the welcome message in here>

module.exports = (client) => {
  const cache = {}; // guildId: [channelId, text]

  command(client, "setwelcome", async (message) => {
    const { member, channel, guild, content } = message;

    if (!member.permissions.has("ADMINISTRATOR")) {
      message.delete();

      message.author.send(`<@${member.id}> You donot have such permissions !!`);

      return;
    }

    // i want the message to be checked so that the user has inputted stuffs after !setwelcome

    // so i will make the content an array and will also delete "setwelcome" from the message so that it doesnot ends up in the Database

    // so that < !setwelcome hello buddy >  will be ["hello" , "buddy"]

    let text = content;
    const split = text.split(" ");

    if (split.length < 2) {
      message.author.send("Please provide a welcome message");
      return;
    }

    split.shift();
    text = split.join(" ");

    cache[guild.id] = [channel.id, text];

    // finally putting it into the DB but also gotta make sure that we basically update the texts if it is already in the DB

    // upsert is basically the combo for insert and update !

    await mongo().then(async (mongoose) => {
      try {
        await welcomeSchema.findOneAndUpdate(
          {
            _id: guild.id,
          },
          {
            _id: guild.id,
            channelId: channel.id,
            text,
          },
          {
            upsert: true,
          }
        );
      } finally {
        mongoose.connection.close();
      }
    });
  });

  //^ Onjoin and Simjoin are there to stimulate the way the welcome message would appear

  const onJoin = async (member) => {
    const { guild } = member;

    let data = cache[guild.id];

    if (!data) {
      console.log("FETCHING FROM DATABASE. . .");

      await mongo().then(async (mongoose) => {
        try {
          const result = await welcomeSchema.findOne({ _id: guild.id });

          cache[guild.id] = data = [result.channelId, result.text];
        } finally {
          mongoose.connection.close();
        }
      });
    }

    const channelId = data[0];
    const text = data[1];

    const channel = guild.channels.cache.get(channelId);
    channel.send(text.replace(/<@>/g, `<@${member.id}>`));
  };

  command(client, "simjoin", async (message) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      message.delete();

      message.author.send(`<@${member.id}> You donot have such permissions !!`);

      return;
    }

    await mongo().then(async (mongoose) => {
      const { user, guild } = message.member;
      const { channel } = message;
      const result = await welcomeSchema.findOne({ _id: guild.id });
      if (!result) {
        console.log("Okay");

        const exampleEmbed = new MessageEmbed()
          .setColor("#0099ff")
          .setTitle("A new member has joined our guild !!")
          .setAuthor({
            name: user.tag,
            iconURL: user.displayAvatarURL(),
          })
          .setDescription(
            `Hello ${user.username} , Welcome to ${
              guild.name
            }. I am the ${`Expert waffle`}. Follow the rules, get some roles , and have fun.`
          )
          .setFooter({
            text: `ID: ${user.id}`,
          })
          .setTimestamp();

        channel.send({ embeds: [exampleEmbed] });
      } else {
        onJoin(message.member);
      }
    });
  });

  client.on("guildMemberAdd", async (member) => {
    // const { user, guild } = member;

    await mongo().then(async (mongoose) => {
      const { user, guild } = message.member;

      const result = await welcomeSchema.findOne({ _id: guild.id });

      if (!result) {
        console.log("Okay");

        const exampleEmbed = new MessageEmbed()
          .setColor("#0099ff")
          .setTitle("A new member has joined our guild !!")
          .setAuthor({
            name: user.tag,
            iconURL: user.displayAvatarURL(),
          })
          .setDescription(
            `Hello ${user.username} , Welcome to ${guild.name}. I am the Expert-waffle, summon me for any help. 
            Follow the rules, get some roles , and have fun.`
          )
          .setFooter({
            text: `ID: ${user.id}`,
          })
          .setTimestamp();

        channel.send({ embeds: [exampleEmbed] });

        return;
      } else {
        onJoin(message.member);
      }
    });
  });
};
