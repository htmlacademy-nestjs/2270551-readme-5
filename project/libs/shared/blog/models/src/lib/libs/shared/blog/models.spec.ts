import { libsSharedBlogModels } from './libs/shared/blog/models';

describe('libsSharedBlogModels', () => {
  it('should work', () => {
    expect(libsSharedBlogModels()).toEqual('libs/shared/blog/models');
  });
});
