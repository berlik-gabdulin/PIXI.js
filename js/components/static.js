export const CONST_WIDTH = 1390;
export const CONST_HEIGHT = 640;

export const stageItems = {
  ['Austin']: { position: { x: 656, y: 58 }, scale: 1, alpha: 1 },
  ['bookStand']: { position: { x: 834, y: -33 }, scale: 0, alpha: 0 },
  ['btnContinue']: {
    anchor: { x: 0.5, y: 0 },
    zIndex: 20,
  },
  ['plant1']: { position: { x: 1135, y: 159 }, scale: 0, alpha: 0 },
  ['plant2']: { position: { x: 456, y: -47 }, scale: 0, alpha: 0 },
  ['stairOld']: {
    position: { x: CONST_WIDTH, y: CONST_HEIGHT - 22 },
    anchor: 1,
    scale: 0,
    alpha: 0,
  },
  ['globe']: { position: { x: 87, y: 104 }, scale: 0, alpha: 0 },
  ['plantBasket']: {
    position: { x: CONST_WIDTH - 20, y: CONST_HEIGHT + 31 },
    anchor: 1,
    scale: 0,
    alpha: 0,
  },
  ['logo']: { position: { x: 32, y: -4 }, scale: 0, alpha: 0 },
  ['sofa']: { position: { x: 127, y: 319 }, scale: 0, alpha: 0 },
  ['table']: { position: { x: 202, y: 191 }, scale: 0, alpha: 0 },
  ['iconHammer']: {
    position: { x: 1087, y: 253 },
    anchor: 0.5,
    scale: 0,
    alpha: 0,
    zIndex: 1,
  },
  ['overlay']: { position: { x: 0, y: 0 }, scale: 0, alpha: 0 },
  ['finalPopup']: {
    position: { x: CONST_WIDTH / 2, y: CONST_HEIGHT / 2 - 50 },
    anchor: 0.5,
    scale: 0,
    alpha: 0,
    zIndex: 15,
  },
};
export const initSpritesToShow = [
  'Austin',
  'bookStand',
  'stairOld',
  'globe',
  'plantBasket',
  'logo',
  'sofa',
  'table',
  'plant1',
  'plant2',
];

export const spritesToBulkCreate = [
  'Austin',
  'bookStand',
  'stairOld',
  'globe',
  'plantBasket',
  'logo',
  'sofa',
  'table',
  'iconHammer',
];

export const stairElements = ['stair', 'railing', 'carpet'];
export const appFinish = ['overlay', 'btnContinue', 'finalPopup'];
