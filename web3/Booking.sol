// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

interface IERC20 {
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
    address public owner;
    mapping(address => uint256) public usdc;

    constructor() {
        usdcAddress = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
        owner = msg.sender;
    }

    function receiveUSDC(
        address _sender,
        uint256 _amount
    ) internal returns (bool) {
        require(msg.sender == owner, "Only owner can call this function");
        // 检查是否已授权合约进行转账
        require(
            IERC20(usdcAddress).allowance(_sender, address(this)) >= _amount,
            "Insufficient allowance"
        );
        // 执行代币转账
        require(
            IERC20(usdcAddress).transferFrom(_sender, address(this), _amount),
            "Transfer failed"
        );
        return true;
    }

    function subscribe(uint256 _amount) public payable {
        // 判斷目前餘額有沒有超過門檻
        require(usdc[msg.sender] + _amount >= 50, "Insufficient amount");
        // 接收轉帳
        require(receiveUSDC(msg.sender, _amount));
        // 幫用戶增加代幣餘額
        usdc[msg.sender] += _amount;
    }

    // 當前端呼叫合約下單的時候，會呼叫這個函數，這時候我們假設系統已經確認過訂房金額了
    function order(uint256 _amount) public {
        // 檢查用戶餘額是否足夠
        require(usdc[msg.sender] >= _amount, "Insufficient balance");
        // 扣除用戶餘額
        usdc[msg.sender] -= _amount;
        // mint a reservation NFT to the user
    }

    function sellOrder(address _reservation) public {
        // 檢查用戶是否擁有這個 NFT
        // 檢查用戶是否已經授權合約轉移這個 NFT
        // 轉移 NFT 給合約
        // 轉移 USDC 給用戶
    }

    function cancelOrder(address _reservation) public {
        // 檢查用戶是否擁有這個 NFT
        // 檢查用戶是否已經授權合約轉移這個 NFT
        // 轉移 NFT 給合約
        // 轉移 USDC 給用戶
    }
}
