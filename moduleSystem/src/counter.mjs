let count = 0;

export { count };

export function increment() {
    count++;
}

export function decrement() {
    count--;
}

export function reset() {
    count = 0;
}
