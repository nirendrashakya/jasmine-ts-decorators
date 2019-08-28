const specDataPropName = Symbol('specData');
const specMethodPropName = Symbol('specMethod');

export function Spec(name?: string) {
  return function(ctor: Function) {
    const specName = name || ctor['name'];
    describe(specName, () => {
      const objCtor = ctor.prototype.constructor;
      let obj = new objCtor();
      let props = Object.getOwnPropertyNames(ctor.prototype);
      for (const prop of props) {
        if (ctor.prototype[specMethodPropName] && ctor.prototype[specMethodPropName].hasOwnProperty(prop)) {
          obj[prop](obj);
        }
      }
    });
  };
}

export function SpecMethod(name?: string, timeout?: number) {
  return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    let original = descriptor.value;
    descriptor.value = (obj: Object) => {

      const specData = descriptor[specDataPropName];
      if (specData) {
        describe(name || propertyKey, () => {
          for (let i = specData.length - 1; i >= 0; i--) {
            const test = <TestDefinition>specData[i];
            it(
              test.name,
              async () => {
                await original.apply(obj, test.data);
              },
              timeout || jasmine.DEFAULT_TIMEOUT_INTERVAL
            );
          }
        });
      } else {
        it(
          name || propertyKey,
          async () => {
            await original.apply(obj);
          },
          timeout || jasmine.DEFAULT_TIMEOUT_INTERVAL
        );
      }
    };

    if (!target.hasOwnProperty(specMethodPropName)) Object.defineProperty(target, specMethodPropName, { value: {} });

    target[specMethodPropName][propertyKey] = true;
    return descriptor;
  };
}

export function SpecData(name: string, ...args: any) {
  return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    if (args && descriptor.value) {
      if (!descriptor[specDataPropName]) {
        Object.defineProperty(descriptor, specDataPropName, { writable: true, configurable: true });
        descriptor[specDataPropName] = new Array<TestDefinition>();
      }

      descriptor[specDataPropName].push({ name: name, data: args });
    }
    return descriptor;
  };
}

interface TestDefinition {
  name: string;
  data: any[];
}
