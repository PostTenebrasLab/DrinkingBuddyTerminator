import { DrinkingBuddyTerminatorPage } from './app.po';

describe('drinking-buddy-terminator App', function() {
  let page: DrinkingBuddyTerminatorPage;

  beforeEach(() => {
    page = new DrinkingBuddyTerminatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
