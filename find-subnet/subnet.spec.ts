import { Subnet } from './subnet';
import * as chai from 'chai';

chai.should();

describe('Subnet', () => {
    it('should generate default properties', () => {
        const subnet = new Subnet('1.1.1.1', '255.255.255.0');
        chai.expect(subnet.ip).to.equal('1.1.1.1');
        chai.expect(subnet.ipAsNumber).to.equal(256 ** 3 + 256 ** 2 + 256 ** 1 + 256 ** 0);

        chai.expect(subnet.mask).to.equal('255.255.255.0');
        chai.expect(subnet.maskAsNumber).to.equal(255 * 256 ** 3 + 255 * 256 ** 2 + 255 * 256 ** 1 + 0 * 256 ** 0);

        chai.expect(subnet.lowIp).to.equal('1.1.1.0');
        chai.expect(subnet.lowIpAsNumber).to.equal(256 ** 3 + 256 ** 2 + 256 ** 1 + 0 * 256 ** 0);

        chai.expect(subnet.highIp).to.equal('1.1.1.255');
        chai.expect(subnet.highIpAsNumber).to.equal(256 ** 3 + 256 ** 2 + 256 ** 1 + 255 * 256 ** 0);

        chai.expect(subnet.cidr).to.equal(24);
    });

    it('should convert to formatted string', () => {
        const subnet = new Subnet('1.1.1.1', '255.255.255.0');
        chai.expect(subnet.toString()).to.equal('1.1.1.1/24');
    });
});
