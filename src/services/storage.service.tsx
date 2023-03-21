function getStoragePreference(key: string): string | null {
    return sessionStorage.getItem(key);
}

function setStoragePreference(key: string, value: string): void {
    sessionStorage.setItem(key, value);
}

export {
    getStoragePreference,
    setStoragePreference
}