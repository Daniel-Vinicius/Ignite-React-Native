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

  it('Skill flow', async () => {
    const inputNewSkill = element(by.id('input-new'));
    const buttonAdd = element(by.id('button-add'));
    const flatListSkills = element(by.id('flat-list-skills'));

    await inputNewSkill.tap();
    await inputNewSkill.typeText('React Native');
    await flatListSkills.tap();

    await buttonAdd.tap();

    await expect(inputNewSkill).toHaveText('');

    const skillCard = element(by.text('React Native'));

    await expect(skillCard).toBeVisible();

    await skillCard.longPress();

    await expect(skillCard).not.toExist();
  });
});
