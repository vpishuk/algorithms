import * as FindAHole from './find-a-hole';
import * as chai from 'chai';

const should = chai.should();

describe('FindAHole', () => {
    it('should return null if array is empty', () => {
        const next = FindAHole.findAHole([]);
        chai.expect(next).to.equal(null);
    });

    it('should return register = 0, bitString = 0000000000000001 if it is available', () => {
        const next = FindAHole.findAHole([{ register: 0, bitString: '0000000000000011' }]);
        const bit = 1;

        next?.should.have.property('register', 0);
        next?.should.have.property('bitString', bit.toString(2).padStart(16, '0'));
    });

    it('should return register = 0, bitString = 0000000000000010 if it is available', () => {
        const next = FindAHole.findAHole([
            { register: 0, bitString: '0000000000000001' },
            { register: 0, bitString: '0000000000000011' }
        ]);
        const bit = 2;

        next?.should.have.property('register', 0);
        next?.should.have.property('bitString', bit.toString(2).padStart(16, '0'));
    });

    it('should return register = 0, bitString = 000000000000100 if it is available', () => {
        const next = FindAHole.findAHole([
            { register: 0, bitString: '0000000000000001' },
            { register: 0, bitString: '0000000000000010' }
        ]);
        const bit = 4;

        next?.should.have.property('register', 0);
        next?.should.have.property('bitString', bit.toString(2).padStart(16, '0'));
    });

    it('should return register = 0, bitString = 100000000000000 if it is available', () => {
        const next = FindAHole.findAHole([
            { register: 0, bitString: '0000000000000001' },
            { register: 0, bitString: '0000000000000010' },
            { register: 0, bitString: '0000000000000100' },
            { register: 0, bitString: '0000000000001000' },
            { register: 0, bitString: '0000000000010000' },
            { register: 0, bitString: '0000000000100000' },
            { register: 0, bitString: '0000000001000000' },
            { register: 0, bitString: '0000000010000000' },
            { register: 0, bitString: '0000000100000000' },
            { register: 0, bitString: '0000001000000000' },
            { register: 0, bitString: '0000010000000000' },
            { register: 0, bitString: '0000100000000000' },
            { register: 0, bitString: '0001000000000000' },
            { register: 0, bitString: '0010000000000000' },
            { register: 0, bitString: '0100000000000000' }
        ]);
        const bit = 2 ** 15;

        next?.should.have.property('register', 0);
        next?.should.have.property('bitString', bit.toString(2).padStart(16, '0'));
    });

    it('should return register = 1, bitString = 000000000000001 if it is available', () => {
        const next = FindAHole.findAHole([
            { register: 0, bitString: '0000000000000001' },
            { register: 0, bitString: '0000000000000010' },
            { register: 0, bitString: '0000000000000100' },
            { register: 0, bitString: '0000000000001000' },
            { register: 0, bitString: '0000000000010000' },
            { register: 0, bitString: '0000000000100000' },
            { register: 0, bitString: '0000000001000000' },
            { register: 0, bitString: '0000000010000000' },
            { register: 0, bitString: '0000000100000000' },
            { register: 0, bitString: '0000001000000000' },
            { register: 0, bitString: '0000010000000000' },
            { register: 0, bitString: '0000100000000000' },
            { register: 0, bitString: '0001000000000000' },
            { register: 0, bitString: '0010000000000000' },
            { register: 0, bitString: '0100000000000000' },
            { register: 0, bitString: '1000000000000000' },
            { register: 0, bitString: '1000000000000001' },
            { register: 0, bitString: '1000000000001000' }
        ]);
        const bit = 1;

        next?.should.have.property('register', 1);
        next?.should.have.property('bitString', bit.toString(2).padStart(16, '0'));
    });

    it('should return register = 1, bitString = 000000000000001 if it is available and no configurations on register 1', () => {
        const next = FindAHole.findAHole([
            { register: 0, bitString: '0000000000000001' },
            { register: 0, bitString: '0000000000000010' },
            { register: 0, bitString: '0000000000000100' },
            { register: 0, bitString: '0000000000001000' },
            { register: 0, bitString: '0000000000010000' },
            { register: 0, bitString: '0000000000100000' },
            { register: 0, bitString: '0000000001000000' },
            { register: 0, bitString: '0000000010000000' },
            { register: 0, bitString: '0000000100000000' },
            { register: 0, bitString: '0000001000000000' },
            { register: 0, bitString: '0000010000000000' },
            { register: 0, bitString: '0000100000000000' },
            { register: 0, bitString: '0001000000000000' },
            { register: 0, bitString: '0010000000000000' },
            { register: 0, bitString: '0100000000000000' },
            { register: 0, bitString: '1000000000000000' }
        ]);
        const bit = 1;

        next?.should.have.property('register', 1);
        next?.should.have.property('bitString', bit.toString(2).padStart(16, '0'));
    });

    it('should return register = 1, bitString = 000000000000010 if it is available', () => {
        const next = FindAHole.findAHole([
            { register: 0, bitString: '0000000000000001' },
            { register: 0, bitString: '0000000000000010' },
            { register: 0, bitString: '0000000000000100' },
            { register: 0, bitString: '0000000000001000' },
            { register: 0, bitString: '0000000000010000' },
            { register: 0, bitString: '0000000000100000' },
            { register: 0, bitString: '0000000001000000' },
            { register: 0, bitString: '0000000010000000' },
            { register: 0, bitString: '0000000100000000' },
            { register: 0, bitString: '0000001000000000' },
            { register: 0, bitString: '0000010000000000' },
            { register: 0, bitString: '0000100000000000' },
            { register: 0, bitString: '0001000000000000' },
            { register: 0, bitString: '0010000000000000' },
            { register: 0, bitString: '0100000000000000' },
            { register: 0, bitString: '1000000000000000' },
            { register: 1, bitString: '0000000000000001' },
            { register: 1, bitString: '1000000000001000' }
        ]);
        const bit = 2;

        next?.should.have.property('register', 1);
        next?.should.have.property('bitString', bit.toString(2).padStart(16, '0'));
    });

    it('should return register = 1, bitString = 000000000000100 if it is available', () => {
        const next = FindAHole.findAHole([
            { register: 0, bitString: '0000000000000001' },
            { register: 0, bitString: '0000000000000010' },
            { register: 0, bitString: '0000000000000100' },
            { register: 0, bitString: '0000000000001000' },
            { register: 0, bitString: '0000000000010000' },
            { register: 0, bitString: '0000000000100000' },
            { register: 0, bitString: '0000000001000000' },
            { register: 0, bitString: '0000000010000000' },
            { register: 0, bitString: '0000000100000000' },
            { register: 0, bitString: '0000001000000000' },
            { register: 0, bitString: '0000010000000000' },
            { register: 0, bitString: '0000100000000000' },
            { register: 0, bitString: '0001000000000000' },
            { register: 0, bitString: '0010000000000000' },
            { register: 0, bitString: '0100000000000000' },
            { register: 0, bitString: '1000000000000000' },
            { register: 1, bitString: '0000000000000001' },
            { register: 1, bitString: '0000000000000010' }
        ]);
        const bit = 4;

        next?.should.have.property('register', 1);
        next?.should.have.property('bitString', bit.toString(2).padStart(16, '0'));
    });

    it('should start from the first register in the list', () => {
        const next = FindAHole.findAHole([
            { register: 1, bitString: '0000000000000001' },
            { register: 1, bitString: '0000000000000010' }
        ]);
        const bit = 4;

        next?.should.have.property('register', 1);
        next?.should.have.property('bitString', bit.toString(2).padStart(16, '0'));
    });

    it('should return null if there are no available spots', () => {
        const next = FindAHole.findAHole([
            { register: 0, bitString: '0000000000000001' },
            { register: 0, bitString: '0000000000000010' },
            { register: 0, bitString: '0000000000000100' },
            { register: 0, bitString: '0000000000001000' },
            { register: 0, bitString: '0000000000010000' },
            { register: 0, bitString: '0000000000100000' },
            { register: 0, bitString: '0000000001000000' },
            { register: 0, bitString: '0000000010000000' },
            { register: 0, bitString: '0000000100000000' },
            { register: 0, bitString: '0000001000000000' },
            { register: 0, bitString: '0000010000000000' },
            { register: 0, bitString: '0000100000000000' },
            { register: 0, bitString: '0001000000000000' },
            { register: 0, bitString: '0010000000000000' },
            { register: 0, bitString: '0100000000000000' },
            { register: 0, bitString: '1000000000000000' },
            { register: 0, bitString: '1000000000000001' },
            { register: 0, bitString: '1000000000000011' },
            { register: 0, bitString: '1000000000000111' }
        ]);

        chai.expect(next).to.equal(null);
    });

    it('should throw an error if array of models is not sorted by bitString in ascending order', () => {
        try {
            const next = FindAHole.findAHole([
                { register: 0, bitString: '0000000000000001' },
                { register: 0, bitString: '0000000000000010' },
                { register: 0, bitString: '0000000000000100' },
                { register: 0, bitString: '0000000000001000' },
                { register: 0, bitString: '0000000000010000' },
                { register: 0, bitString: '0000000001000000' },
                { register: 0, bitString: '0000000000100000' },
                { register: 0, bitString: '0000000010000000' },
                { register: 0, bitString: '0000000100000000' },
                { register: 0, bitString: '0000001000000000' },
                { register: 0, bitString: '0000010000000000' },
                { register: 0, bitString: '0000100000000000' },
                { register: 0, bitString: '0001000000000000' },
                { register: 0, bitString: '0010000000000000' },
                { register: 0, bitString: '0100000000000000' },
                { register: 0, bitString: '1000000000000000' },
                { register: 0, bitString: '1000000000000001' },
                { register: 0, bitString: '1000000000000011' },
                { register: 0, bitString: '1000000000000111' }
            ]);
            throw new Error('Did not throw');
        } catch (e) {
            e.should.have.property(
                'message',
                'An array of configurations should be sorted by register and then by bitString in ascending order'
            );
        }
    });

    it('should throw an error if array of models is not sorted by register in ascending order', () => {
        try {
            const next = FindAHole.findAHole([
                { register: 1, bitString: '0000000000000001' },
                { register: 0, bitString: '0000000000000001' }
            ]);
            throw new Error('Did not throw');
        } catch (e) {
            e.should.have.property(
                'message',
                'An array of configurations should be sorted by register and then by bitString in ascending order'
            );
        }
    });

    it('should return register = 2, bitString = 000000000000100 if it is available', () => {
        const next = FindAHole.findAHole([
            { register: 0, bitString: '0000000000000001' },
            { register: 0, bitString: '0000000000000010' },
            { register: 0, bitString: '0000000000000100' },
            { register: 0, bitString: '0000000000001000' },
            { register: 0, bitString: '0000000000010000' },
            { register: 0, bitString: '0000000000100000' },
            { register: 0, bitString: '0000000001000000' },
            { register: 0, bitString: '0000000010000000' },
            { register: 0, bitString: '0000000100000000' },
            { register: 0, bitString: '0000001000000000' },
            { register: 0, bitString: '0000010000000000' },
            { register: 0, bitString: '0000100000000000' },
            { register: 0, bitString: '0001000000000000' },
            { register: 0, bitString: '0010000000000000' },
            { register: 0, bitString: '0100000000000000' },
            { register: 0, bitString: '1000000000000000' },
            { register: 2, bitString: '0000000000000001' },
            { register: 2, bitString: '0000000000000010' }
        ]);
        const bit = 4;

        next?.should.have.property('register', 2);
        next?.should.have.property('bitString', bit.toString(2).padStart(16, '0'));
    });
});
