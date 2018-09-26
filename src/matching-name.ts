export class MatchingName {

  private _timesFound: number = 1;

  constructor(private name: string) {

  }

  public get timesFound(): number {
    return this._timesFound;
  }

  public increment(): void {
    this._timesFound++;
  }

  public toString(): string {
    return this.name;
  }
}

export type MatchingNameMap = Map<string, MatchingName>;