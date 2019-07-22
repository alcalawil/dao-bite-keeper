class BiteKeeperService {
  getStatus() {
    return 'running';
  }

  async startKeeper() {
    return 'started';
  }

  async stopKeeper() {
    return 'stopped';
  }
}

module.exports = new BiteKeeperService();
