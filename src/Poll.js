const addReactions = (message, reactions) => {
  message.react(reactions[0]);
  reactions.shift();
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750);
  }
};

module.exports = async (client) => {
  const reactions = ["👍", "👎"];

  client.on("messageCreate", async (message) => {
    if (message.channel.id === process.env.BOT_POLL_CHANNEL_ID) {
      addReactions(message, reactions);
    }
  });
};
