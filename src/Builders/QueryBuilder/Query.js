export default class Query {
  constructor(value) {
    this.value = value;
  }

  prefix = (prefixString) => {
    this.value = prefixString + this.value;

    return this;
  };

  get = () => {
    return this.value;
  }
}