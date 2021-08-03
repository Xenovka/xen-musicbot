module.exports = {
  name: "prev",
  aliases: ["pprev", "previous"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const { channel, guild } = message;

    const prevSong = await client.distube.previous(guild.id);

    if (!prevSong) {
      channel.send("There's no previous song before this song!");
      return;
    }

    channel.send("Playing Previous Song!");
  }
};
