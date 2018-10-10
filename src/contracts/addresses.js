import { constants } from '../constants'
import { addressesURL, wrongRepoAlert } from './helpers'
 const local = {
     VOTING_TO_CHANGE_KEYS_ADDRESS: '0x5c6952869c81f49d4aab1e44a8dda47c31019900',
     VOTING_TO_CHANGE_MIN_THRESHOLD_ADDRESS: '0x953cd3762c5cb3be6d16032210e1ae5cf00707af',
     VOTING_TO_CHANGE_PROXY_ADDRESS: '0x06d0dfa23bedfff1cb3c4e2e2bfaef773f2d3c41',
     BALLOTS_STORAGE_ADDRESS: '0xc29b2cfb003b8835f6d10d478286dbb6ecec0765',
     METADATA_ADDRESS: '0x811803d2afb9b634ee8e2beb257302c6f5b603cc',
     POA_ADDRESS: '0x8bf38d4764929064f2d4d3a56520a76ab3df415b',
 }

let SOKOL_ADDRESSES = {}
let CORE_ADDRESSES = {}
let DAI_TEST_ADDRESSES = {}
let DAI_ADDRESSES = {}

async function getContractsAddresses(branch) {
  let addr = addressesURL(branch)
  let response
  try {
    response = await fetch(addr)
  } catch (e) {
    return wrongRepoAlert(addr)
  }

  let contracts = await response.json()

  switch (branch) {
    case 'core':
      CORE_ADDRESSES = contracts
      break
    case 'dai':
      DAI_ADDRESSES = contracts
      break
    case 'sokol':
      SOKOL_ADDRESSES = contracts
      break
    case 'dai-test':
      DAI_TEST_ADDRESSES = contracts
      break
    default:
      CORE_ADDRESSES = contracts
      break
  }
}

function getAddresses(netId) {
  switch (netId) {
    case constants.NETID_SOKOL:
      return SOKOL_ADDRESSES
    case constants.NETID_DAI_TEST:
      return DAI_TEST_ADDRESSES
    case constants.NETID_CORE:
      return CORE_ADDRESSES
    case constants.NETID_DAI:
      return DAI_ADDRESSES
    case '81':
      return local
    default:
      return CORE_ADDRESSES
  }
}

module.exports = {
  getContractsAddresses,
  networkAddresses: getAddresses
}
