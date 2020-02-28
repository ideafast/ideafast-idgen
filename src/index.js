

const characterSet = 'ACDEFGHJKNPQRSTVXYZ2345679';

const getRandomString = (length) => {
    let text = '';
    for (let i = 0; i < length; i++)
        text += characterSet.charAt(Math.floor(Math.random() * characterSet.length));
    return text;
};

const getRemainder = (input, factor) => {
    let sum = 0;
    for (let i = input.length - 1; i >= 0; i--) {
        const codePoint = characterSet.indexOf(input.charAt(i));
        let addend = factor * codePoint;
        factor = (factor === 2) ? 1 : 2;
        addend = Math.floor(addend / characterSet.length) + (addend % characterSet.length);
        sum += addend;
    }
    return sum % characterSet.length;
};

const getCheckCharacter = (input) => {
    const remainder = getRemainder(input, 2);
    const checkCodePoint = (characterSet.length - remainder) % characterSet.length;
    return characterSet.charAt(checkCodePoint);
};

const generate = (length) => {
    if (length === undefined || length <= 1)
        length = 9;
    const prefix = getRandomString(length - 1);
    const check = getCheckCharacter(prefix);
    const id = `${prefix}${check}`;
    if (id.length > length)
        return generate(length);
    return id;
};

const validate = (input) => {
    const remainder = getRemainder(input, 1);
    return (remainder === 0);
};

const createIDHandler = () => ({
    generate,
    validate
});

export default createIDHandler();