**Pre-Requisites**
1. [NodeJS](https://nodejs.org/)
2. [NestJS](https://nestjs.com/)
3. [GanacheCLI](https://github.com/trufflesuite/ganache-cli)
4. [Truffle](https://github.com/trufflesuite/truffle)

**Installation**
1. Install Truffle, Ganache CLI and NestJS globally. If you prefer, the graphical version of Ganache works as well!
```
npm install -g truffle
npm install -g ganache-cli
npm install -g @nestjs/cli
```
2. Run the ganache-cli.
```
ganache-cli
```

4. Now these contracts need to be compiled and deployed on the Blockchain. For this, run `truffle migrate` inside project root directory. 
5. You can see that a new `/build` folder has been created in the root directory which contains the compiled contracts.
6. Create `.env` file in root directory and pass to `PRODUCT_ADDRESS` address of created contract from blockchain network. (You have `.env.template` as a sample)
7. To run the Node server `npm start`.
8. Server will be available on `http://${APP_HOST}:${APP_PORT}/`.
