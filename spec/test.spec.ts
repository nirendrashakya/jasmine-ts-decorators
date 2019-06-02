import { SpecData, SpecMethod, Spec } from '../';

@Spec('TestService')
class TestSpec {
  @SpecMethod('should add two numbers')
  @SpecData('A', 1, 2, 3)
  @SpecData('B', 1, 3, 4)
  addTest(a: number, b: number, expected: number) {
    //console.log(`${a} + ${b} = ${expected}`);
    expect(a + b).toBe(expected);
  }

  @SpecMethod('should substract two numbers')
  subTest() {
    //console.log(`${a} + ${b} = ${expected}`);
    expect(5).toBe(5);
  }

  @SpecMethod()
  @SpecData('A', 10, 2, 8)
  @SpecData('B', 1, 3, -2)
  subTestData(a: number, b: number, expected: number) {
    //console.log(`${a} + ${b} = ${expected}`);
    expect(a - b).toBe(expected);
  }
}
