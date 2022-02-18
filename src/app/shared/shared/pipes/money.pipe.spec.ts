import { MoneyPipe } from './money.pipe';

describe('MoneyPipe', () => {
  it('create an instance', () => {
    const pipe = new MoneyPipe();
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
    const pipe = new MoneyPipe();
    let resut = pipe.transform('1234')
    expect(resut).toBeTruthy();
  });
});