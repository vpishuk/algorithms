# Find a hole

## The task
The configurations are represented as an array of objects.
Each object has a property `register` from 0 to N and a property `bitString`.
`bitString` is a binary representation of a number with leading zeroes such as `000010`.
All `bitString`'s have the same length equal to `bitStringLength` from 1 to M.
The goal is to write an algorithm which verifies that every register in a list has `bitString`s where only one bit is set to 1.
The function should return the minimum suitable pair, if there is such configuration.

## Examples
***Example 1:***
```
const = onfigurations = [
  {register: 1, bitString: '01'}
];
const bitStringLength = 2;

findAHole(configurations, bitStringLength) // => {register: 1, bitString: '10'}
```

***Example 2:***
```
const = onfigurations = [
  {register: 0, bitString: '11'}
  {register: 1, bitString: '01'}
];
const bitStringLength = 2;

findAHole(configurations, bitStringLength) // => {register: 0, bitString: '01'}
```

## Implementation notes
Time-complexity in the worst case is `O(N*M)` because it might be necessary to iterate over all N registers and all M possible `bitString`s for each register.
Space-complexity is `O(1)`.
