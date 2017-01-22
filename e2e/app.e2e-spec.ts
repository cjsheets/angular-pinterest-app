import { AngularPinterestPage } from './app.po';

describe('angular-pinterest App', function() {
  let page: AngularPinterestPage;

  beforeEach(() => {
    page = new AngularPinterestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
