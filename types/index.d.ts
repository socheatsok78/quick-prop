export type PropOptions = {
  type: Function | Array<Function> | null;
  default: any;
  required: ?boolean;
  validator: ?Function;
};

export type PropsTypes = {
  [key: string]: PropOptions;
};

export type StateTypes = {
  [key: string]: any;
};
