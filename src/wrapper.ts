import Tock from './tock.ts';

declare global {
  interface Window {
    Tock: any;
  }
}

console.log('hi!', Tock, new Tock);
window.Tock = Tock;
console.log('window?', window.Tock)
console.log(new window.Tock);
// window.foo = 'bar';