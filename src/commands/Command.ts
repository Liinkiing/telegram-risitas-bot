export default abstract class Command {

  private command: RegExp;
  public help: string;
  public usage: string;

  public abstract execute = (message: any, reply: any): void => {}


