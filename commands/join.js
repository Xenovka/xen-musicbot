module.exports = {
  name: "join",
  aliases: ["summon", "joni"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const { member, channel } = message;

    try {
      await client.distube.voices.join(member.voice.channel);
    } catch (err) {
      channel.send(
        "> An error occured while bot is trying to joining to the voice channel."
      );
      return;
    }
  }
};
