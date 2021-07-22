const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client().setMaxListeners(0);
require("dotenv").config();

client.on("ready", async () => {
  console.log("Bot Ready!");

  await client.user.setPresence({
    activity: {
      name: "with Xen",
      type: "PLAYING"
    },
    status: "idle"
  });

  const handlerFile = "commandHandler.js";
  const commands = require(`./commands/${handlerFile}`);

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      } else if (file !== handlerFile) {
        const options = require(path.join(__dirname, dir, file));
        commands(client, options);
      }
    }
  };

  readCommands("commands");
});

client.login(process.env.TOKEN);
