import { VueConstructor } from "vue";

declare type PropOptions = {
  type: Function | Array<Function> | null;
  default: any;
  required?: boolean;
  validator?: Function;
};

declare type PropsTypes = {
  [key: string]: PropOptions;
};

declare type StateTypes = {
  [key: string]: any
};

export const QuickPropVue = {
  /**
   * Extend QuickProp Observable plugin from Vue
   * @param {VueConstructor} Vue
   */
  install(Vue: VueConstructor);
}

export default class QuickProp {
  /**
   * Create a new instance of QuickProp
   * @param {PropsTypes} props
   * @param {StateTypes} state
   */
  constructor(props: PropsTypes, state?: StateTypes);

  /**
   * Import state
   * @param {StateTypes} state
   */
  import(state: StateTypes): void;

  /**
   * Assert all properties for validity
   * @returns {boolean}
   */
  validate(): boolean;

  /**
   * Internally update attribute property without trigger validation
   * @param {string} attr
   * @param {any} value
   */
  set(attr: string, value: any): void;

  /**
   * Get Vue.js styled props
   * @returns {PropsTypes}
   */
  toProps(): PropsTypes;
}
