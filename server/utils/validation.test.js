const {expect} = require('expect');
const { isRealString } = require('./isRealStringValidate');

describe('is Valid String', ()=> {
    it("should reject non-string values", () => {
        let res = isRealString(65);

        expect(res).toBe(false);
    })

    it("should reject string with only spaces", () => {
        let res = isRealString('         ');

        expect(res).toBe(false);
    })

    it("should allow string with non-space characters", () => {
        let res = isRealString('      Suchak       ');

        expect(res).toBe(true);
    })


})