import BeeQueue from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        // fila
        queue: new BeeQueue(key, {
          redis: redisConfig,
        }),
        handle, //  processar o job em background
      };
    });
  }

  // add novo job na fila
  add(whichQueue, dataJob) {
    return this.queues[whichQueue].queue.createJob(dataJob).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { queue, handle } = this.queues[job.key];

      queue.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    const failure = `Queue ${job.queue.name}: FAILED, ${err}`;
    console.log(failure);
  }
}

export default new Queue();
