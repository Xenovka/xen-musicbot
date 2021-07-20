const commando = require("discord.js-commando");
const DisTube = require("distube");

let distube;

module.exports = class Play extends commando.Command {
  constructor(client) {
    super(client, {
      name: "play",
      aliases: ["p"],
      group: "music",
      memberName: "play",
      description: "Play a music.",
      format: "!play [song title] | [youtube url]",
      argsType: "multiple"
    });

    distube = new DisTube(client, { leaveOnEmpty: true });
  }

  run(message, args) {
    const { channel, member } = message;

    if (!member.voice.channel) {
      message.reply(
        "You must join the voice channel before you can use this command!"
      );
      return;
    }

    if (args.length === 0) {
      channel.send("Song title or youtube url is required as the arguments!");
      return;
    }

    distube.play(message, args.join(" "));
  }
};
