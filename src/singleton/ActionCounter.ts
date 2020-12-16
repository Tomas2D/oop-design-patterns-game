export class ActionCounter {
  private constructor() {}

  private counter = 0;

  public increment() {
    this.counter++;
  }

  public decrement() {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  public getCount(): number {
    return this.counter;
  }

  private static ActionHolder = class {
    static INSTANCE: ActionCounter = new ActionCounter();
  };

  public static getInstance(): ActionCounter {
    return this.ActionHolder.INSTANCE;
  }
}
