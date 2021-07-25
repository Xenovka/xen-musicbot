module.exports = {
  name: "leave",
  aliases: ["dc", "bye"],
  inVoiceChannel: true,
  run: (client, message) => {
    const { channel, guild } = message;

    const voice = client.distube.voices.get(guild.id);

    if (!voice) {
      channel.send("I'm not in the voice channel, LMAO 🤪");
      return;
    }

    voice.leave();
    channel.send("Byee-byee. . . .");
  }
};
