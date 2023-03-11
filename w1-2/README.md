## 第1周 作业2

### Contract Address
0xE95515Db0D5E9a363982C28A93Eb5F1457b79e55

### Initial Project
```bash
npm init
npm install -D hardhat
npx hardhat
```

### Test
```bash
npx hardhat test
```

### Deploy to localhost
```bash
npx hardhat node # start an network on localhost
npx hardhat run scripts/deploy.js --network localhost
```

### Deploy to testnet
```bash
npx hardhat run scripts/deploy.js --network goerli
```

### Verify to testnet
```bash
npx hardhat verify --network goerli
```