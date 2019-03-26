export interface ICommand {
  command: RegExp;
  help: string;
  usage?: string;
  execute: (msg:any, reply:any) => void;
}
