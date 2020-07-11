const CustomCommand = require('../core/command.js').CustomCommand
const utils = require('../core/utils.js')
const message = require('../core/message.js')

const maxReports    = 1; // Amounts of reports
const minutes       = 1; // Minutes Muted
const mutePeriod    = minutes * 60 * 1000; // Cooldown time of mute

class MuteCommand extends CustomCommand {
  constructor() {
    let params = {
      'name': 'mute',
      'execute': async (msg) => {
        const recipient   = utils.getFirstMentionID(msg);                 // Who is being reported
        const reporter    = msg.author.id;                                // Who is reporting
        const server      = msg.guild.id;                                 // Where are they reporting
        const time        = Date.now();                                   // Time of the report
        const muteRole    = msg.guild.roles.find('name','Muted');         // Look for the muted role
        let has_admin     = msg.member.permissions.has("ADMINISTRATOR")   // Check if the user has admin
        let has_manage    = msg.member.permissions.has("MANAGE_MESSAGES") // Check if the user has Manage Messages
        
        /* -----------------------------------------------------------------
          Considerations:
            Users can only report once per server every mutePeriod.
            A mute is given when a user reaches maxReports in a server.
            Mute reports can still be given out if a user already muted.
         ----------------------------------------------------------------- */
        
        // Check if any member has been mentioned
        if (!recipient) return msg.channel.send("Dame a alguien que mutear, pendejo")

        // Check if a member has a specific permission on the guild!
        if (!has_admin || !has_manage) return msg.channel.send("Necesitas ser admin para hacer esto, pendejo")

        if(recipient === undefined) return
        
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

          // If there are enough reports, add the user to the mute list
          // and do not overwrite mutes
          if(reportCount >= maxReports && !mutedUsers[recipient]) {

            // Get the servers where the user is muted
            const servers = mutedUsers.get(recipient) || [];

            // Append the server to the servers array
            this.mutedUsers.set(recipient, servers.concat(server));


            // Via Roles ---------- ADD ------------
            if(muteRole)
              msg.member.addRole(muteRole.id)
                .then(console.log)
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
                  .then(console.log)
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
