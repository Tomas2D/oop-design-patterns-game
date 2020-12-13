import IMovingStrategy from '~interface/strategy/IMovingStrategy';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import { GAME_CONFIG } from '~config';

const { gravity } = GAME_CONFIG.GAME;

class RealisticMovingStrategy implements IMovingStrategy {
  updatePosition(missile: AbstractMissile) {
    const initVelocity = missile.getInitVelocity();
    const initAngle = missile.getInitAngle() * 0.0174532925;
    const time = missile.getAge();

    const x = initVelocity * time * Math.cos(initAngle);
    const y = 0.5 * gravity * time * time - initVelocity * time * Math.sin(initAngle);

    missile.setPosition(x + missile.x, y + missile.y);
  }
}

export default RealisticMovingStrategy;
