import { libsSharedConfigNotify } from './libs/shared/config/notify';

describe('libsSharedConfigNotify', () => {
  it('should work', () => {
    expect(libsSharedConfigNotify()).toEqual('libs/shared/config/notify');
  });
});
