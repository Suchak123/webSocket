
const {expect} = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('Generate Message', () => {
    it("should generate correct message object", ()=> {
        let from = "Suchak",
            text = "Hallelujah!!"
            message = generateMessage(from, text);
        
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});

    })
});

describe('Generate Location Message', () => {
    it('should generate correct location object', ()=> {
        let from = 'Suchak',
        lat = 13,
        long = 60,
        url = `https://www.google.com/maps?q=${lat},${long}`,
        message = generateLocationMessage(from, lat, long);
        
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});

    })
});