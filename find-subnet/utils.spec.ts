import * as Utils from './utils';
import * as chai from 'chai';

chai.should();

describe('utils', () => {
    describe('ip to number', () => {
        it('should return number from ip', () => {
            const ipAsNumber = Utils.ipToNumber('1.1.1.1');
            chai.expect(ipAsNumber).to.equal(256 ** 3 + 256 ** 2 + 256 ** 1 + 256 ** 0);
        });
    });

    describe('number to ip', () => {
        it('should return ip 1.1.1.1', () => {
            const ipAsNumber = Utils.formatIp(256 ** 3 + 256 ** 2 + 256 ** 1 + 256 ** 0);
            chai.expect(ipAsNumber).to.equal('1.1.1.1');
        });

        it('should return ip 0.0.0.0', () => {
            const ipAsNumber = Utils.formatIp(0);
            chai.expect(ipAsNumber).to.equal('0.0.0.0');
        });

        it('should return ip 255.255.255.255', () => {
            const ipAsNumber = Utils.formatIp(255 * 256 ** 3 + 255 * 256 ** 2 + 255 * 256 ** 1 + 255 * 256 ** 0);
            chai.expect(ipAsNumber).to.equal('255.255.255.255');
        });
    });

    describe('convertMaskToCIDR', () => {
        it('should convert 255.255.255.255', () => {
            const masks = [
                '0.0.0.0',
                '128.0.0.0',
                '192.0.0.0',
                '224.0.0.0',
                '240.0.0.0',
                '248.0.0.0',
                '252.0.0.0',
                '254.0.0.0',
                '255.0.0.0',
                '255.128.0.0',
                '255.192.0.0',
                '255.224.0.0',
                '255.240.0.0',
                '255.248.0.0',
                '255.252.0.0',
                '255.254.0.0',
                '255.255.0.0',
                '255.255.128.0',
                '255.255.192.0',
                '255.255.224.0',
                '255.255.240.0',
                '255.255.248.0',
                '255.255.252.0',
                '255.255.254.0',
                '255.255.255.0',
                '255.255.255.128',
                '255.255.255.192',
                '255.255.255.224',
                '255.255.255.240',
                '255.255.255.248',
                '255.255.255.252',
                '255.255.255.254',
                '255.255.255.255'
            ];
            for (let i = 0; i < masks.length; i++) {
                const result = Utils.convertMaskToCIDR(masks[i]);
                chai.expect(result).to.equal(i);
            }
        });
    });

    describe('low ip', () => {
        it('should return low ip in subnet for CIDR /24', () => {
            const lowIp = Utils.lowIp('1.1.1.1', '255.255.255.0');
            chai.expect(lowIp).to.equal(Utils.ipToNumber('1.1.1.0'));
        });

        it('should return low ip in subnet for CIDR /8', () => {
            const lowIp = Utils.lowIp('192.168.1.1', '255.0.0.0');
            chai.expect(lowIp).to.equal(Utils.ipToNumber('192.0.0.0'));
        });

        it('should return low ip in subnet for CIDR /1', () => {
            const lowIp = Utils.lowIp('192.168.1.1', '128.0.0.0');
            chai.expect(lowIp).to.equal(Utils.ipToNumber('128.0.0.0'));
        });

        it('should return low ip in subnet for CIDR /32', () => {
            const lowIp = Utils.lowIp('192.168.1.1', '255.255.255.255');
            chai.expect(lowIp).to.equal(Utils.ipToNumber('192.168.1.1'));
        });
    });

    describe('high ip', () => {
        it('should return high ip in subnet for CIDR /24', () => {
            const highIp = Utils.highIp('1.1.1.1', '255.255.255.0');
            chai.expect(highIp).to.equal(Utils.ipToNumber('1.1.1.255'));
        });

        it('should return high ip in subnet for CIDR /8', () => {
            const highIp = Utils.highIp('192.168.1.1', '255.0.0.0');
            chai.expect(highIp).to.equal(Utils.ipToNumber('192.255.255.255'));
        });

        it('should return high ip in subnet for CIDR /1', () => {
            const highIp = Utils.highIp('192.168.1.1', '128.0.0.0');
            chai.expect(highIp).to.equal(Utils.ipToNumber('255.255.255.255'));
        });

        it('should return high ip in subnet for CIDR /1', () => {
            const highIp = Utils.highIp('1.168.1.1', '128.0.0.0');
            chai.expect(highIp).to.equal(Utils.ipToNumber('127.255.255.255'));
        });

        it('should return high ip in subnet for CIDR /32', () => {
            const highIp = Utils.highIp('192.168.1.1', '255.255.255.255');
            chai.expect(highIp).to.equal(Utils.ipToNumber('192.168.1.1'));
        });
    });
});
