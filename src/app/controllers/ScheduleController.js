import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!isProvider) {
      return res.status(401).json({ error: 'Do you is not provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const schedules = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: { [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)] },
      },
      attributes: ['id', 'date', 'user_id', 'created_at'],
      order: ['date'],
    });

    return res.json(schedules);
  }
}

export default new ScheduleController();
