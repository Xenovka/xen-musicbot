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

    const limit = 10;
    const totalPages = Math.ceil(queue.songs.length / limit);

    if (totalPages <= 1) {
      queue.songs.forEach((song, idx) => {
        const songName = song.name.replace(/\'/g, "");
        queueMessage += `\n${idx + 1}) ${songName} ${song.formattedDuration}`;
      });
      return channel.send(`${queueMessage} \`\`\``);
    }

    let currentPage = 1;
    let pagination = currentPage * limit - limit;

    channel.send(
      showQueueMessage(queue, pagination, currentPage, limit),
      buttonNext
    );

    client.on("clickButton", async (button) => {
      if (button.id === "button_prev") {
        await button.reply.defer();
        currentPage--;
        pagination = currentPage * limit - limit;

        if (currentPage === 1) {
          button.message.edit(
            showQueueMessage(queue, pagination, currentPage, limit),
            buttonNext
          );
          return;
        }

        button.message.edit(
          showQueueMessage(queue, pagination, currentPage, limit),
          buttons
        );
      }

      if (button.id === "button_next") {
        await button.reply.defer();
        currentPage++;
        pagination = currentPage * limit - limit;

        if (currentPage === totalPages) {
          button.message.edit(
            showQueueMessage(queue, pagination, currentPage, limit),
            buttonPrev
          );
          return;
        }

        button.message.edit(
          showQueueMessage(queue, pagination, currentPage, limit),
          buttons
        );
      }
    });
  }
};

const showQueueMessage = (queue, pagination, currentPage, limit) => {
  queueMessage = "```elm";
  for (let i = pagination; i < currentPage * limit; i++) {
    const song = queue.songs[i];

    if (!song) break;

    const songName = song.name.replace(/\'/g, "");
    queueMessage += `\n${i + 1}) ${songName} ${song.formattedDuration}`;
  }

  return queueMessage + "```";
};
