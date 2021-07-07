import { TypedList } from './TypedList';

export class Point extends TypedList<number> {
  
}

export function newPoint(length: number): Point {
  const data = Array.from({ length }).map(() => 0.0);
  return new Point(data);
}
