export class Calc {
  static Sum(...nums: number[]): number {
    let sum = 0;
    nums.forEach(n => (sum += n));
    return sum;
  }

  static Diff(a: number, b: number): number {
    return a - b;
  }

  static Multiply(a: number, b: number): number {
    return a * b;
  }
}
