// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Product {
    uint public max_products = 1000000;

    function products() external view returns (uint) {
        return max_products;
    }
    
    ProductItem[] public productItems;

    struct ProductItem{
        address creator;
        string productName;
        uint256 productId;
        string date;
    }
    
    
    
    function addProductItem(string memory _text, string memory _date, uint256 _id) public returns (bool) {
        ProductItem memory newItem = ProductItem({creator: msg.sender, productName: _text, productId: _id, date: _date});
        productItems.push(newItem);
        return true;
    }

    function getProductItems() view public returns (uint256[] memory, string[] memory) {
        uint length = productItems.length;

        uint256[] memory ids = new uint256[](length);
        string[] memory productNames = new string[](length);

        for (uint i = 0; i < length; i++) {
            ids[i] = productItems[i].productId;
            productNames[i] = productItems[i].productName;
        }

        return (ids, productNames);
    }

     function concat(string memory _a, string memory _b) public pure returns (string memory){
        bytes memory bytes_a = bytes(_a);
        bytes memory bytes_b = bytes(_b);
        string memory length_ab = new string(bytes_a.length + bytes_b.length);
        bytes memory bytes_c = bytes(length_ab);
        uint k = 0;
        for (uint i = 0; i < bytes_a.length; i++) bytes_c[k++] = bytes_a[i];
        for (uint i = 0; i < bytes_b.length; i++) bytes_c[k++] = bytes_b[i];
        return string(bytes_c);
    }
     
     function searchProduct(uint _productId)  public view returns (string memory) {
        string memory output = "";
        bool found = false;
        for (uint i = 0; i < productItems.length; i++){
            if (productItems[i].productId == _productId){
                        output=concat(output, productItems[i].productName);
                        found = true;
            }
        }
        if(!found){
            output = "fake";
        }
        return output;
    }
    
    function deleteProductItem(uint index) public returns (bool success) {
        if (index >= productItems.length) return false;

        for (uint i = index; i < productItems.length - 1; i++){
            productItems[i] = productItems[i+1];
        }

        delete productItems[productItems.length - 1];
        return true;
    }
    
}