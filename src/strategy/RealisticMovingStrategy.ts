import IMovingStrategy from '~strategy/IMovingStrategy';
import AbstractMissile from '~abstract-factory/entity/AbstractMissile';
import { GAME_CONFIG } from '~config';
import { timeout } from 'q';

class RealisticMovingStrategy implements IMovingStrategy {
  updatePosition(missile: AbstractMissile) {
    const time = missile.getAge();

    const velocity = missile.getInitVelocity();
    const initAngle = -1 * missile.getInitAngle() * (Math.PI / 180);

    const dx = velocity * Math.cos(initAngle);
    const dy = velocity * Math.sin(initAngle) - time * GAME_CONFIG.GAME.gravity;

    missile.setPosition(missile.x + dx, missile.y - dy);
  }
}

export default RealisticMovingStrategy;
