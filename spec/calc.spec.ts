import { SpecData, SpecMethod, Spec } from '../index';
import { Calc } from './lib/calc';

@Spec('Calc')
export class CalcSpec {
  expectedSum = 11;
  constructor() {
    console.log('ctor');
  }
  @SpecMethod('should add two numbers')
  async SumTest() {
    const sum = Calc.Sum(5, 6);
    expect(sum).toBe(this.expectedSum);
  }

  @SpecMethod('should add two numbers async')
  async SumTestAsync() {
    let expected = await this.GetAsyncVal(11);
    const sum = Calc.Sum(5, 6);
    expect(sum).toBe(expected);
  }

  @SpecMethod('should add two numbers async with custom timeout', 6000)
  async SumTestAsyncTimeout() {
    let expected = await this.GetAsyncVal(11, 5000);
    const sum = Calc.Sum(5, 6);
    expect(sum).toBe(expected);
  }

  async GetAsyncVal(val: number, timeout = 2000): Promise<number> {
    return new Promise<number>(resolve => {
      setTimeout(() => resolve(val), timeout);
    });
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
