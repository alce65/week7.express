type id = number;

export interface Data<T> {
    getAll: () => Promise<Array<T>>;
    get: (id: id) => Promise<T>;
    post: (data: Partial<T>) => Promise<T>;
    // patch: (data: Partial<T>) => Promise<T>;
    // delete: (id: id) => Promise<void>;
}
