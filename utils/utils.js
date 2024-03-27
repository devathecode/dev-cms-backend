const generateString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    console.log('ffbksdjbfkjbdskj', Array.from({ length }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
    ).join(''))
    return Array.from({ length }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
}

module.exports = generateString
