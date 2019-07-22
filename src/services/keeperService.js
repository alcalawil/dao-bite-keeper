const { createRange } = require('./utils/utils');

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
    // const lastCdpId = await this.getLastCdpId();

    // availableCDPs = await this.getAvailableCdps(1, lastCdpId);
  }

  stopKeeper() {
    // unauthenticated
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

  async getAvailableCdps(first = 1, last = 1000) {
    const result = [];
    const range = createRange(first, last);

    await Promise.all(
      range.map(async cdpId => {
        try {
          const cdp = await maker.getCdp(cdpId);
          logger.debug('CDP Object', JSON.stringify(cdp));
          result.push({ cdpId, cdp });
        } catch (err) {
          logger.warn(`CDP ${cdpId} does not exist!`);
        }
      })
    );

    return result;
  }

  async getUnsafeCDPs(cdps) {
    const unsafeCDPs = await Promise.all(
      cdps.filter(async cdp => {
        try {
          return await cdp.cdp.isSafe();
        } catch {
          logger.debug(`CDP #${cdp.cdpId} is not available`);
          // TODO: drop it from the cdp list
          return false; // no unsafe
        }
      })
    );

    return unsafeCDPs;
  }
}

module.exports = (daiModule, config) => {
  return new BiteKeeperService(daiModule, config);
};
