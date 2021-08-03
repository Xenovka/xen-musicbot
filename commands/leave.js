module.exports = {
  name: "leave",
  aliases: ["dc", "bye"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const { channel, guild } = message;

    const voice = client.distube.voices.get(guild.id);
    const queue = client.distube.getQueue(guild.id);

    if (!voice) {
      channel.send("I'm not in the voice channel");
      return;
    }

    voice.leave();
    if (!queue) {
      channel.send("Byee-byee. . . .");
      return;
    } else {
      queue.delete();
      channel.send("Byee-byee. . . .");
      return;
    }
  }
};
