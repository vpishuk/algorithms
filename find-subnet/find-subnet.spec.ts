import * as FindSubnet from './find-subnet';
import * as chai from 'chai';
import { Subnet } from './subnet';
import { expect } from 'chai';

chai.should();

describe('FindSubnet', () => {
    it('should find subnet within /8 cidr for mask 255.255.255.0 and no occupied networks', () => {
        const foundSubnet = FindSubnet.findFreeSubnet('255.255.255.0', [], [new Subnet('10.10.0.1', '255.0.0.0')]);
        expect(foundSubnet?.cidr).to.equal(24);
        expect(foundSubnet?.ip).to.equal('10.0.0.0');
    });

    it('should find subnet within /8 cidr for mask 255.255.255.0 and one occupied networks', () => {
        const foundSubnet = FindSubnet.findFreeSubnet(
            '255.255.255.0',
            [new Subnet('10.0.0.1', '255.255.255.0')],
            [new Subnet('10.10.0.1', '255.0.0.0')]
        );
        expect(foundSubnet?.cidr).to.equal(24);
        expect(foundSubnet?.ip).to.equal('10.0.1.0');
    });

    it("should find subnet within /8 and /20 cidr's for mask 255.255.255.192 and one occupied network", () => {
        const foundSubnet = FindSubnet.findFreeSubnet(
            '255.255.255.192',
            [new Subnet('10.0.0.1', '255.255.255.0')],
            [new Subnet('10.10.0.1', '255.0.0.0'), new Subnet('9.10.0.1', '255.255.255.0')]
        );
        expect(foundSubnet?.cidr).to.equal(26);
        expect(foundSubnet?.ip).to.equal('9.10.0.0');
    });

    it('should find subnet when target subnet mask is wider then occupied', () => {
        const foundSubnet = FindSubnet.findFreeSubnet(
            '255.255.255.0',
            [new Subnet('9.0.0.1', '255.255.255.255')],
            [new Subnet('10.10.0.1', '255.0.0.0'), new Subnet('9.0.0.0', '255.255.255.0')]
        );
        expect(foundSubnet?.cidr).to.equal(24);
        expect(foundSubnet?.ip).to.equal('10.0.0.0');
    });

    it("should find subnet within /8 and /20 cidr's for mask 255.255.255.192 and some occupied networks", () => {
        const foundSubnet = FindSubnet.findFreeSubnet(
            '255.255.255.0',
            [new Subnet('9.0.0.1', '255.255.255.255'), new Subnet('10.10.0.1', '255.255.255.255')],
            [new Subnet('10.10.0.1', '255.255.0.0'), new Subnet('9.0.0.0', '255.255.255.0')]
        );
        expect(foundSubnet?.cidr).to.equal(24);
        expect(foundSubnet?.ip).to.equal('10.10.1.0');
    });

    it('should return null if cannot find free subnet', () => {
        const foundSubnet = FindSubnet.findFreeSubnet(
            '255.255.255.0',
            [new Subnet('9.0.0.1', '255.0.0.0'), new Subnet('10.10.0.1', '255.0.0.0')],
            [new Subnet('10.10.0.1', '255.255.0.0'), new Subnet('9.0.0.0', '255.255.255.0')]
        );
        expect(foundSubnet).to.equal(null);
    });

    it('should return null if boundaries are empty', () => {
        const foundSubnet = FindSubnet.findFreeSubnet(
            '255.255.255.0',
            [new Subnet('9.0.0.1', '255.0.0.0'), new Subnet('10.10.0.1', '255.0.0.0')],
            []
        );
        expect(foundSubnet).to.equal(null);
    });

    it('should return null if cannot find subnet and there are less amount of boundaries then occupied networks', () => {
        const foundSubnet = FindSubnet.findFreeSubnet(
            '255.255.255.0',
            [new Subnet('9.0.0.1', '255.0.0.0'), new Subnet('10.10.0.1', '255.0.0.0')],
            [new Subnet('9.0.0.1', '255.0.0.0')]
        );
        expect(foundSubnet).to.equal(null);
    });
});
