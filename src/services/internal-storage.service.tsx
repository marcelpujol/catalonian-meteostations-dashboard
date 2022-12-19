export const METADATA_STORE_NAME = 'metadata-weather';
const INDEXED_BD_NAME: string = 'weather-data';
const INDEXED_DB_VERSION: number = 1;

export const getDatabase = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = window.indexedDB.open(INDEXED_BD_NAME, INDEXED_DB_VERSION);
        request.onsuccess = (event) => {
            const target: any = event.target;
            const database: IDBDatabase = target.result;
            resolve(database);
        }
        request.onerror = (event) => {
            const target: any = event.target;
            const errorCode: string = target?.errorCode ?? 'internal error';
            reject(errorCode);
        }
        request.onupgradeneeded = (event) => {
            const target: any = event.target;
            const database: IDBDatabase = target.result;
            database.createObjectStore(METADATA_STORE_NAME, { keyPath: "code" });
        }
    });
}

export const insertData = async (storeName: string, data: any) => {
    try {
        const database = await getDatabase();
        const tx = database.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        data?.forEach(async (data: any) => {
            await store.put(data)
        });
        tx.commit();
    } catch(err) {
        console.error('insert data error', err);
        throw err;
    }
}

export const getAllData = async (storeName: string): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const database = await getDatabase();
            const tx = database.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = (err) => reject(err);
        } catch(err) {
            console.error('get data error', err);
            reject(err);
        }
    });
}

export const getDataByKey = (key: string, storeName: string): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const database = await getDatabase();
            const tx = database.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = (err) => reject(err);
        } catch(err) {
            console.error('get data by key', err);
            reject(err);
        }
    });
}