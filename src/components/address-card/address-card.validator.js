import validator from 'validator';

const AddressCardValidator = {
    validators: {
        zipCode: new RegExp(/^([0-9]{2})(-[0-9]{3})?$/i),
        city: new RegExp(
            /^[A-ZĆŁÓŚŹŻ][a-ząćęłńóśźż]+(?:[\s-][A-ZĆŁÓŚŹŻ][a-ząćęłńóśźż]+)*$/
        ),
        street: new RegExp(
            /^[A-ZĆŁÓŚŹŻ][a-ząćęłńóśźż]+(?:[\s-][A-ZĆŁÓŚŹŻ][a-ząćęłńóśźż]+)*$/
        ),
        houseNumber: new RegExp(/^\d+[a-zA-Z]*$/),
        flatNumber: {
            test: (value) => {
                if (!value) {
                    return true;
                }
                return new RegExp(/^[1-9][0-9]*$/).test(value);
            },
        },
        phoneNumber: {
            test: (value) => validator.isMobilePhone(value, 'pl-PL'),
        },
        isDefault: {
            test: (value) => typeof value === 'boolean',
        },
    },

    validate: function (name, value) {
        return this.validators[name].test(value);
    },
    validateBeforeSave: function (address) {
        const keys = Object.keys(address);
        if (keys.length === 0) {
            return false;
        }
        const { validators } = this;
        return keys
            .map((key) => validators[key].test(address[key]))
            .reduce((test, key) => test && key);
    },
};

export default AddressCardValidator;
