import Component from '@glimmer/component';
import { Promise } from 'rsvp';
import { tracked } from '@glimmer/tracking';

type AnyPromise = Promise<unknown>;
interface PromiseArgs {
  promise?: AnyPromise;
}

enum State {
  Loading = 'loading',
  Fulfilled = 'fulfilled',
  Error = 'error',
}

export default class PromiseComponent extends Component<PromiseArgs> {
  @tracked
  state: State = State.Loading;

  @tracked
  error?: Error;

  @tracked
  data?: unknown;

  constructor(owner: unknown, args: PromiseArgs) {
    super(owner, args);

    if (args.promise) {
      args.promise
        .then((data) => {
          this.data = data;
          this.state = State.Fulfilled;
        })
        .catch((error) => {
          this.state = State.Error;
          this.error = error;
        });
    }
  }
}
