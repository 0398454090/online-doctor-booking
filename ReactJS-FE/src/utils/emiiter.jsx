import EvenEmitter from 'events';

const _emiiter = new EvenEmitter();
_emiiter.setMaxListeners(0);

export const emitter = _emiiter;