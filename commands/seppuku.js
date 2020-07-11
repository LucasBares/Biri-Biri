const CustomCommand = require('../core/command.js').CustomCommand
const utils = require('../core/utils.js')
const message = require('../core/message.js')

const maxReports    = 1;                   // Amounts of reports
const minutes       = 20;                  // Minutes Muted
const mutePeriod    = minutes * 60 * 1000; // Cooldown time of mute

class MuteCommand extends CustomCommand {
    constructor() {
        let params = {
            'name': 'seppuku',
            'execute': async (msg) => {
        const recipient   = utils.getFirstMentionID(msg);                 // Who is being reported
        const reporter    = msg.author.id;                                // Who is reporting
        const server      = msg.guild.id;                                 // Where are they reporting
        const time        = Date.now();                                   // Time of the report
        const muteRole    = msg.guild.roles.find('name','Muted');         // Look for the muted role

        /* -----------------------------------------------------------------
          Considerations:
            This is a copy of mute kek
         ----------------------------------------------------------------- */
        
        if (!muteRole){
            let reply = new message.BaseMessage(msg)
            reply.setDescription(`Necesito que haya un rol que se llame **Muted** para que funcione bien el comando`)
            reply.setColor(0x00fd00)
            msg.channel.send(reply)
            return
        }
        // Do not allow users to report more than once every 10 minutes per server
        if(this.userReports[reporter] === undefined) this.userReports[reporter] = []
        if(this.userReports[reporter].every( (v,i,a) => ( v.time + mutePeriod < Date.now() || v.server !== server ) )) {

            // Log the report entry from the reporter
            this.userReports[reporter].push({ server: server, time: time, recipient: recipient });

            // Add the report entry to the recipient
            if(this.reports[recipient] === undefined) this.reports[recipient] = []
            this.reports[recipient].push({ server: server, time: time, reporter: reporter });

            // Count the total reports in the last 10 minutes
            const reportCount = this.reports[recipient].reduce( (acc, v) => {
                return acc + ((v.time + mutePeriod) > Date.now() && v.server === server) ? 1 : 0
            }, 0);


            let imagenes = ["https://media1.tenor.com/images/b25511087b27597960f77dd0dbaf568d/tenor.gif","https://media.giphy.com/media/yjGdFXbm8KpXF5Xqco/giphy.gif","https://media.giphy.com/media/c6DIpCp1922KQ/giphy.gif","https://media.giphy.com/media/zqdbOacOP9Djy/giphy.gif","https://media1.tenor.com/images/341dad126b09ee3204b74612b8a74017/tenor.gif","https://media.giphy.com/media/129FklkXsetHl6/giphy.gif","https://media.giphy.com/media/vkwAeqMEUSaoU/giphy.gif","https://media.giphy.com/media/12ttoBXEqixfmo/giphy.gif","https://media.giphy.com/media/3oEjI4Kahhc47OSdOw/giphy.gif","https://media.giphy.com/media/BgVwNombFusbC/giphy.gif","https://media.giphy.com/media/26tPughh56URCl2og/giphy.gif"]

            let randomImageCalculator = Math.floor(Math.random()*imagenes.length);

            let randomImage = imagenes[randomImageCalculator]

            let reply = new message.BaseMessage(msg)
            reply.setDescription(`**${msg.author.username} se suicimato**`)
            reply.setColor(0x00fd00)
            reply.setImage(randomImage)
            msg.channel.send(reply)

            // If there are enough reports, add the user to the mute list
            // and do not overwrite mutes
            if(reportCount >= maxReports && !this.mutedUsers[recipient]) {

                // Get the servers where the user is muted
                const servers = this.mutedUsers.get(recipient) || [];

                // Append the server to the servers array
                this.mutedUsers.set(recipient, servers.concat(server));


                // Via Roles ---------- ADD ------------
                if(muteRole)
                    msg.member.addRole(muteRole.id)
                        .catch(console.error);
                // -------------------------------------


                // Set the argument data sent to the timer callback
                const timerArgs = {
                    recipient:recipient,
                    server: server,
                    muteRole: muteRole,
                    member: msg.member
                };


                /* ----------------------
                  Timer and Callback
                ---------------------- */

                // Register a timeout for mutePeriod
                setTimeout(function(args){
                    // Get the servers where the user is muted
                    const servers = this.mutedUsers.get(args.recipient) || [];

                    // Remove args.server from the servers list
                    this.mutedUsers.set(args.recipient, servers.filter( (v) => v !== args.server) );

                    // Via Roles -------- REMOVE -----------
                    if(args.muteRole)
                        args.member.removeRole(args.muteRole.id)
                            .catch(console.error);
                    // -------------------------------------

                }.bind(this), mutePeriod, timerArgs);
            }
        }
    }
    }
        super(params)
        this.reports       = new Array();
        this.userReports   = new Array();
        this.mutedUsers    = new Map();
    }

    checkMuted(msg) {
        return (this.mutedUsers.get(msg.author.id) || []).indexOf(msg.guild.id) > -1;
    }
}

exports.getCommands = (clients) => {
    return [new MuteCommand()];
}
