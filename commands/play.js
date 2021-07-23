module.exports = {
  name: "play",
  aliases: ["p"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const { channel } = message;
    const argsText = args.join(" ");

    if (!argsText) {
      channel.send(
        "You must provide song url or song title to use this command."
      );
      return;
    }

    try {
      client.distube.play(message, argsText);
    } catch (err) {
      channel.send("An error occured while trying to use the command.");
    }
  }
};
