class MockResource {
    static NO_DATA_AVAILABLE = Symbol("NO_DATA_AVAILABLE");
    static RESOURCE_CLOSED = Symbol("RESOURCE_CLOSED");

    constructor(name, dataChunks) {
        this.name = name;
        this.dataChunks = [...dataChunks];
        this.closed = false;
    }

    read() {
        // Simulate a non-blocking read.
        // Sometimes no data is available yet.
        if (Math.random() < 0.4) {
            return MockResource.NO_DATA_AVAILABLE;
        }

        // No more data left.
        if (this.dataChunks.length === 0) {
            this.closed = true;
            return MockResource.RESOURCE_CLOSED;
        }

        // Return the next available chunk.
        return this.dataChunks.shift();
    }
}

function consumeData(resourceName, data) {
    console.log(`✓ [${resourceName}] Received: ${data}`);
}

function activePolling(resources) {
    console.log("\n=== Starting Active Polling ===\n");

    while (resources.length > 0) {
        for (let i = 0; i < resources.length; i++) {
            const resource = resources[i];
            const data = resource.read();

            if (data === MockResource.NO_DATA_AVAILABLE) {
                console.log(`[${resource.name}] No data available`);
                continue;
            }

            if (data === MockResource.RESOURCE_CLOSED) {
                console.log(`[${resource.name}] Resource closed`);
                resources.splice(i, 1);
                i--;
                continue;
            }

            consumeData(resource.name, data);
        }
    }

    console.log("\n=== All resources have been processed ===");
}

module.exports = {
    MockResource,
    activePolling
};
