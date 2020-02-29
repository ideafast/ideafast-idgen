const IDHandler = require('./index');
const getRandomStringMock = jest.fn();

getRandomStringMock
    .mockReturnValueOnce('2A')
    .mockReturnValueOnce('1337')
    .mockReturnValue('12345678');

test('Exports the right shape', () => {
    expect(IDHandler.default).toBeDefined();
    expect(IDHandler.default.generate).toBeDefined();
    expect(IDHandler.default.validate).toBeDefined();
    expect(IDHandler.generate).toBeDefined();
    expect(IDHandler.validate).toBeDefined();
});

test('Derives correct remainders', () => {
    const INT_getRemainder = IDHandler.__get__('getRemainder');
    const samples = ['HT', '4NT4K', 'QRJA4DRS7', 'FGEET9TY7Z6S5ZG'];
    expect(samples.map((sample) => INT_getRemainder(sample, 2)).join(',')).toBe('9,14,23,10');
    expect(samples.map((sample) => INT_getRemainder(sample, 1)).join(',')).toBe('0,0,0,0');
});

test('Retries on incorrect lengths', () => {
    IDHandler.__Rewire__('getRandomString', getRandomStringMock);
    expect(IDHandler.generate()).toHaveLength(9);
    IDHandler.__ResetDependency__('getRandomString');
});

test('Generates an ID', () => {
    expect(IDHandler.generate()).toHaveLength(9);
});

test('Generates an ID of given length', () => {
    expect(IDHandler.generate(15)).toHaveLength(15);
});

test('Generates an ID ignoring invalid length', () => {
    expect(IDHandler.generate(-3)).toBeUndefined();
    expect(IDHandler.generate(1)).toBeUndefined();
});

test('Generates different IDs', () => {
    const ids = [...Array(100).keys()].map(() => IDHandler.generate());
    expect(ids.filter((v, i, self) => self.indexOf(v) === i)).toHaveLength(100);
});

test('Generates valid IDs', () => {
    const ids = [...Array(100).keys()].map(() => IDHandler.generate());
    const res = ids.map((id) => IDHandler.validate(id));
    expect(res.filter(r => r === true)).toHaveLength(100);
});

test('Validate IDs', () => {
    expect(IDHandler.validate('FDDRKCX5NSJS9QR')).toBe(true);
    expect(IDHandler.validate('JZFVCQAAD')).toBe(true);
    expect(IDHandler.validate('GSKVSN79F')).toBe(false);
    expect(IDHandler.validate()).toBe(false);
    expect(IDHandler.validate(42)).toBe(false);
});