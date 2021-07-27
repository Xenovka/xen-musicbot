const { MessageMenuOption, MessageMenu } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "search",
  aliases: ["find"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const { channel, member } = message;

    if (args.length === 0) {
      message.reply("Incorrect command usage! type `!search [search string]`");
      return;
    }

    await client.distube.voices.join(member.voice.channel); // Automatically Join Voice Channel

    const searchResult = await client.distube.search(args.join(" "));
    const embeds = new MessageEmbed()
      .setColor("BLUE")
      .setDescription("Select the tracks you want to play!");

    let options = [];

    searchResult.forEach((song) => {
      let option = new MessageMenuOption()
        .setLabel(
          song.name.length > 20 ? song.name.slice(0, 22) + "..." : song.name
        )
        .setDescription(`${song.uploader.name} • ${song.formattedDuration}`)
        .setValue(song.url);

      options.push(option);
    });

    const select = new MessageMenu()
      .setID("search_select")
      .setMaxValues(1)
      .setMinValues(1)
      .setPlaceholder("Select a Song")
      .addOptions(options);

    channel.send(embeds, select);

    client.on("clickMenu", async (menu) => {
      try {
        await menu.reply.defer();
        await client.distube.play(message, menu.values[0]);
        await menu.message.delete();
      } catch (err) {
        if (err) return;
      }
    });
  }
};
