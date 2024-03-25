# ETH Taipei 2024 - Circoda
### TL; DR
We utilized Circle's programmable wallet to implement an on-chain reservation platform based on subscription service. As for chains Circle hasn't support yet, we adjust smart contract to achieve the goal.

- [Demo video link](https://youtu.be/Zxt9uZR2Xqs) 
- [TAIKAI link](https://taikai.network/ethtaipei/hackathons/hackathon-2024/projects/clu4jbahm0k3ny501hlji3yo1/idea)

## Problem Solved
1. It's **hard to implement subscription service on blockchain** basically due to the push-based nature of blockchain transactions.
   - [On-chain subscriptions don’t work](https://gaurangtorvekar.medium.com/on-chain-subscriptions-dont-work-2b7547f27e9d)
   - [Opt-in or Opt-out?](https://medium.com/swlh/opt-in-or-opt-out-7db2a247e72f)
2. Existing online travel agent like Agoda (most commonly used platform in Taiwan) and Travala (paltform with crypto payment) have a pain point that the **booking price fluctuations**.

### Why subscription service avoid fluctuating prices?
Jarpanese company KabuK Style Inc. has an online reservation platform [HafH](https://www.hafh.com/en) based on subscription service. The basic idea is to let subscribers pay monthly fee to get HafH token and use it to pay for the reservation (currently 49.99 USD for 200 token / per month). HafH stabilizes room prices by predicting reasonable market prices through its internal algorithm and directly signing contracts with accommodation providers. Although we don't know about the algorithm, subscription service indeed provide a fixed lower price and create customer loyalty while providing predictable revenue streams for the company.

## Abstactions
During the hackathon, we utilized Circle's Dev Controlled Wallets to implement a subscription service and develop a MVP product for the reservation service. There are 3 basic use case about Circoda
### 1. New user registeration
![Circoda - New user register](https://github.com/jason-ntu/ETHtaipei2024/assets/125814787/d7626558-c433-4994-8f4d-1638a4f07b9f)

### 2. User subscribe for service
![Circoda - User subscribe   auto deduct](https://github.com/jason-ntu/ETHtaipei2024/assets/125814787/c1b0642a-756a-4b31-8ac7-7c546684abbe)

### 3. User book for hotel
![Circoda - User place order](https://github.com/jason-ntu/ETHtaipei2024/assets/125814787/18279885-1c74-4fc4-bde4-c2c91b2683c4)

There's also functions like ubsbscribe and cancel order haven't been implemented during hackathon, but the concept is 
### Unsubscribe
![Circoda - User unsubscribe](https://github.com/jason-ntu/ETHtaipei2024/assets/125814787/fe90c98b-7049-4783-a521-0f6a5dd96f92)

### Cancel order
![Circoda - User cancel order](https://github.com/jason-ntu/ETHtaipei2024/assets/125814787/dcce52e3-f086-424a-810f-9e9b0f9ce95d)


## Contract Links
[ERC20 token (CCM, Circoda mini) (Sepolia)](https://goerli.lineascan.build/address/0x8b1CB4Bb68e6126c4fD54Aa2DC08705f5d5E5615CCR)

[NFT (Proof of Reservation) (Sepolia)](https://goerli.lineascan.build/address/0x096F9eF5185E1a05bF18961C5b76C8E97CbC50b0Circoda)

[Contract (Linea)](https://goerli.lineascan.build/address/0x7B1632265E71bf78a8e7727EB9F93a345C457D49)
