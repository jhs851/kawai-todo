import "./helpers";

export default class {
    /**
     * 주어진 value를 주어진 rules로 유효성 검사합니다.
     *
     * @param {mixed} value
     * @param {array} rules
     * @returns {boolean}
     */
    static validate(value, rules) {
        for (let i = 0; i < rules.length; i++) {
            if (! this[`validate${rules[i].toTitleCase()}`](value)) {
                return false;
            }
        }

        return true;
    }

    /**
     * 주어진 value가 값이 있는지 확인합니다.
     *
     * @param {mixed} value
     * @returns {boolean}
     */
    static validateRequired(value) {
        switch (typeof value) {
            case 'string':
                return this.validateRequiredString(value);
            default:
                return false;
        }
    }

    /**
     * 주어진 string<value>가 빈 문자열인지 확인합니다.
     *
     * @param {string} value
     * @returns {boolean}
     */
    static validateRequiredString(value) {
        value = value.trim();

        return ! (value === '' || value === undefined);
    }
}