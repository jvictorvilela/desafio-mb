const PESSOA_FISICA = 'pf';
const PESSOA_JURIDICA = 'pj';

export default class User {
    static validateUser(userObject) {
        if (userObject.personType === PESSOA_FISICA) {
            return this.validatePfUser(userObject);
        } else if (userObject.personType === PESSOA_JURIDICA) {
            return this.validatePjUser(userObject);
        }
        return false;
    }

    static validatePfUser(userObject) {
        const { birth, cpf, email, name, password, tel} = userObject;
        return birth && cpf && email && name && password && tel;
    }

    static validatePjUser(userObject) {
        const { cnpj, corporateName, email, openingDate, password, tel} = userObject;
        return cnpj && corporateName && email && openingDate && password && tel;
    }
}