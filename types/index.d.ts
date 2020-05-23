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
  set(attr: string, value: any);
}
export {};
