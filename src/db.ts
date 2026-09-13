import * as SQLite from 'expo-sqlite';

export interface ZikirLog {
    id:number;
    name:string;
    count: number;
    target_count?: number | null;
    description?: string | null;
    is_favorite?: number;
    updated_at?: string;
}

const db = SQLite.openDatabaseSync('zikir_tracker.db');

export const initDatabase = () : void => {
    try{
        db.execSync(`
            CREATE TABLE IF NOT EXISTS zikir_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            count INTEGER NOT NULL DEFAULT 0,
            target_count INTEGER,
            description TEXT,
            is_favorite INTEGER NOT NULL DEFAULT 0,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log('Veritabanı başarıyla başlatıldı.');
    }catch(error){
        console.log('Veritabanı başlatılamadı, hata :', error);
    }

};

export const addRow = (log :{
    name:string;
    count: number;
    target_count?: number;
    description?: string ;
}): number | null => {
    try {
        const result = db.runSync(`INSERT INTO zikir_logs 
            (name, count,target_count, description)
            VALUES(?,?,?,?);
            `,
            [
                log.name,
                log.count,
                log.target_count ? log.target_count: null,
                log.description ? log.description: null
            ]
        )
        console.log('Row başarıyla eklendi');
        return result.lastInsertRowId;
    } catch (error) {
        console.log('Row eklenemedi, hata:',error);
        return null;
    }
};
export const getAllRows = () :ZikirLog [] | null =>{
    try {
        return db.getAllSync<ZikirLog>('SELECT * FROM zikir_logs ORDER BY is_favorite DESC, updated_at DESC;');
    } catch (error) {
        console.log('Tüm verileri çekme işlemi başarısız:', error);
        return null;
    }
};

export const deleteRow = (id: number): boolean => {
  try {
    const result = db.runSync(`DELETE FROM zikir_logs WHERE id = ?;`, [id]);
    console.log(`ID: ${id} olan zikir başarıyla silindi.`);
    
    // changes: Silinen satır sayısını verir. 1 ise silinmiştir.
    return result.changes > 0;
  } catch (error) {
    console.log('Silme işlemi tamamlanamadı, hata:', error);
    return false;
  }
};

export const toggleFavorite = (id : number, currentStatus: number) => {
    try {
        const newStatus = currentStatus ===1 ? 0: 1;
        const now= new Date().toISOString();
        const result = db.runSync(`UPDATE zikir_logs SET is_favorite = ?,updated_At = ? WHERE id = ?`,
        [newStatus,now,id]
    );

    console.log(`ID: ${id} favori durumu güncellendi: ${newStatus}`);
    return result.changes > 0;
    } catch (error) {
        console.log('Favorileme işlemi tamamlanamadı, hata:', error);
    return false;
    }
};

export const updateCount = (id: number, newCount: number): boolean => {
  try {
    const now = new Date().toISOString();
    const result = db.runSync(
      `UPDATE zikir_logs SET count = ?, updated_at = ? WHERE id = ?;`,
      [newCount, now, id]
    );
    return result.changes > 0;
  } catch (error) {
    console.log(`ID: ${id} sayacı güncellenemedi, hata:`, error);
    return false;
  }
};