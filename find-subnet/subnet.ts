import * as Utils from './utils';

export class Subnet {
    public readonly ip: string;
    public readonly mask: string;
    public readonly cidr: number;
    public readonly ipAsNumber: number;
    public readonly maskAsNumber: number;
    public readonly lowIpAsNumber: number;
    public readonly lowIp: string;
    public readonly highIpAsNumber: number;
    public readonly highIp: string;

    constructor(ip: string | number, mask: string | number) {
        if (Number.isInteger(mask)) {
            this.maskAsNumber = mask as number;
            this.mask = Utils.formatIp(mask as number);
        } else {
            this.maskAsNumber = Utils.ipToNumber(mask as string);
            this.mask = mask as string;
        }
        if (Number.isInteger(ip)) {
            this.ipAsNumber = ip as number;
            this.ip = Utils.formatIp(ip as number);
        } else {
            this.ipAsNumber = Utils.ipToNumber(ip as string);
            this.ip = ip as string;
        }

        this.lowIpAsNumber = Utils.lowIp(this.ip, this.mask);
        this.lowIp = Utils.formatIp(this.lowIpAsNumber);

        this.highIpAsNumber = Utils.highIp(this.ip, this.mask);
        this.highIp = Utils.formatIp(this.highIpAsNumber);

        this.cidr = Utils.convertMaskToCIDR(this.maskAsNumber);
    }

    public toString(): string {
        return `${this.ip}/${this.cidr}`;
    }
}
