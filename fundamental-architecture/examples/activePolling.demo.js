const {
    MockResource,
    activePolling
} = require("../src/activePolling");

const socketA = new MockResource("Socket A", [
    "Hello",
    "How",
    "Are",
    "You"
]);

const socketB = new MockResource("Socket B", [
    "Node",
    "JS",
    "Is",
    "Awesome"
]);

const fileA = new MockResource("File A", [
    "Line 1",
    "Line 2",
    "Line 3"
]);

const resources = [
    socketA,
    socketB,
    fileA
];

activePolling(resources);
