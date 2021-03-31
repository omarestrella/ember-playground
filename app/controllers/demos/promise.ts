import Controller from '@ember/controller';
import { action } from '@ember/object';
import { run } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class PromiseController extends Controller {
  @tracked
  promise?: Promise<unknown>;

  @action
  makeNewPromise(type: string): void {
    this.promise = undefined;
    run.next(() => {
      if (type === 'error') {
        this.promise = new Promise((_, reject) => {
          fetch('https://jsonplaceholder.typicode.com/todos/1').then(() => {
            setTimeout(
              () => reject(new Error('There was an error in your request!')),
              1000
            );
          });
        });
      } else {
        this.promise = new Promise((resolve) => {
          fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then((response) => response.json())
            .then((json) => setTimeout(() => resolve(json), 1000));
        });
      }
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    promise: PromiseController;
  }
}
