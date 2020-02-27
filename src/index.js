

const characterSet = 'ACDEFGHJKNPQRSTVXYZ2345679';

const randomString = (length) => {
    let text = '';
    for (let i = 0; i < length; i++) {
        text += characterSet.charAt(Math.floor(Math.random() * characterSet.length));
    }
    return text;
};

const generateCheckCharacter = (input) => {

    let factor = 2;
    let sum = 0;
    const n = characterSet.length;

    // Starting from the right and working leftwards is easier since 
    // the initial "factor" will always be "2" 
    for (let i = input.length - 1; i >= 0; i--) {
        const codePoint = characterSet.indexOf(input.charAt(i));
        let addend = factor * codePoint;

        // Alternate the "factor" that each "codePoint" is multiplied by
        factor = (factor == 2) ? 1 : 2;

        // Sum the digits of the "addend" as expressed in base "n"
        addend = Math.floor(addend / n) + (addend % n);
        sum += addend;
    }

    // Calculate the number that must be added to the "sum" 
    // to make it divisible by "n"
    const remainder = sum % n;
    const checkCodePoint = (n - remainder) % n;

    return characterSet.charAt(checkCodePoint);
};

const generate = (length) => {
    if (length === undefined || length < 0)
        length = 9;
    const prefix = randomString(length - 1);
    const check = generateCheckCharacter(prefix);
    const id = `${prefix}${check}`;
    if (id.length > length)
        return generate(length);
    return id;
};

const validate = (input) => {

    let factor = 1;
    let sum = 0;
    let n = characterSet.length;

    // Starting from the right, work leftwards
    // Now, the initial "factor" will always be "1" 
    // since the last character is the check character
    for (let i = input.length - 1; i >= 0; i--) {
        const codePoint = characterSet.indexOf(input.charAt(i));
        let addend = factor * codePoint;


        // Alternate the "factor" that each "codePoint" is multiplied by
        factor = (factor == 2) ? 1 : 2;

        // Sum the digits of the "addend" as expressed in base "n"
        addend = Math.floor(addend / n) + (addend % n);
        sum += addend;
    }

    const remainder = sum % n;

    return (remainder == 0);
};

const createIDHandler = () => ({
    generate,
    validate
});

export default createIDHandler();