const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "seek",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const { channel, guild } = message;

    const queue = client.distube.getQueue(guild.id);

    if (!args.length) {
      message.reply("Incorrect command usage! type `!seek [minute:second]`");
      return;
    }

    const getTime = args.join(" ").split(":");
    const seekMinute = +getTime[0] * 60;
    const seekSecond = +getTime[1];
    const seekTime = seekMinute + seekSecond;

    const embeds = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `Seeking Current Song's **Time • ${getTime.join(" : ")}**`
      );

    if (
      seekSecond > 59 ||
      seekTime < 0 ||
      isNaN(seekSecond) ||
      isNaN(seekMinute)
    ) {
      message.reply("Invalid time range. It must be in range of 0-59");
      return;
    } else if (seekTime > queue.songs[0].duration) {
      message.reply("The seek time can't be longer than the song duration!");
      return;
    } else {
      client.distube.seek(guild.id, seekTime);
      channel.send(embeds);
      return;
    }
  }
};
