import { LinkListPage } from './app.po';

describe('link-list App', () => {
  let page: LinkListPage;

  beforeEach(() => {
    page = new LinkListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
