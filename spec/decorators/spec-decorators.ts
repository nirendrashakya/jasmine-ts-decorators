const specDataPropName = 'specData';
const specMethodPropName = 'specMethod';

export function Spec(name?: string) {
  return function(constructor: Function) {
    const specName = name || constructor['name'];
    //console.log('@Spec', specName);
    describe(specName, () => {
      let obj = Object.create(constructor.prototype);
      let props = Object.keys(constructor.prototype);
      props.forEach(prop => {
        if (constructor.prototype[specMethodPropName] && constructor.prototype[specMethodPropName].hasOwnProperty(prop)) {
          constructor.prototype[prop].apply(obj);
        }
      });
    });
  };
}

export function SpecMethod(description: string) {
  return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    //console.log('@SpecMethod');
    let original = descriptor.value;
    descriptor.value = () => {
      const specData = descriptor[specDataPropName];
      if (specData) {
        describe(description || propertyKey, () => {
          for (let i = specData.length - 1; i >= 0; i--) {
            const test = <TestDefinition>specData[i];
            it(test.name, () => {
              original(...test.data);
            });
          }
        });
      } else {
        it(description || propertyKey, () => {
          original();
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
    //console.log('@SpecData');
    if (args && descriptor.value) {
      if (!descriptor[specDataPropName]) {
        // debugger;
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
