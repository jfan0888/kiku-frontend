import oConfig from "../config";

export const getServiceLink = (sService) => {
    return `${oConfig.getParam('service')}/${sService}`;
};

export const buildServiceUrl = (oData) => {
    const sParams = (oData.params && Object.keys(oData.params).map(function (sKey) {
        if (Array.isArray(oData.params[sKey]))
            return oData.params[sKey].map(function (sValue) {
                return sValue;
            }).join('/');

        return oData.params[sKey];

    }).join('/')) || '';

    return getServiceLink(oData['method']) + (sParams && `/${sParams}`);
};

export const objectsEqual = (objA, objB) => {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
        return false;
    }

    const keysA = Object.keys(objA),
        keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    const bHasOwnProperty = Object.hasOwnProperty.bind(objB);
    for (let i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
    }

    return true;
}

export function shallowCompare(instance, nextProps, nextState) {
    return (
        !objectsEqual(instance.props, nextProps) ||
        !objectsEqual(instance.state, nextState)
    );
}