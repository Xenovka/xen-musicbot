const path = require("path");
const { MongoClient } = require("mongodb");
const { MongoDBProvider } = require("commando-provider-mongo");
const commando = require("discord.js-commando");
require("dotenv").config();

const client = new commando.Client({
  owner: "394151971986210836"
}).setMaxListeners(0);

client.registry
  .registerGroups([["music", "music commands"]])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, "commands"));

client.setProvider(
  MongoClient.connect(process.env.MONGODB_URL, { useUnifiedTopology: true })
    .then((client) => {
      return new MongoDBProvider(client, "music-bot");
    })
    .catch((err) => console.error(err))
);

client.login(process.env.TOKEN);

client.on("ready", () => {
  console.log("Bot Ready!");
});
