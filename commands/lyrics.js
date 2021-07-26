const { MessageEmbed } = require("discord.js");
const lyricsSearcher = require("lyrics-finder");
const Genius = require("genius-lyrics");
const Client = new Genius.Client();

module.exports = {
  name: "lyrics",
  aliases: ["l", "ly", "lyric"],
  inVoiceChannel: false,
  run: async (client, message, args) => {
    const { channel, guild } = message;

    const queue = client.distube.getQueue(guild.id);

    if (!args.length) {
      if (!queue) {
        channel.send(
          "Queue is Empty now! You must provide a song title to get a lyrics."
        );
        return;
      }

      const getLyrics = await lyricsSearcher(queue.songs[0].name);

      if (!getLyrics) {
        channel.send("Lyrics not found!");
        return;
      }

      const embeds = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(queue.songs[0].name)
        .setDescription(`\n${queue.songs[0].uploader.name}\n\n${getLyrics}`)
        .setFooter("Lyrics Provided by Lyrics-Finder")
        .setTimestamp();

      channel.send(embeds);
      return;
    }

    const getSong = await Client.songs.search(args.join(" "));

    if (!getSong) {
      channel.send("Lyrics not found!");
      return;
    }

    const result = getSong[0];
    const getLyrics = await lyricsSearcher(result.artist.name, result.title);

    const embeds = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(result.title)
      .setDescription(`\n${result.artist.name}\n\n${getLyrics}`)
      .setFooter("Lyrics Provided by Lyrics-Finder")
      .setTimestamp();

    channel.send(embeds);
  }
};
