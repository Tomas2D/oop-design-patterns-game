import AbstractMissile from '~abstract-factory/entity/AbstractMissile';

export function convertAngleToRad(missile: AbstractMissile) {
  return -1 * missile.getInitAngle() * (Math.PI / 180);
}
