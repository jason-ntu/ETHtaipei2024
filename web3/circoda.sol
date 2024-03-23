// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "./CCR.sol";

interface IERC20 {
    function transfer(address to, uint256 tokens) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);
}

contract Circloda {
    address public usdcAddress;
    address public ccmAddress;
    address public ccrAddress;
    address public owner;
    mapping(address => uint256) public usdc;

    constructor() {
        usdcAddress = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
        ccmAddress = 0x1234567890123456789012345678901234567890;
        ccrAddress = 0x1234567890123456789012345678901234567890;
        owner = msg.sender;
    }

    function receiveUSDC(
        address _subscriber,
        uint256 _amount
    ) public payable returns (bool) {
        require(msg.sender == owner, "Only owner can call this function");
        // 检查是否已授权合约进行转账
        require(
            IERC20(usdcAddress).allowance(_subscriber, address(this)) >=
                _amount,
            "Insufficient allowance"
        );
        // 执行代币转账
        require(
            IERC20(usdcAddress).transferFrom(
                _subscriber,
                address(this),
                _amount
            ),
            "Transfer failed"
        );
        usdc[_subscriber] += _amount;
        return true;
    }

    function deductUSDC(
        address _subscriber,
        uint256 _subscriptionFee
    ) public payable returns (bool) {
        require(msg.sender == owner, "Only owner can call this function");
        require(usdc[_subscriber] >= _subscriptionFee, "Insufficient balance");
        // 执行代币转账
        require(
            IERC20(ccmAddress).transfer(_subscriber, _subscriptionFee),
            "Transfer failed"
        );
        usdc[_subscriber] -= _subscriptionFee;
        return true;
    }

    function order(
        address _user,
        uint256 _price
    ) public payable returns (bool) {
        require(msg.sender == owner, "Only owner can call this function");
        // 检查用户余额是否足够
        require(
            IERC20(ccmAddress).allowance(_user, address(this)) >= _price,
            "Insufficient allowance"
        );
        // 执行代币转账
        require(
            IERC20(ccmAddress).transferFrom(_user, address(this), _price),
            "Transfer failed"
        );

        // mint a reservation NFT to the user
        CCR(ccrAddress).mint(_user, 1);
        return true;
    }
}
