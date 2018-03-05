const commando = require("discord.js-commando");
const config = require("../.././config.json");

class say extends commando.Command {
    constructor(client) {
        super(client, {
            name: "say",
            memberName: "say",
            group: "owner",
            aliases: ["sayd", "sd", "s", "saydelete", "tell"],
            args: [{
                key: "text",
                prompt: "What would you like me to say?",
                type: "string"
            }],
            description: "Discord-chan sends a message specified by her owner."
            // TODO: Add usage examples
        });
    }
    async run(message, args) {
        if (message.author.id !== config.ownerid) { // Cuts if not owner
            message.react("🚫");
            // TODO: Perhaps console log user who tries to access bot?
            return 0;
        }

        message.delete()
            .catch(console.error);

        if (!message.mentions.channels.first()) return message.channel.send(args.text); // Sends if no channel mention

        var argsSplit = args.text.split(" ");
        if (message.mentions.channels.first()) { // It says first but it actually finds channel mention regardless
            if (argsSplit[argsSplit.length - 2] !== "d!in") argsSplit.slice(1); // Mention at start of msg
            else argsSplit.splice(-2);  // Mention at end of msg

            args.text = argsSplit.join(" ");
            return message.mentions.channels.first().send(args.text);
        }
    }
}

module.exports = say;