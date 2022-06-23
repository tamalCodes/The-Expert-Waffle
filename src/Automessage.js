module.exports = async (client) => {
  //   console.log(`${client.user.username}`);

  client.on("messageCreate", async (message) => {
    // console.log(`${message.content}`);

    var a1 = message.content.toLowerCase();

    if (message.author.id === process.env.BOT_CREATOR_ID) {
      if (
        a1 === "good morning" ||
        a1 === "good night" ||
        a1 === "good evening" ||
        a1 === "good afternoon"
      ) {
        message.react("💙");
      }
    }
  });
};
