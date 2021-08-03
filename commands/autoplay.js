const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "autoplay",
  aliases: ["auto", "ap"],
  inVoiceChannel: true,
  run: (client, message) => {
    const { channel, guild } = message;
    const queue = client.distube.getQueue(guild.id);
    const isAutoplay = queue.toggleAutoplay() ? "On" : "Off";

    const embeds = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(`Autoplay is **${isAutoplay}**`);

    channel.send(embeds);
  }
};
