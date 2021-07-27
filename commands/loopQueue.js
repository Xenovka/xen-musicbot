const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "loopqueue",
  aliases: ["lq", "repqueue"],
  inVoiceChannel: true,
  run: (client, message) => {
    const { channel, guild } = message;

    const queue = client.distube.getQueue(guild.id);

    if (!queue) {
      message.reply("Queue is empty, Nothing can be looped.");
      return;
    }

    const loopQueue = client.distube.setRepeatMode(guild.id, 2);
    const loopStatus = loopQueue ? "Enabled" : "Disabled";

    const embeds = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(`**Loop Queue ${loopStatus}.**`);

    channel.send(embeds);
  }
};
