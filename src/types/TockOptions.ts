export interface TockOptions {
  interval?: number;
  countdown?: boolean;
  callback?: () => void;
  complete?: () => void;
}