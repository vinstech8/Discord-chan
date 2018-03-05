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
            console.log(message.author);
            return 0;
        }

        message.delete()
            .catch(console.error);

        if (!message.mentions.channels.first()) return message.channel.send(args.text); // Sends if no channel mention

        var argsSplit = args.text.split(" ");
        if (argsSplit[0] !== "in") argsSplit.splice(0, 1); // Mention starts without in
        else if (argsSplit[0] === "in") argsSplit.splice(0, 2); // Mention starts with in
        else return message.channel.send(args.text); // Found a channel mention that isn't trying to send to another channel

        args.text = argsSplit.join(" ");
        return message.mentions.channels.first().send(args.text);
    }
}

module.exports = say;