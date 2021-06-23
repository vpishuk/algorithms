import { Subnet } from './subnet';
import * as Utils from './utils';

/**
 * Will return null if there is no available spots
 */
export function findFreeSubnet(mask: string, occupiedNetworks: Subnet[], boundaries: Subnet[]): Subnet | null {
    const maskAsNumber = Utils.ipToNumber(mask);

    if (boundaries.length <= 0) {
        return null;
    }

    // ensure that networks we receive and boundaries are sorted
    occupiedNetworks.sort((left, right) => (left.lowIp < right.lowIp ? 1 : left.lowIp > right.lowIp ? -1 : 0));
    boundaries.sort((left, right) => (left.lowIp < right.lowIp ? 1 : left.lowIp > right.lowIp ? -1 : 0));

    // sets the initial ip to the minimum possible ip
    let currentIp = boundaries[0].lowIpAsNumber;
    let currentBoundaryIdx = 0;

    for (let network of occupiedNetworks) {
        if (maskAsNumber < network.maskAsNumber) {
            network = new Subnet(network.ip, maskAsNumber);
        }
        // we found what we need
        if (currentIp < network.lowIpAsNumber) {
            break;
        }

        // if belongs to occupied network, take the next ip after this one
        if (currentIp < network.highIpAsNumber) {
            currentIp = network.highIpAsNumber + 1;
        }

        // it makes no sense to continue, because we are out of range...
        if (boundaries[boundaries.length - 1].highIpAsNumber < currentIp) {
            return null;
        }

        // make sure that we are in the right boundary and switch to the next boundary if needed
        for (; currentBoundaryIdx < boundaries.length; currentBoundaryIdx++) {
            const boundary = boundaries[currentBoundaryIdx];
            if (boundary.lowIpAsNumber > currentIp) {
                currentIp = boundary.lowIpAsNumber;
            }

            if (boundary.highIpAsNumber > currentIp) {
                break;
            }
        }
    }

    if (boundaries.some(boundary => boundary.highIpAsNumber >= currentIp && boundary.lowIpAsNumber <= currentIp)) {
        return new Subnet(currentIp, mask);
    }
    return null;
}
