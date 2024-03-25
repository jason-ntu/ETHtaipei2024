// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Circloda {
    address public usdcAddress = 0x53eeFF269E293038dD895FFA46bB72c3DADC39CF;
    address public ccmAddress = 0x8b1CB4Bb68e6126c4fD54Aa2DC08705f5d5E5615;
    address public ccrAddress = 0x096F9eF5185E1a05bF18961C5b76C8E97CbC50b0;
    address public owner;
    IERC20 public USDC;
    IERC20 public CCM;
    IERC721 public CCR;
    mapping(address => uint256) public usdc;

    constructor() {
        USDC = IERC20(usdcAddress);
        CCM = IERC20(ccmAddress);
        CCR = IERC721(ccrAddress);
        owner = msg.sender;
    }

    function receiveUSDC(
        address _subscriber,
        uint256 _amount
    ) public payable returns (bool) {
        require(msg.sender == owner, "Only owner can call this function");
        // 检查是否已授权合约进行转账
        require(
            USDC.allowance(_subscriber, address(this)) >=
                _amount,
            "Insufficient allowance"
        );
        // 执行代币转账
        require(
            USDC.transferFrom(
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
            CCM.transfer(_subscriber, _subscriptionFee),
            "Transfer failed"
        );
        usdc[_subscriber] -= _subscriptionFee;
        return true;
    }

    function order(
        address _user,
        uint256 _price,
        uint256 _id
    ) public payable returns (bool) {
        require(msg.sender == owner, "Only owner can call this function");
        // 检查用户余额是否足够
        require(
            CCM.allowance(_user, address(this)) >= _price,
            "Insufficient allowance"
        );
        // 执行代币转账
        require(
            CCM.transferFrom(_user, address(this), _price),
            "Transfer failed"
        );

        // mint a reservation NFT to the user
        CCR.transferFrom(msg.sender, _user, _id);
        return true;
    }
}
