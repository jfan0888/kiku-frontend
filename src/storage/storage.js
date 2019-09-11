import oConfig from '../config';

class Storage {
    constructor(sName = '') {
        this.sName = sName ? sName : oConfig.getParam('storage');
        this.oData = typeof localStorage[this.sName] !== 'undefined' ? JSON.parse(localStorage.getItem(this.sName)) : {};
    }
    getData(sObject = '', sKey = '') {
        if (sObject && this.oData[sObject]) {
            if (sKey && this.oData[sObject][sKey])
                return this.oData[sObject][sKey];
            else
                return this.oData[sObject];
        }

        return undefined;
    }
    getDataObject(sObject) {
        if (sObject && this.oData[sObject])
            return this.oData[sObject];

        return undefined;
    }
    setData(sName, mixedValue) {
        if (sName && mixedValue) {
            this.oData[sName] = mixedValue;
            this.saveData();
        }

        return this;
    }
    saveData() {
        if (localStorage)
            localStorage.setItem(this.sName, JSON.stringify(this.oData));
    }
};

const oStorage = new Storage();
export default oStorage;