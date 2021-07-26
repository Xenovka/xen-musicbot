module.exports = {
  name: "clear",
  inVoiceChannel: true,
  run: (client, message) => {
    const { channel, guild } = message;

    const queue = client.distube.getQueue(guild.id);

    if (!queue) {
      channel.send("Queue is Empty.");
      return;
    }

    queue.delete();
    queue.textChannel.send(
      "Queue has been deleted and now it's Empty. Byeee. . ."
    );

    setTimeout(() => {
      queue.voice.leave();
    }, 1000);
  }
};
