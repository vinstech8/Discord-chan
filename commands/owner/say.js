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
            }, {
                key: "channel",
                prompt: "What channel should I put your message in?",
                type: "channel",
                default: false
            }],
            description: "Discord-chan sends a message specified by her owner."
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
        
        if (!args.channel) return message.channel.send(args.text); // Sends if no channel mention

        var argsSplit = args.text.split(" ");
        if (argsSplit[argsSplit.length - 1] === "in") { // Checks if user states "send message in #channel"
            argsSplit.pop(); // Pops off last element
            var text = argsSplit.join(" "); // Joins elements
        }
        args.channel.send(text); // Sends to specified channel
    }
}

module.exports = say;