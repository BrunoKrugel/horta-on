const {
    validateTemperature
} = require('../../lib/validations/temperature');

test('Validate perfect temperature', () => {
    expect(validateTemperature(23)).toBe(true);
});

test('Validate wrong temperature', () => {
    expect(validateTemperature(15).severity).toEqual("warn");
});