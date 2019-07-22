const { createRange, logger } = require('../utils/util');
const blockEventsMock = require('../utils/blockEventsMock');
class BiteKeeperService {
  constructor(Maker, config) {
    this.config = config;
    this.Maker = Maker;
    this.maker;
    this.running = false;
  }

  async startKeeper() {
    if (this.running) return;

    this.maker = await this.Maker.create(this.config.networkType, {
      privateKey: this.config.privateKey,
      url: this.config.url
    });

    await this.maker.authenticate();
    this.running = true;
    blockEventsMock.subscribe(() => {
      this._startBiteProcess();
    });

    return this.running;
  }

  async _startBiteProcess() {
    const lastCdpId = await this.getLastCdpId();
    /*
      lastCdpId is greater than 6000, so it generates a memory leak. 
      Because of that I'm using 
      TODO: Find a way to avoid memory leak, 
      maybe biting one by one instead of biting many
    */
    const unsafeCDPs = await this.getUnsafeCDPs(1, 100);
    await this.biteMany(unsafeCDPs);
  }

  stopKeeper() {
    if (!this.running) return;
    const web3Service = this.maker.service('web3');
    web3Service.disconnect();
    this.running = false;
    blockEventsMock.unsubscribe();
    return this.running;
  }

  async getLastCdpId(forceAuthentication = false) {
    if (forceAuthentication) {
      await this.maker.authenticate();
    }

    const tubContract = await this.maker
      .service('smartContract')
      .getContractByName('SAI_TUB');

    const cupi = await tubContract.wrappedContract.cupi();
    return cupi.toNumber();
  }

  async getUnsafeCDPs(first = 1, last = 100) {
    const unsafeCdps = [];
    const range = createRange(first, last);

    await Promise.all(
      range.map(async cdpId => {
        try {
          const cdp = await this.maker.getCdp(cdpId);
          const isSafe = await cdp.isSafe();
          if (!isSafe) {
            logger.debug(`CDP: #cdpId# is unsafe :)`);
            unsafeCdps.push({ cdpId, cdp });
          }
        } catch (err) {
          logger.debug(`CDP ${cdpId} does not exist or is not available!`);
        }
      })
    );

    return unsafeCdps;
  }

  async biteOne({ cdpId, cdp }) {
    if (!this.running) {
      return;
    }

    try {
      const txMgr = this.maker.service('transactionManager');
      const bitePromise = cdp.bite();
  
      txMgr.listen(bitePromise, {
        pending: tx => {
          logger.debug(`CDP #${cdpId}# is pending`);
        },
        mined: tx => {
          logger.debug(`CDP #${cdpId}# was mined`);
        },
        confirmed: tx => {
          logger.debug(`CDP #${cdpId}# was confirmed`);      
        },
        error: tx => {
          logger.debug(`CDP #${cdpId}# failed`);
        }
      });
  
      await txMgr.confirm(bitePromise); // 5 blocks confirmations
    } catch (err) {
      logger.warn(`biteOne fail: CDP: #${cdpId}# - ${err.message}`);
    }
  }

  async biteMany(unsafeCdps) {
    if (unsafeCdps.length < 1) {
      logger.info("No CDPs to bite!");
      return;
    }

    unsafeCdps.map(({ cdpId, cdp }) => {
      this.biteOne({ cdpId, cdp });
    });
  }

  async getStatus() {
    const lastCdp = await this.getLastCdpId();
    return { lastCdp, running: this.running };
  }
}

module.exports = (daiModule, config) => {
  return new BiteKeeperService(daiModule, config);
};
