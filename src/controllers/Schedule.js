/* eslint-disable prettier/prettier */
const { v4: uuidv4 } = require('uuid');
const ScheduleModel = require('../models/Schedule');
const ExperimentModel = require('../models/Experiment');
const GlobalUserModel = require('../models/GlobalUser');
const Mail = require('../mail/mail');
const cron = require("node-cron");
const moment = require("moment");
require('moment/locale/pt-br');

module.exports = {
  async create(request, response) {
    try {
      const schedule = request.body;
      schedule.id = uuidv4();
      const date = new Date();
      schedule.create_in = date;
      await ScheduleModel.create(schedule);
      const exp = await ExperimentModel.getById(schedule.experiment_id);
      const user = await GlobalUserModel.getById(schedule.user_id);

      if (schedule.wating_confirmation === true) {
        const scheduleDateTime = moment(schedule.date).format('YYYY-MM-DD');
        const combinedDateTime = moment(`${scheduleDateTime} ${schedule.hour}`, 'YYYY-MM-DD HH:mm:ss').toDate();

        // Subtrair a duração de hora e minutos
        const updatedDateTime = moment(combinedDateTime).subtract(exp.duration);

        const cronExpression = `${updatedDateTime.minutes()} ${updatedDateTime.hours()} ${updatedDateTime.date()} ${updatedDateTime.month() + 1} *`;

        const task = cron.schedule(cronExpression, async () => {
          const result = await ScheduleModel.getByUserCount({
            experiment_id: schedule.experiment_id,
            date: moment(schedule.date).format('YYYY-MM-DD'),
            hour: schedule.hour,
            wating_confirmation: 0
          });
          const userSolicitation = await ScheduleModel.getByUserCount({
            experiment_id: schedule.experiment_id,
            date: moment(schedule.date).format('YYYY-MM-DD'),
            hour: schedule.hour,
            user_id: schedule.user_id
          });
          if (userSolicitation === 1) {
            if (result === 0) {
              try {
                await ScheduleModel.updateById(schedule.id, { wating_confirmation: false });
                Mail.ScheduleApproved(
                  user[0].email,
                  user[0].name,
                  exp.title,
                  moment(combinedDateTime).format('D [de] MMMM [de] YYYY [as] HH:mm[h]')
                );
              } catch (err) {
                console.log(err);
              }

            } else {
              try {
                await ScheduleModel.deleteById(schedule.id);
                Mail.ScheduleCanceled(
                  user[0].email,
                  user[0].name,
                  exp.title,
                  moment(combinedDateTime).format('D [de] MMMM [de] YYYY [as] HH:mm[h]')
                );
              } catch (err) {
                console.log(err);
              }
            }
          }
          task.stop();
        });
      }
      return response.status(201).json({ id: schedule.id });
    } catch (err) {
      console.error(`Schedule creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await ScheduleModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Schedule getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await ScheduleModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Schedule getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByExperiment(request, response) {
    try {
      const fields = request.query;
      const result = await ScheduleModel.getByExperiment(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Experiment getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.query;
      const result = await ScheduleModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Experiment getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByExpUser(request, response) {
    try {
      const fields = request.query;
      const result = await ScheduleModel.getByExpUser(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Experiment getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByUserCount(request, response) {
    try {
      const fields = request.query;
      const result = await ScheduleModel.getByUserCount(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Experiment getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getCountByDayInDateRange(request, response) {
    try {
      const { startDate, endDate, experiment_id } = request.params;
      const result = await ScheduleModel.getCountByDayInDateRange(startDate, endDate, experiment_id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Schedule getCountByDayInDateRange failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getCountByMonthInDateRange(request, response) {
    try {
      const { startDate, endDate, experiment_id } = request.params;
      const result = await ScheduleModel.getCountByMonthInDateRange(startDate, endDate, experiment_id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Schedule getCountByMonthInDateRange failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getCountByYearInDateRange(request, response) {
    try {
      const { startDate, endDate, experiment_id } = request.params;
      const result = await ScheduleModel.getCountByYearInDateRange(startDate, endDate, experiment_id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Schedule getCountByYearInDateRange failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getCountByWeekInDateRange(request, response) {
    try {
      const { startDate, endDate, experiment_id } = request.params;
      const result = await ScheduleModel.getCountByWeekInDateRange(startDate, endDate, experiment_id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Schedule getCountByWeekInDateRange failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const schedule = request.body;

      const stillExistFieldsToUpdate = Object.values(schedule).length > 0;
      if (stillExistFieldsToUpdate) {
        await ScheduleModel.updateById(id, schedule);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Schedule update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await ScheduleModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Schedule delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
