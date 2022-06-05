// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Product {
    uint public max_products = 1000000;

    function products() external view returns (uint) {
        return max_products;
    }
}