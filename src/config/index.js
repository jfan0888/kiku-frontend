import oData from './config';

/**
 * class to work with config's constants
 */

class oConfig {
    constructor(oData) {
        this.config = oData || {};
    }
    getParam(sName) {
        return this.config && typeof this.config[sName] !== 'undefined' ? this.config[sName] : undefined;
    }
}

export default new oConfig(oData);
