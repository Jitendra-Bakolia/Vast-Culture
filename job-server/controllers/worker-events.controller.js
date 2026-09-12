const { Worker, Queue } = require('bullmq');
const moment = require('moment-timezone');
const { redis } = require('../configs/redis.config');
const { log } = require('../utils/logger.util');
const { QUEUES, TIMEZONES } = require('../constants');

const DEFAULT_QUEUE_NAME = QUEUES.DEFAULT_TASKS;

const taskQueue = new Queue(DEFAULT_QUEUE_NAME, {
    connection: redis,
});

const initializeWorkers = () => {
    try {
        const worker = new Worker(DEFAULT_QUEUE_NAME, async (job) => {
            console.log(`[Job Worker] Processing job ${job.id} (${job.name}) with data:`, job.data);
            // Process job here
            return { processed: true, at: moment().tz(TIMEZONES.DEFAULT).toISOString() };
        }, {
            connection: redis,
            concurrency: QUEUES.CONCURRENCY,
        });

        worker.on('completed', (job) => {
            console.log(`[Job Worker] Job ${job.id} has completed successfully.`);
        });

        worker.on('failed', (job, err) => {
            log('worker-events.controller -> job failed', err, { jobId: job?.id });
        });

        console.log(`[Job Server] BullMQ worker initialized on queue "${DEFAULT_QUEUE_NAME}"`);
    } catch (err) {
        log('worker-events.controller -> initializeWorkers', err);
    }
};

module.exports = {
    initializeWorkers,
    taskQueue,
};
