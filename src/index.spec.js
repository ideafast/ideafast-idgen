const IDHandler = require('./index');

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