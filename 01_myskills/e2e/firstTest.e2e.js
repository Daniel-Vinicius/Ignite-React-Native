describe('Home', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('check register a new skill', async () => {
    const inputNewSkill = element(by.id('input-new'));
    const buttonAdd = element(by.id('button-add'));

    await inputNewSkill.tap();
    await inputNewSkill.typeText('React Native');

    await buttonAdd.tap();

    await expect(inputNewSkill).toHaveText('');
    await expect(element(by.text('React Native'))).toBeVisible();
  });
});
