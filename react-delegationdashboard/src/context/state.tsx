import { IDappProvider, ProxyProvider, ApiProvider, WalletProvider } from '@elrondnetwork/erdjs';
import { ContractOverview } from 'helpers/types';
import { denomination, decimals, network, NetworkType } from '../config';
import { getItem } from '../storage/session';

export const defaultNetwork: NetworkType = {
  id: 'not-configured',
  name: 'NOT CONFIGURED',
  egldLabel: '',
  walletAddress: '',
  apiAddress: '',
  gatewayAddress: '',
  explorerAddress: '',
  delegationContract: '',
};

export interface DappState {
  provider: IDappProvider;
  proxy: ProxyProvider;
  apiProvider: ApiProvider;
}

export interface StateType {
  dapp: DappState;
  loading: boolean;
  error: string;
  loggedIn: boolean;
  address: string;
  egldLabel: string;
  denomination: number;
  decimals: number;
  account: AccountType;
  explorerAddress: string;
  delegationContract?: string;
  totalActiveStake: string;
  numberOfActiveNodes: string;
  aprPercentage: string;
  contractOverview: ContractOverview;
}
export const emptyAccount: AccountType = {
  balance: '...',
  nonce: 0,
};

export const emptyContractOverview: ContractOverview = {
  ownerAddress: '',
  serviceFee: '',
  maxDelegationCap: '',
  initialOwnerFunds: '',
  automaticActivation: 'false',
  withDelegationCap: false,
  changeableServiceFee: false,
  createdNounce: false,
  unBondPeriod: 0,
};

export const initialState = () => {
  const sessionNetwork = network || defaultNetwork;
  return {
    denomination: denomination,
    decimals: decimals,
    dapp: {
      provider: new WalletProvider(sessionNetwork.walletAddress),
      proxy: new ProxyProvider(
        sessionNetwork.gatewayAddress !== undefined
          ? sessionNetwork?.gatewayAddress
          : 'https://gateway.elrond.com/',
        4000
      ),
      apiProvider: new ApiProvider(
        sessionNetwork.apiAddress !== undefined
          ? sessionNetwork?.apiAddress
          : 'https://api.elrond.com/',
        4000
      ),
    },
    loading: false,
    error: '',
    loggedIn: !!getItem('logged_in'),
    address: getItem('address'),
    account: emptyAccount,
    egldLabel: sessionNetwork?.egldLabel,
    explorerAddress: sessionNetwork.explorerAddress || 'https://explorer.elrond.com',
    delegationContract: sessionNetwork.delegationContract,
    contractOverview: emptyContractOverview,
    numberOfActiveNodes: '...',
    totalActiveStake: '...',
    aprPercentage: '...',
  };
};

export interface AccountType {
  balance: string;
  nonce: number;
}
