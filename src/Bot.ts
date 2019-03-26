const botgram = require('botgram')

import Command from "./commands/Command";

class Bot {

  private commands: Command[] = []

  constructor(private readonly token: string) {}

  public registerCommands = (commands: Command[]): this => {
    this.commands = commands

    return this
  }

}

export default Bot
