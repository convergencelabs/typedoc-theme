export function isModule(kindString: string): boolean {
  return /external modules?$/i.exec(kindString) != null;
}