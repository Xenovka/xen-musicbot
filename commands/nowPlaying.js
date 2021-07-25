const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  inVoiceChannel: false,
  run: (client, message) => {
    const { channel, guild, author } = message;

    const queue = client.distube.getQueue(guild.id);

    if (!queue) {
      channel.send("There's no available song inside the Queue.");
      return;
    }

    const song = queue.songs[0];

    const embeds = new MessageEmbed()
      .setAuthor("Now Playing", author.avatarURL())
      .setColor("BLUE")
      .setDescription(`[**${song.name}**](${song.url})`)
      .addFields(
        {
          name: "Channel",
          value: song.uploader.name,
          inline: true
        },
        {
          name: "Duration",
          value: song.formattedDuration,
          inline: true
        },
        {
          name: "Requested By",
          value: song.user,
          inline: true
        }
      )
      .setThumbnail(song.thumbnail)
      .setTimestamp();

    channel.send(embeds);
  }
};
