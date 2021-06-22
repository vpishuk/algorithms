interface Configurations {
    register: number;
    bitString: string;
}

/**
 * Will return null if there is no available spots
 * Will throw an error if the array of configurations is not sorted
 *
 * NOTE: An array of configurations should be sorted by register and then by bitString in ascending order
 */
export function findAHole(configurations: Configurations[], bitStringLength = 16): Configurations | null {
    if (configurations.length <= 0) {
        return null;
    }

    const maxBitStringValue = 2 ** (bitStringLength - 1);

    let register = configurations?.[0]?.register ?? 0;
    const maxRegister = configurations?.[configurations.length - 1]?.register ?? 0;

    let currentBitString = 1;

    for (let i = 0; i < configurations.length; i++) {
        if (register < configurations[i].register) {
            if (currentBitString < maxBitStringValue) {
                break;
            }
            currentBitString = 1;
        }

        register = configurations[i].register;

        const integer = parseInt(configurations[i].bitString, 2);

        if (i < configurations.length - 1) {
            if (configurations[i + 1].register < configurations[i].register) {
                throw new Error(
                    `An array of configurations should be sorted by register and then by bitString in ascending order`
                );
            }

            if (configurations[i + 1].register === configurations[i].register) {
                if (integer > parseInt(configurations[i + 1].bitString, 2)) {
                    throw new Error(
                        `An array of configurations should be sorted by register and then by bitString in ascending order`
                    );
                }
            }
        }

        // taking into consideration that array is sorted
        // if bitString is less then current bitString then we have a free spot
        // if bitString is bigger then current bitString, then we need to check the next value
        if (currentBitString < integer) {
            break;
        }

        // if the spot is occupied then apply left shift
        if (integer === currentBitString) {
            currentBitString = currentBitString << 1;
        }

        // if we definitely know that there is no free spot, return null
        if (currentBitString > maxBitStringValue && register === maxRegister) {
            return null;
        }
    }

    return { register, bitString: currentBitString.toString(2).padStart(bitStringLength, '0') };
}
