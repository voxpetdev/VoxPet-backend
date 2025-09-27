import DatesModel from '#src/models/DatesModel.js'

class DatesController {
  async getAll(req, res) {
    try {
      const dates = await DatesModel.getAll();
      res.json(dates);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const date = await DatesModel.getById(req.params.id);
      if (!date) return res.status(404).json({ message: 'Date not found' });
      res.json(date);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const result = await DatesModel.create(req.body);
      res.status(201).json({ message: 'Date created', id: result.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const result = await DatesModel.update(req.params.id, req.body);
      if (result.changes === 0) return res.status(404).json({ message: 'Date not found' });
      res.json({ message: 'Date updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await DatesModel.delete(req.params.id);
      if (result.changes === 0) return res.status(404).json({ message: 'Date not found' });
      res.json({ message: 'Date deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new DatesController();
