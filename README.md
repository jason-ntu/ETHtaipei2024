# ETH Taipei 2024 - Circoda
### TL; DR
We utilized Circle's programmable wallet to implement an on-chain reservation platform based on subscription service. As for chains Circle hasn't support yet, we adjust smart contract to achieve the goal.

- [Demo video link]() 
- [TAIKAI link]()

## Install & Run


## Problem Solved
1. It's **hard to implement subscription service on blockchain** basically due to the push-based nature of blockchain transactions.
   - [On-chain subscriptions don’t work](https://gaurangtorvekar.medium.com/on-chain-subscriptions-dont-work-2b7547f27e9d)
   - [Opt-in or Opt-out?](https://medium.com/swlh/opt-in-or-opt-out-7db2a247e72f)
2. Existing online travel agent like Agoda (most commonly used platform in Taiwan) and Travala (paltform with crypto payment) have a pain point that the **booking price fluctuations**.

### Why subscription service avoid fluctuating prices?

Jarpanese company KabuK Style Inc. issue an online reservation service [HafH](https://www.hafh.com/en) based on subscription service. The basic idea is to let subscribers pay monthly fee to get HafH token and use it to pay for the reservation (currently 49.99 USD for 200 token). HafH stabilizes room prices by predicting reasonable market prices through its internal algorithm and directly signing contracts with accommodation providers. Although we don't know about the algorithm, but it indeed provide lower then average fix price.

## Abstactions
During the hackathon, we utilized Circle's Dev Controlled Wallets to implement a subscription service and develop a MVP product for the reservation service.

## Contract Links
