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
  #private;
  constructor(props: PropsTypes);
  /**
   * Compile attribute properties
   * @param {PropsTypes} props
   */
  private compile;
  /**
   * Define property getter and setter
   * @param {string} attr
   * @param {PropOptions} prop
   */
  private defineProperties;
  /**
   * Assert the given value match property types
   * @param {string} attr
   * @param {any} value
   * @param {PropOptions} prop
   */
  _assertType(attr: string, value: any, prop: PropOptions): boolean;
}
export {};
