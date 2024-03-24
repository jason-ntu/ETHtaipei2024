import { NextResponse ,NextRequest} from 'next/server';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import forge from 'node-forge';
import { v4 as uuidv4 } from 'uuid';

async function getSecret(){
    let key;
    await fetch('https://api.circle.com/v1/w3s/config/entity/publicKey', {
        method: 'GET',
        headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`}
    })
        .then(res => res.json())
        .then(json => {
            key = json.data.publicKey;
        })
        .catch(err => console.error('error:' + err));

    // generate entity secret
    const secret = process.env.CIRCLE_ENTITY_SECRET;
    const entitySecret = forge.util.hexToBytes(secret)
    const publicKey = forge.pki.publicKeyFromPem(key)
    const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha256.create(),
        },
    })
    const entitySecretCipherText = forge.util.encode64(encryptedData);

    return entitySecretCipherText;
}

async function sendUSDC(fromWalletId, toWalletAddress, amount){
    const entitySecretCipherText = await getSecret();

    // make transfer
    let options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.CIRCLE_API_KEY}`
      },
      body: JSON.stringify({
        amounts: [amount],
        idempotencyKey: uuidv4(),
        destinationAddress: toWalletAddress,
        entitySecretCiphertext: entitySecretCipherText,
        feeLevel: 'HIGH',
        tokenId: '7228fecb-a300-571b-a229-617f16700406',
        walletId: fromWalletId,
      })
    };
    
    let transactionId;

    await fetch('https://api.circle.com/v1/w3s/developer/transactions/transfer', options)
      .then(res => res.json())
      .then(json => {
        if (json.data.state != "INITIATED") throw Error("Transaction Error")
        else {
            transactionId = json.data.id;
        }
      })
      .catch(err => console.error('error:' + err));

    //console.log("transactionId: ", transactionId)

    // see transaction info
    const info_options = {
        method: 'GET',
        headers: {
          authorization: `Bearer ${process.env.CIRCLE_API_KEY}`
        }
    };

    await new Promise(r => setTimeout(r, 4000));

    let returnStatus;
    await fetch(`https://api.circle.com/v1/w3s/transactions/${transactionId}`, info_options)
        .then(res => res.json())
        .then(json => {
            console.log(JSON.stringify(json))
            if (json.data.transaction.state !== "Failed") {
                returnStatus = {
                    isSent: true,
                    txHash: json.data.transaction.txHash,
                }
            } else {
                returnStatus = {
                    isSent: false
                }
                return returnStatus;
            }
        })
        .catch(err => console.error('error:' + err));
    
    return returnStatus;
}

async function sendCCM(fromWalletId, toWalletAddress, amount){
    const entitySecretCipherText = await getSecret();

    // make transfer
    let options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.CIRCLE_API_KEY}`
      },
      body: JSON.stringify({
        amounts: [amount],
        idempotencyKey: uuidv4(),
        destinationAddress: toWalletAddress,
        entitySecretCiphertext: entitySecretCipherText,
        feeLevel: 'HIGH',
        tokenId: 'd5123e22-fe4b-5210-8dfd-0ff892da331c',
        walletId: fromWalletId,
      })
    };
    
    let transactionId;

    await fetch('https://api.circle.com/v1/w3s/developer/transactions/transfer', options)
      .then(res => res.json())
      .then(json => {
        if (json.data.state != "INITIATED") throw Error("Transaction Error")
        else {
            transactionId = json.data.id;
        }
      })
      .catch(err => console.error('error:' + err));

    //console.log("transactionId: ", transactionId)

    // see transaction info
    const info_options = {
        method: 'GET',
        headers: {
          authorization: `Bearer ${process.env.CIRCLE_API_KEY}`
        }
    };

    await new Promise(r => setTimeout(r, 4000));

    let returnStatus;
    await fetch(`https://api.circle.com/v1/w3s/transactions/${transactionId}`, info_options)
        .then(res => res.json())
        .then(json => {
            console.log(JSON.stringify(json))
            if (json.data.transaction.state !== "Failed") {
                returnStatus = {
                    isSent: true,
                    txHash: json.data.transaction.txHash,
                }
            } else {
                returnStatus = {
                    isSent: false
                }
                return returnStatus;
            }
        })
        .catch(err => console.error('error:' + err));
    
    return returnStatus;
}

async function getAmount(walletId, tokenAddress){
    const url = `https://api.circle.com/v1/w3s/wallets/${walletId}/balances?tokenAddress=${tokenAddress}`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: 'Bearer TEST_API_KEY:810587426fc5ccbd19f2f39dedd20d3f:926f230b70230f34336543409038bf1e'
    }
    };

    let amount;
    await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            amount = json.data.tokenBalances[0].amount
        })
        .catch(err => console.error('error:' + err));

    return amount;
}

async function getUSDC(walletId){
    const amount = await getAmount(walletId, '0x51344b7fe3cc2e1b4e2d527c790e82c2cda8bdb1');
    return amount;
}

async function getCCM(walletId){
    const amount = await getAmount(walletId, '0x672f3a45ddc148c238575ca7bfa281ead9dadcca');
    return amount;
}

export {
    sendUSDC,
    sendCCM,
    getUSDC,
    getCCM,
}