const commando = require("discord.js-commando");
const DisTube = require("distube");

let distube;

module.exports = class Pause extends commando.Command {
  constructor(client) {
    super(client, {
      name: "resume",
      group: "music",
      memberName: "resume",
      description: "resume a music.",
      format: "!resume"
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

    distube.resume(message);
    channel.send(`Music Resumed by [${author.tag}]`);
  }
};
