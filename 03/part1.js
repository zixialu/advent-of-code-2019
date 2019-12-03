class LineSegment {
    constructor(start, alignment, distance) {
        this.start = start;
        this.alignment = alignment;
        this.distance = distance;
    }
    static fromInstruction(start, instruction) {
        const direction = instruction.charAt(0);
        const alignment = ['L', 'R'].includes(direction) ? 'h' : 'v';
        const distance = Number(instruction.slice(1)) *
            (['L', 'D'].includes(direction) ? -1 : 1);
        return new LineSegment(start, alignment, distance);
    }
    get orthogonalValue() {
        return this.alignment === 'h' ? this.start.y : this.start.x;
    }
    get parallelStartValue() {
        return this.alignment === 'h' ? this.start.x : this.start.y;
    }
    get parallelEndValue() {
        return this.parallelStartValue + this.distance;
    }
    get end() {
        const changedDimension = this.alignment === 'h' ? 'x' : 'y';
        return Object.assign(Object.assign({}, this.start), { [changedDimension]: this.parallelEndValue });
    }
    traversesValue(n) {
        return (n > this.parallelStartValue && n <= this.parallelEndValue) ||
            (n >= this.parallelEndValue && n < this.parallelStartValue);
    }
    intersects(other) {
        // Only considering orthogonal lines
        if (other.alignment === this.alignment)
            return undefined;
        if (this.traversesValue(other.orthogonalValue) &&
            other.traversesValue(this.orthogonalValue)) {
            const x = this.alignment === 'h' ? other.orthogonalValue : this.orthogonalValue;
            const y = this.alignment === 'v' ? other.orthogonalValue : this.orthogonalValue;
            return { x, y };
        }
        return undefined;
    }
}
const parseInstructionsToLineSegments = (instructions) => {
    let currentPosition = { x: 0, y: 0 };
    return instructions.split(',')
        .map(instruction => {
        const segment = LineSegment.fromInstruction(currentPosition, instruction);
        currentPosition = segment.end;
        return segment;
    });
};
const findIntersections = (wire1, wire2) => {
    let intersections = [];
    for (let segment1 of wire1) {
        for (let segment2 of wire2) {
            const intersection = segment1.intersects(segment2);
            if (intersection)
                intersections.push(intersection);
        }
    }
    return intersections;
};
const manhattanDistance = (point) => (Math.abs(point.x) + Math.abs(point.y));
// Part 1
const { readFileSync } = require('fs');
const input = readFileSync('./input.txt', 'utf8');
const [wire1, wire2] = input.split('\n')
    .map(line => parseInstructionsToLineSegments(line));
const closesIntersect = Math.min(...findIntersections(wire1, wire2).map((p) => manhattanDistance(p)));
console.log(closesIntersect);
