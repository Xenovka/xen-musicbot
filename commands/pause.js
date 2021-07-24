module.exports = {
  name: "pause",
  inVoiceChannel: true,
  run: (client, message) => {
    const { channel, author, guild } = message;

    const queue = client.distube.getQueue(guild.id);
    if (!queue) {
      channel.send("There's no available song inside the Queue.");
      return;
    }

    if (queue.paused) {
      channel.send("The song is already Paused.");
      return;
    }

    client.distube.pause(guild.id);
    channel.send(`The song is **Paused** by ${author}`);
  }
};
