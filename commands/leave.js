module.exports = {
  name: "leave",
  aliases: ["dc", "bye"],
  inVoiceChannel: true,
  run: (client, message) => {
    const { channel, guild } = message;

    const voice = client.distube.voices.get(guild.id);
    const queue = client.distube.getQueue(guild.id);

    if (!voice) {
      channel.send("I'm not in the voice channel, LMAO 🤪");
      return;
    }

    voice.leave();
    queue.delete();
    queue.textChannel.send("Byee-byee. . . .");
  }
};
