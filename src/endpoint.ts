import { loadComponent } from '@serverless-devs/core';

function extract(regex: RegExp, endpoint: string) {
  const matchs = endpoint.match(regex);
  if (matchs) {
    return matchs[1];
  }
  return null;
}

function extractAccountId(endpoint: string) {
  return extract(/^https?:\/\/([^.]+)\..+$/, endpoint);
}

function extractRegion(endpoint: string) {
  return extract(/^https?:\/\/[^.]+\.([^.]+)\..+$/, endpoint);
}

function extractProtocol(endpoint: string) {
  const array = endpoint.split(':', 1);
  return array.length !== 0 ? array[0] : '';
}

interface ICustomEndpoint {
  fcEndpoint: string;
  accountId: string;
  region: string;
  protocol: string;
}

export async function getFcEndpoint(): Promise<ICustomEndpoint | undefined> {
  const fcDefault = await loadComponent('devsapp/fc-default');
  const fcEndpoint: string = await fcDefault.get({ args: 'fc-endpoint' });
  if (!fcEndpoint) { return undefined; }
  const enableFcEndpoint: any = await fcDefault.get({ args: 'enable-fc-endpoint' });
  if (!(enableFcEndpoint === true || enableFcEndpoint === 'true')) { return undefined; }

  return {
    fcEndpoint,
    accountId: extractAccountId(fcEndpoint),
    region: extractRegion(fcEndpoint),
    protocol: extractProtocol(fcEndpoint),
  }
}
