import sendRequest from '@/helpers/sendRequest';
import { ClanWarProps } from '@/types';

export const getCurrentWarInfo = async (endpointUrl: string): Promise<ClanWarProps> => {
  return (await sendRequest(endpointUrl)) as ClanWarProps;
};
