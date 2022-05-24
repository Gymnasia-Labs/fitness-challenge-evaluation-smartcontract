# GYM Wallet

This project is an ethereum based smart contract.
While athletes like to compete against each other, there is currently no way how to evaluate who won unbiased and without human error margin.

That's where our smart contract comes into play.
We want to provide a fully trustable evaluation method for all kind of sport challenges.

## What's possible right now?

We are able to evaluate all challenges that are time-distance based. (Who was the fastest over a specific amount of time)

## How to setup

#### Install Packages

Install necessary packages over npm:

`npm i`

Install truffle to compile solidity:

`npm i -g truffle`

#### Solidity

Compile smart contracts:

`truffle compile`

Migrate to testnet:

`truffle migrate --network auroraTestnet --reset`

or

`truffle migrate --network rinkeby --reset`
