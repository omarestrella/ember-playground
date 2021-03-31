import { helper } from '@ember/component/helper';

export function not(params: [unknown]): boolean {
  return !params[0];
}

export default helper(not);
