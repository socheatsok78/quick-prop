declare type PropOptions = {
  type: Function | Array<Function> | null;
  default: any;
  required?: boolean;
  validator?: Function;
};

declare type PropsTypes = {
  [key: string]: PropOptions;
};

export default class QuickProp {
  /**
   * Create a new instance of QuickProp
   * @param {PropsTypes} props
   */
  constructor(props: PropsTypes);

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
}
