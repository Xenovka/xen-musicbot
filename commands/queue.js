const { MessageButton, MessageActionRow } = require("discord-buttons");

let buttonPrev = new MessageButton()
  .setStyle("grey")
  .setLabel("Prev")
  .setID("button_prev");

let buttonNext = new MessageButton()
  .setStyle("grey")
  .setLabel("Next")
  .setID("button_next");

let buttons = new MessageActionRow().addComponents(buttonPrev, buttonNext);

module.exports = {
  name: "queue",
  aliases: ["q"],
  inVoiceChannel: false,
  run: (client, message) => {
    const { channel, guild } = message;

    let queueMessage = "```elm";
    const queue = client.distube.getQueue(guild.id);

    if (!queue) {
      channel.send("Queue is Empty.");
      return;
    }

    const totalPages = Math.ceil(queue.songs.length / 10);
    const limit = 10;

    if (totalPages <= 1) {
      queue.songs.forEach((song, idx) => {
        const songName = song.name.replace(/\'/g, "");
        queueMessage += `\n${idx + 1}) ${songName} ${song.formattedDuration}`;
      });
      return channel.send(`${queueMessage} \`\`\``);
    }

    let currentPage = 1;
    const pagination = currentPage * limit - limit;

    for (let i = pagination; i < currentPage * limit; i++) {
      const song = queue.songs[i];
      const songName = song.name.replace(/\'/g, "");
      queueMessage += `\n${i + 1}) ${songName} ${song.formattedDuration}`;
    }

    channel.send(`${queueMessage} \`\`\``, buttonNext);

    client.on("clickButton", async (button) => {
      if (button.id === "button_prev") {
        await button.reply.defer();
        currentPage--;

        for (let i = pagination; i < currentPage * limit; i++) {
          const song = queue.songs[i];
          const songName = song.name.replace(/\'/g, "");
          queueMessage += `\n${i + 1}) ${songName} ${song.formattedDuration}`;
        }

        if (currentPage === 1) {
          channel.send(`${queueMessage} \`\`\``, buttonNext);
          return;
        }

        channel.send(`${queueMessage} \`\`\``, buttons);
      }

      if (button.id === "button_next") {
        await button.reply.defer();
        currentPage++;

        for (let i = pagination; i < currentPage * limit; i++) {
          const song = queue.songs[i];
          const songName = song.name.replace(/\'/g, "");
          queueMessage += `\n${i + 1}) ${songName} ${song.formattedDuration}`;
        }

        if (currentPage === totalPages) {
          channel.send(`${queueMessage} \`\`\``, buttonPrev);
          return;
        }

        channel.send(`${queueMessage} \`\`\``, buttons);
      }
    });
  }
};
