const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv");

client.on("ready", () => {
  console.log("Bot Ready!");
});

client.login(process.env.TOKEN);
