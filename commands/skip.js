module.exports = {
  name: "skip",
  aliases: ["s"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const { channel, author, guild } = message;

    const queue = client.distube.getQueue(guild.id);

    if (!queue) {
      channel.send("There's no available song inside the Queue.");
      return;
    }

    try {
      await client.distube.skip(guild.id);
      channel.send(`The song is **Skipped** by ${author}`);
    } catch (err) {
      if (err) {
        channel.send("You can't skip the last song.");
        return;
      }
    }
  }
};
