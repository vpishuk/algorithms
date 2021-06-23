export function ipToNumber(ip: string): number {
    const parts = ip.split('.');
    return parts.reverse().reduce((acc, part, idx) => acc + parseInt(part, 10) * 256 ** idx, 0);
}

export function formatIp(ipAsNumber: number): string {
    const parts = [];
    for (let i = 3; i >= 0; i--) {
        const divider = 256 ** i;
        const divided = ipAsNumber - (ipAsNumber % divider);
        parts[3 - i] = divided / divider;
        ipAsNumber = ipAsNumber - divided;
    }
    return parts.join('.');
}

export function lowIp(ip: string | number, mask: string | number): number {
    const maskAsNumber = Number.isInteger(mask) ? (mask as number) : ipToNumber(mask as string);
    const ipAsNumber = Number.isInteger(ip) ? (ip as number) : ipToNumber(ip as string);
    // we need to convert to unsigned int, because javascript reserves the first bit for a sign
    return (ipAsNumber & maskAsNumber) >>> 0;
}

export function highIp(ip: string | number, mask: string | number): number {
    const maskAsNumber = Number.isInteger(mask) ? (mask as number) : ipToNumber(mask as string);
    const ipAsNumber = Number.isInteger(ip) ? (ip as number) : ipToNumber(ip as string);
    // we need to convert to unsigned int, because javascript reserves the first bit for a sign
    return (ipAsNumber | ~maskAsNumber) >>> 0;
}

export function convertMaskToCIDR(mask: string | number): number {
    let maskAsNumber = ~(Number.isInteger(mask) ? (mask as number) : ipToNumber(mask as string));
    let counter = 0;

    if (maskAsNumber < 0) {
        return 0;
    }
    while (maskAsNumber > 0) {
        maskAsNumber = maskAsNumber >> 1;
        counter++;
    }
    return 32 - counter;
}
