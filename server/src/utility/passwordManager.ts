import bcrypt = require('bcryptjs');

const saltRounds = 2;
const salt = bcrypt.genSaltSync(saltRounds);

const generateHash = (plaintextPassword: string) => {
    return bcrypt.hashSync(plaintextPassword, salt);
};

const isPasswordOk = (plaintextPassword: string, hashPassword: string) => {
    return bcrypt.compareSync(plaintextPassword, hashPassword);
};

export {
    generateHash,
    isPasswordOk,
};
