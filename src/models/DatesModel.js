import { tursoApp } from '../turso.config.js'
import { v4 as uuid } from 'uuid'

class DatesModel {
  async getAll() {
    const db = await tursoApp
    return db.all('SELECT * FROM citas')
  }

  async getById(id) {
    const db = await tursoApp
    return db.get('SELECT * FROM citas WHERE citasID = ?', [id])
  }

  async create(date) {
    const db = await tursoApp
    const { citasID, fecha, mascotaID, userID, consulta, lugar, observaciones } = date

    await db.run(
      `INSERT INTO citas (citasID, fecha, mascotaID, userID, consulta, lugar, observaciones) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [citasID, fecha, mascotaID, userID, consulta, lugar, observaciones]
    )

    return { code: 200, id: citasID }
  }

  async update(id, date) {
    const db = await tursoApp
    const { fecha, mascotaID, userID, consulta, lugar, observaciones } = date

    const result = await db.run(
      `UPDATE citas 
       SET fecha = ?, mascotaID = ?, userID = ?, consulta = ?, lugar = ?, observaciones = ?
       WHERE citasID = ?`,
      [fecha, mascotaID, userID, consulta, lugar, observaciones, id]
    )

    return { changes: result.changes }
  }

  async delete(id) {
    const db = await tursoApp
    const result = await db.run('DELETE FROM citas WHERE citasID = ?', [id])
    return { changes: result.changes }
  }
}

export default new DatesModel()
