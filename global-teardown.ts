import { DbHelper } from './src/shared/infra/database/helper'

export default async function () {
    const isCI = false
    if (isCI) {
        // ️️️✅ Best Practice: Leave the DB up in dev environment
    }

    else {
        // ✅ Best Practice: Clean the database occasionally
        if (Math.ceil(Math.random() * 10) === 10) {
            await DbHelper.cleanDatabase(['question', 'user'])

        }
    }
}