import {
  Field,
  SmartContract,
  state,
  State,
  method,
  DeployArgs,
  Permissions,
} from 'o1js';

export class SecondaryZkApp extends SmartContract {
  @state(Field) num = State<Field>();

  async deploy() {
    await super.deploy();
    this.account.permissions.set({
      ...Permissions.default(),
    });
  }

  @method async init() {
    this.account.provedState.requireEquals(this.account.provedState.get());
    this.account.provedState.get().assertFalse();

    super.init();
    this.num.set(Field(12));
  }

  @method async add(incrementBy: Field) {
    this.account.provedState.requireEquals(this.account.provedState.get());
    this.account.provedState.get().assertTrue();

    const num = this.num.get();
    this.num.requireEquals(num);
    this.num.set(num.add(incrementBy));
  }
}
