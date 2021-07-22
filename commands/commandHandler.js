const prefix = process.env.PREFIX;

module.exports = (client, options) => {
  let {
    commands,
    expectedArgs = "",
    minArgs = 0,
    maxArgs = null,
    callback
  } = options;

  if (typeof commands === "string") {
    commands = [commands];
  }

  client.on("message", (message) => {
    const { content } = message;

    for (let alias of commands) {
      let args = content.split(/[ ]+/);

      if (args[0] === prefix + alias) {
        args.shift();

        if (
          args.length < minArgs ||
          (maxArgs !== null && args.length > maxArgs)
        ) {
          message.reply(
            `Incorrect command usage! type ${prefix}${alias} ${expectedArgs} to use the command.`
          );
          return;
        }

        let params = {
          message,
          args,
          argsText: args.join(" "),
          client,
          alias
        };

        callback(({ message, args, argsText, client, alias } = params));
      }
    }
  });
};
