const commando = require("discord.js-commando");
const DisTube = require("distube");

let distube;

module.exports = class Pause extends commando.Command {
  constructor(client) {
    super(client, {
      name: "pause",
      group: "music",
      memberName: "pause",
      description: "pause a music.",
      format: "!pause"
    });

    distube = new DisTube(client);
  }

  run(message) {
    const { channel, member, author } = message;

    if (!member.voice.channel) {
      message.reply(
        "You must join the voice channel before you can use this command!"
      );
      return;
    }

    distube.pause(message);
    channel.send(`Music Paused by [${author.tag}]`);
  }
};
