import { execSync } from "node:child_process";

function checkIfPortIsReachable(port: number) {
    try {
        const output = execSync(`ss -nl | grep ":${port}" &> /dev/null`).toString();

        if (output) {
            return true;
        }

        return false;
    } catch (error) {
        return false;
    }
}

export default function setup() {
    console.time("global setup")
    try {
        const databasePort = 5431
        console.log("🔍 Checking if the database is already running");

        const isPortReachable = checkIfPortIsReachable(databasePort);

        if (isPortReachable === false) {
            console.log("🚀 Starting services");

            execSync("docker compose up -d");

            // Wait for the database to accept connections
            execSync(
                "docker container exec database-container sh -c 'until pg_isready ; do sleep 1; done'"
            );

            // Create the tables
            execSync("npm run migration:run");

            // Execute seeds if necessary
            // execSync("npm run db:seeds");
        }

        console.log("✅ global-setup");
    } catch (error) {
        console.error(error)
    }
    finally {
        console.timeEnd("global-setup finished")
    }

}
