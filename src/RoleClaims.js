const firstMessage = require("./FirstMessage");

module.exports = (client) => {
  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName);

  const emojis = {
    Coding: "**Coding**\n",
    Backend: "**Backend**\n",
    Frontend: "**Frontend**\n",
  };

  const reactions = [];

  let emojiText = "Add a reaction to claim a role\n\n";
  for (const key in emojis) {
    const emoji = getEmoji(key);
    reactions.push(emoji);

    const role = emojis[key];
    emojiText += `${emoji} -> ${role}\n`;
  }

  firstMessage(client, process.env.BOT_ROLES_CHANNEL_ID, emojiText, reactions);

  // Here we handle the roles as per as the emoji name
  // It is better if the name of the Roles and the name of the Emoji is same
  // We can destructure the guild from the message and as a result we can also find out the roles from there

  const handleRoles = (reaction, user, add) => {
    if (user.id === process.env.BOT_OWN_ID) {
      return;
    }

    const emoji = reaction.emoji.name;
    const { guild } = reaction.message;

    // Getting the rolename and basically removing bold and next lines from it
    // this is done so that rolename and The guild roles are same

    const initial_rolename = emojis[emoji];
    const initial_rolename2 = initial_rolename.replace("**", "");
    const initial_rolename3 = initial_rolename2.replace("**", "");
    const rolename = initial_rolename3.replace("\n", "");

    if (!rolename) {
      return;
    }

    const role = guild.roles.cache.find((role) => role.name === rolename);
    const member = guild.members.cache.find((member) => member.id === user.id);

    // console.log(member);

    // console.log(role.id);

    if (add) {
      member.roles.add(role.id);
    } else {
      member.roles.remove(role.id);
    }
  };

  client.on("messageReactionAdd", (reaction, user) => {
    if (reaction.message.channel.id === process.env.BOT_ROLES_CHANNEL_ID) {
      handleRoles(reaction, user, true);
    }
  });

  client.on("messageReactionRemove", (reaction, user) => {
    if (reaction.message.channel.id === process.env.BOT_ROLES_CHANNEL_ID) {
      handleRoles(reaction, user, false);
    }
  });
};
