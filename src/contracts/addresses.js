import { addressesURL, wrongRepoAlert } from "./helpers";
 const local = {
     VOTING_TO_CHANGE_KEYS_ADDRESS: '0x6ee6e74d12376ecd4a2e8c383c4403f82c12fa4f',
     VOTING_TO_CHANGE_MIN_THRESHOLD_ADDRESS: '0x4841efded2f4ac22486e74db880dc66e91931e29',
     VOTING_TO_CHANGE_PROXY_ADDRESS: '0x1aab6eecebc625cf0dfcec89531ea8d818482bfa',
     BALLOTS_STORAGE_ADDRESS: '0xdfb1f7513ec4c80a9ff91d66a9d3d81861bbbe90',
     METADATA_ADDRESS: '0x3f7de87620847472114992f2a229328ff94299dc',
     POA_ADDRESS: '0x8bf38d4764929064f2d4d3a56520a76ab3df415b',
 }

let SOKOL_ADDRESSES = {};
let CORE_ADDRESSES = {};

async function getContractsAddresses(branch) {
    let addr = addressesURL(branch);
    let response;
    try {
        response = await fetch(addr);
    } catch(e) {
        return wrongRepoAlert(addr);
    }

    let contracts = await response.json();

    switch (branch) {
        case 'core':
            CORE_ADDRESSES = contracts;
            break;
        case 'sokol':
            SOKOL_ADDRESSES = contracts;
            break;
        default:
            CORE_ADDRESSES = contracts;
            break;
    }
}

function getAddresses(netId) {
    switch (netId) {
        case '77':
            return SOKOL_ADDRESSES
        case '99':
            return CORE_ADDRESSES
    case '81':
	    return local
        default:
            return CORE_ADDRESSES
    }
}

module.exports = {
    getContractsAddresses: getContractsAddresses,
    networkAddresses: getAddresses
}