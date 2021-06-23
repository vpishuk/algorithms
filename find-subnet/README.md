# Find a hole

## The problem

There are a bunch of networks configured on some device. We need to suggest user a network ip address with requested mask.

## Examples

**_Example 1:_**

```
const occupiedNetworks = [
  new Subnet('10.0.0.1', '255.255.255.0')
];
const boundaries = [
  new Subnet('10.0.0.0', '255.0.0.0')
];
const mask = '255.255.255.0';

findFreeSubnet(mask, occupiedNetworks, boundaries) // => '10.0.1.0'
```

## Implementation notes

There are a few pieces inside: sorting, iteration over occupied networks and check that a subnet we got is still a valid subnet.
Sorting has `O(n log n)` time-complexity. Other parts of an algorithm has `O(n)` time-complexity. So the algorithm has overall `O(n log n)` time-complexity where n is max from `occupiedNetworks.length` and `boundaries.length`.
Space-complexity is `O(1)`.
