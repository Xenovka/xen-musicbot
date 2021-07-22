const { MessageEmbed } = require("discord.js");
const DisTube = require("distube");

module.exports = {
  commands: ["play", "p"],
  expectedArgs: "[song title] | [youtube url]",
  minArgs: 1,
  maxArgs: 100,
  callback: ({ message, client, argsText }) => {
    const distube = new DisTube(client, {
      emitNewSongOnly: true,
      leaveOnEmpty: true,
      leaveOnFinish: true
    });
    const { member } = message;

    if (!member.voice.channel) {
      message.reply(
        "You must in the voice channel if you want to use this command!"
      );
      return;
    }

    distube.play(message, argsText);
    distube.on("playSong", (message, queue, song) => {
      queue.autoplay = false;
      queue.volume = 50;

      const embeds = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(
          `**Playing** ${song.name} • **Requested** by [${song.user}]`
        );

      message.channel.send(embeds);
    });

    distube.on("finish", (message) => {
      message.channel.send("Queue is Empty, Byeee. . .");
      return;
    });
  }
};
