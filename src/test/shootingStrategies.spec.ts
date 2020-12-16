import SimpleMovingStrategy from '~strategy/SimpleMovingStrategy';
import Missile_A from '~abstract-factory/entity/familyA/Missile_A';
import RealisticMovingStrategy from '~strategy/RealisticMovingStrategy';
import { GAME_CONFIG } from '~config';
import { convertAngleToRad } from '~strategy/utils';

jest.mock('~model/GameModel');

describe('Test case: shooting strategies', () => {
  describe('Simple strategy', () => {
    const simpleMovingStrategy = new SimpleMovingStrategy();
    const missile = new Missile_A({ x: 0, y: 0 }, 0, 0, simpleMovingStrategy);
    const originalPosition = missile.getPosition();

    it('is moving one way way when velocity specified', () => {
      jest.spyOn(missile, 'getInitVelocity').mockReturnValue(1);
      simpleMovingStrategy.updatePosition(missile);

      expect(missile.getPosition()).toStrictEqual({
        x: originalPosition.x + missile.getInitVelocity(),
        y: originalPosition.y,
      });
    });

    it('is mot moving when zero velocity', () => {
      jest.spyOn(missile, 'getInitVelocity').mockReturnValue(0);

      const originalPosition = missile.getPosition();
      simpleMovingStrategy.updatePosition(missile);

      expect(missile.getPosition()).toStrictEqual(originalPosition);
    });
  });

  describe('Realistic strategy', () => {
    const realisticMovingStrategy = new RealisticMovingStrategy();
    const missile = new Missile_A({ x: 250, y: 250 }, 0, 0, realisticMovingStrategy);
    const initPosition = missile.getPosition();

    beforeEach(() => {
      missile.setPosition(initPosition.x, initPosition.y);
    });

    it('is moving only down when init velocity is zero', () => {
      jest.spyOn(missile, 'getInitVelocity').mockReturnValue(0);
      jest.spyOn(missile, 'getInitAngle').mockReturnValue(0);
      jest.spyOn(missile, 'getAge').mockReturnValue(1);

      realisticMovingStrategy.updatePosition(missile);
      expect(missile.getPosition().x).toStrictEqual(initPosition.x);
      expect(missile.getPosition().y).toStrictEqual(initPosition.y + missile.getAge() * GAME_CONFIG.GAME.gravity);
    });

    it('it is moving both direction with non zero velocity', () => {
      jest.spyOn(missile, 'getInitVelocity').mockReturnValue(1);
      jest.spyOn(missile, 'getAge').mockReturnValue(1);

      const originalPosition = { x: missile.x, y: missile.y };

      realisticMovingStrategy.updatePosition(missile);

      expect(missile.getPosition().y).toStrictEqual(originalPosition.y + missile.getAge() * GAME_CONFIG.GAME.gravity);
      expect(missile.getPosition().x).toStrictEqual(originalPosition.x + missile.getInitVelocity());
    });

    it('it is moving in both direction with non zero angle', () => {
      jest.spyOn(missile, 'getInitAngle').mockReturnValue(45);
      jest.spyOn(missile, 'getAge').mockReturnValue(1);
      jest.spyOn(missile, 'getInitVelocity').mockReturnValue(1);

      const initAngle = convertAngleToRad(missile);
      realisticMovingStrategy.updatePosition(missile);

      expect(missile.getPosition()).toStrictEqual({
        x: initPosition.x + missile.getInitVelocity() * Math.cos(initAngle),
        y:
          initPosition.y -
          missile.getInitVelocity() * Math.sin(initAngle) +
          missile.getAge() * GAME_CONFIG.GAME.gravity,
      });
    });
  });
});
