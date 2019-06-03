const specDataPropName = 'specData';
const specMethodPropName = 'specMethod';

export function Spec(name?: string) {
  return function(constructor: Function) {
    const specName = name || constructor['name'];
    describe(specName, () => {
      let obj = Object.create(constructor.prototype);
      let props = Object.getOwnPropertyNames(constructor.prototype);
      props.forEach(prop => {
        if (constructor.prototype[specMethodPropName] && constructor.prototype[specMethodPropName].hasOwnProperty(prop)) {
          constructor.prototype[prop].apply(obj);
        }
      });
    });
  };
}

export function SpecMethod(name?: string) {
  return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    let original = descriptor.value;
    descriptor.value = () => {
      const specData = descriptor[specDataPropName];
      if (specData) {
        describe(name || propertyKey, () => {
          for (let i = specData.length - 1; i >= 0; i--) {
            const test = <TestDefinition>specData[i];
            it(test.name, () => {
              original.apply(target, test.data);
            });
          }
        });
      } else {
        it(name || propertyKey, () => {
          original.apply(target);
        });
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
