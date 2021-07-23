const fs = require("fs");
const Discord = require("discord.js");
const { DisTube } = require("distube");
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
});

client.login(process.env.TOKEN);

client.distube = new DisTube(client, { leaveOnFinish: true });
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.log("Couldn't find any command files.");

  const commandFile = files.filter((file) => file.split(".").pop() === "js");

  if (commandFile.length <= 0)
    return console.log("Couldn't find any command files");

  commandFile.forEach((file) => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    if (command.aliases)
      command.aliases.forEach((alias) =>
        client.aliases.set(alias, command.name)
      );
  });
});

client.on("message", async (message) => {
  const prefix = process.env.PREFIX;
  const { content, channel, member } = message;

  if (!content.startsWith(prefix)) return;

  const args = content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));

  if (!cmd) return;

  if (cmd.inVoiceChannel && !member.voice.channel)
    return channel.send("You must in a voice channel to use this command.");

  try {
    cmd.run(client, message, args);
  } catch (err) {
    console.log(err);
    message.reply("An error occured while trying to use the command.");
  }
});

client.distube
  .on("playSong", (queue, song) => {
    const embeds = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `**Playing** ${song.name} • **Requested** by [${song.user}]`
      );

    queue.textChannel.send(embeds);
  })
  .on("addSong", (queue, song) => {
    if (queue.songs.length === 1) return;

    const embeds = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `**Adding** ${song.name} **to Queue** • **Requested** by [${song.user}]`
      );

    queue.textChannel.send(embeds);
  })
  .on("finish", (queue) => {
    queue.textChannel.send("Queue is empty now. Byeee. . . .");
  })
  .on("empty", (queue) => {
    queue.textChannel.send("Why you left me alone ?! ");
  });
