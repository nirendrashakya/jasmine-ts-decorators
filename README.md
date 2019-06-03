**Jasmine-ts-decorators**

<p>
  Jasmine TypeScript Decorators for readable and data-driven unit tests.<br>
  <em><b>Note:</b> This library is based on experimental decorators which are subject to change</em>
<p>
  
  **Code Sample**
```ts
@Spec('Calc')
export class CalcSpec {
  @SpecMethod('should add two numbers')
  SumTest() {
    const sum = Calc.Sum(5, 6);
    expect(sum).toBe(11);
  }

  @SpecMethod('should diff two numbers')
  DiffTest() {
    const actual = Calc.Diff(10, 5);
    expect(actual).toBe(5);
  }

  @SpecMethod('should multiply two numbers')
  MultipyTest() {
    const actual = Calc.Multiply(10, 5);
    expect(actual).toBe(50);
  }

  @SpecMethod('should add two numbers - dataset')
  @SpecData('A', 1, 2, 3)
  @SpecData('B', 1, 3, 4)
  @SpecData('C', 10, 20, 30)
  @SpecData('D', 100, 300, 400)
  SumTestData(a: number, b: number, expected: number) {
    const actual = Calc.Sum(a, b);
    expect(actual).toBe(expected);
  }

  @SpecMethod('should add two numbers - dataset object')
  @SpecData('A', { inputs: [1, 2, 3], expected: 6 })
  SumTestDataObj(data: { inputs: number[]; expected: number }) {
    const actual = Calc.Sum(...data.inputs);
    expect(actual).toBe(data.expected);
  }

  @SpecMethod('should diff two numbers - dataset')
  @SpecData('A', 10, 2, 8)
  @SpecData('B', 1, 3, -2)
  DiffTestData(a: number, b: number, expected: number) {
    const actual = Calc.Diff(a, b);
    expect(actual).toBe(expected);
  }
}
```
