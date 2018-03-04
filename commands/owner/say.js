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
                key: "channel",
                prompt: "What channel should I put your message in?",
                type: "channel",
                default: ""
            }, {
                key: "text",
                prompt: "What would you like me to say?",
                type: "string"
            }],
            description: "Discord-chan sends a message specified by her owner."
        });
    }
    async run(message, args) {
        if (message.author.id != config.ownerid) return message.react("🚫"); // Cuts if not owner

        message.delete()
            .catch(console.error);
        if (!channel) return message.channel.send(args.text); // Sends if no channel mention

        args.channel.send(args.text); // Sends to specified channel
    }
}

module.exports = say;