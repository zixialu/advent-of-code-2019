type Coordinate = { x: number; y: number };
type Alignment = 'h' | 'v';
class LineSegment {
  start: Coordinate;
  alignment: Alignment;
  distance: number;

  constructor(start: Coordinate, alignment: Alignment, distance: number) {
    this.start = start;
    this.alignment = alignment;
    this.distance = distance;
  }

  static fromInstruction(start: Coordinate, instruction: string): LineSegment {
    const direction = instruction.charAt(0);
    const alignment = ['L', 'R'].includes(direction) ? 'h' : 'v';
    const distance = Number(instruction.slice(1)) *
      (['L', 'D'].includes(direction) ? -1 : 1);
    return new LineSegment(start, alignment, distance);
  }

  get orthogonalValue(): number {
    return this.alignment === 'h' ? this.start.y : this.start.x;
  }

  get parallelStartValue(): number {
    return this.alignment === 'h' ? this.start.x : this.start.y;
  }

  get parallelEndValue(): number {
    return this.parallelStartValue + this.distance;
  }

  get end(): Coordinate {
    const changedDimension = this.alignment === 'h' ? 'x' : 'y';
    return { ...this.start, [changedDimension]: this.parallelEndValue };
  }

  traversesValue(n: number): boolean {
    return (n > this.parallelStartValue && n <= this.parallelEndValue) ||
      (n >= this.parallelEndValue && n < this.parallelStartValue);
  }

  intersects(other: LineSegment): Coordinate | undefined {
    // Only considering orthogonal lines
    if (other.alignment === this.alignment) return undefined;

    if (
      this.traversesValue(other.orthogonalValue) &&
        other.traversesValue(this.orthogonalValue)
    ) {
      const x = this.alignment === 'h' ? other.orthogonalValue : this.orthogonalValue;
      const y = this.alignment === 'v' ? other.orthogonalValue : this.orthogonalValue;
      return { x, y } as Coordinate;
    }

    return undefined;
  }
}

const parseInstructionsToLineSegments = (instructions: string): LineSegment[] => {
  let currentPosition: Coordinate = { x: 0, y: 0 };
  return instructions.split(',')
    .map(instruction => {
      const segment = LineSegment.fromInstruction(currentPosition, instruction);
      currentPosition = segment.end;
      return segment;
    });
}

const findIntersections = (wire1: LineSegment[], wire2: LineSegment[]): Coordinate[] => {
  let intersections: Coordinate[] = [];
  for (let segment1 of wire1) {
    for (let segment2 of wire2) {
      const intersection = segment1.intersects(segment2);
      if (intersection) intersections.push(intersection);
    }
  }
  return intersections;
}

const manhattanDistance = (point: Coordinate): number => (
  Math.abs(point.x) + Math.abs(point.y)
);

// Part 1
const { readFileSync } = require('fs');

const input = readFileSync('./input.txt', 'utf8');
const [wire1, wire2] = input.split('\n')
  .map(line => parseInstructionsToLineSegments(line));
const closesIntersect = Math.min(
  ...findIntersections(wire1, wire2).map((p) => manhattanDistance(p))
);
console.log(closesIntersect);
