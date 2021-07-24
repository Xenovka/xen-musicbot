module.exports = {
  name: "clear",
  inVoiceChannel: true,
  run: async (client, message) => {
    const { channel, guild } = message;

    const queue = client.distube.getQueue(guild.id);

    if (!queue) {
      channel.send("Queue is Empty.");
      return;
    }

    queue.delete();
    queue.textChannel.send("Queue deleted. Bye-byee. . . .");
    queue.voice.leave();
  }
};
