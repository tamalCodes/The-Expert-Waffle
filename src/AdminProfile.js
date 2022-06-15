const { prefix } = require("../config.json");
const { MessageEmbed } = require("discord.js");

//* Profile Embed

const exampleEmbed = {
  color: 0x0099ff,
  title: "**Fullstack Web developer**",
  url: "https://tamal.vercel.app/",
  author: {
    name: "Tamal Das",
    iconURL:
      "https://media-exp1.licdn.com/dms/image/D5603AQHIXigGQb0kHw/profile-displayphoto-shrink_200_200/0/1647973320480?e=1660780800&v=beta&t=AZsKFkghd3Uw2EdmmxKCx2_ROdco31RAjFzIDh9P6og",
    url: "https://tamal.vercel.app/",
  },
  description:
    "A passionate Web developer from India, contributing to open source and connecting communities !!",
  thumbnail: {
    url: "https://avatars.githubusercontent.com/u/72851613?v=4",
  },
  fields: [
    { name: "\u200B", value: "\u200B" },
    {
      name: "Who am i ? 🥑",
      value:
        "I am a sophomore, pursuing Btech in Computer science and engineering. I make elegantly professional 🌍 web apps and also design user experiences 🎨. I'm working on web development projects , mentoring students on Open Source events , and hustling to be better everyday.",
    },
    { name: "\u200B", value: "\u200B" },
    {
      name: "Checkout my Portfolio 🚀",
      value: "[Portfolio](https://tamal.vercel.app/)",
    },
    { name: "\u200B", value: "\u200B" },
    {
      name: "My tweets 🦉",
      value: "[Twitter](https://twitter.com/mrTamall)",
      inline: true,
    },
    {
      name: "My codes 🎯",
      value: "[GitHub ](https://github.com/IAmTamal)",
      inline: true,
    },
    {
      name: "My Works 🧁",
      value: "[Linkedin](https://www.linkedin.com/in/say-hello-to-tamal/)",
      inline: true,
    },
  ],
  image: {
    url: "https://i.ibb.co/tsHyBgp/20220305-DSC-0390.jpg",
    width: 200,
    height: 200,
    proxyURL: "https://i.ibb.co/tsHyBgp/20220305-DSC-0390.jpg",
  },
  footer: {
    text: "The-Expert-Waffle 🦇",
    iconURL: "https://i.ibb.co/WPy4zGM/neonwomanglasses.jpg",
  },
};

module.exports = (client, aliases) => {
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
        message.author.send({ embeds: [exampleEmbed] });
      }
    });
  });
};
