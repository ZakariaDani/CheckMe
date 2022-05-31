// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract ProductChain {

  uint amount = 10000;

	function getAmount() public view returns(uint) {
		return amount;
	}
}
