import petsModel from '#src/models/petsModel.js'

class PetsController {
    async getAll(req, res) {
        try {
          const dates = await petsModel.getAll();
          res.json(dates);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
    
      async getById(req, res) {
        try {
          const date = await petsModel.getById(req.params.id);
          if (!date) return res.status(404).json({ message: 'Pet not found' });
          res.json(date);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
    
      async create(req, res) {
        try {
          const result = await petsModel.create(req.body);
          res.status(201).json({ message: 'Pet created', id: result.id });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
    
      async update(req, res) {
        try {
          const result = await petsModel.update(req.params.id, req.body);
          if (result.changes === 0) return res.status(404).json({ message: 'Pet not found' });
          res.json({ message: 'Pet updated' });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
    
      async delete(req, res) {
        try {
          const result = await petsModel.delete(req.params.id);
          if (result.changes === 0) return res.status(404).json({ message: 'Pet not found' });
          res.json({ message: 'Pet deleted' });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
}

export default new PetsController();
