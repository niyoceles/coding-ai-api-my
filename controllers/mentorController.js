import models from '../models'

const { Mentors } = models

class mentorController {
  static async createMentor(req, res) {
    const {
      names, technology, country, biography, facebook, twitter, linkedIn, instagram
    } = req.body;
    const { username } = req.decodedToken;
    try {
      const newMentor = await Mentors.findOrCreate({
        where: { username },
        defaults: {
          names,
          technology,
          country,
          biography,
          facebook,
          twitter,
          linkedIn,
          instagram
        }
      });
      return res.status(200).json({
        mentor: newMentor,
        message: 'successful mentor accepted',
      });

    } catch (error) {
      console.log(error);
    }
  }

  static async updateMentor(req, res) {
    const {
      names, technology, country, biography, facebook, twitter, linkedIn, instagram
    } = req.body;
    const { username } = req.decodedToken;
    const { id } = req.params;
    try {
      const updateMentor = await Mentors.update({
        names,
        technology,
        country,
        biography,
        facebook,
        twitter,
        linkedIn,
        instagram
      },
        {
          where: {
            id, username
          },
        });
      if (!updateMentor) {
        return res.status(404).json({
          error: 'Failed to update mentor'
        });
      }
      return res.status(200).json({
        message: 'update mentor successful',
      });

    } catch (error) {
      return res.status(500).json({ error: 'Failed to update mentor' });
    }
  }

  static async allMentors(req, res) {
    try {
      const allmentors = await Mentors.findAll();
      if (!allmentors) {
        return res.status(404).json({
          error: 'No Mentor found',
        });
      }
      return res.status(200).json({
        User: allmentors,
        message: 'Get mentors successful ',
      });

    } catch (error) {
      return res.status(500).json({ error: 'Failed to get mentors' });
    }
  }

  static async deleteMentor(req, res) {
    const { id } = req.params;
    const { username } = req.decodedToken;
    try {
      const delMentor = await Mentors.destroy({
        where: {
          id, username
        },
      });
      if (!delMentor) {
        return res.status(404).json({
          error: 'This mentor is not found',
        });
      }
      return res.status(204).send('');

    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete mentor' });
    }
  }
}

export default mentorController;
