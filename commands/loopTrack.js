const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "loop",
  aliases: ["looptrack", "lt", "repeat", "reptrack"],
  inVoiceChannel: true,
  run: (client, message) => {
    const { channel, guild } = message;

    const queue = client.distube.getQueue(guild.id);

    if (!queue) {
      message.reply("Queue is empty, Nothing can be looped.");
      return;
    }

    const loopTrack = client.distube.setRepeatMode(guild.id, 1);
    const loopStatus = loopTrack ? "Enabled" : "Disabled";

    const embeds = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(`**Loop Track ${loopStatus}.**`);

    channel.send(embeds);
  }
};
