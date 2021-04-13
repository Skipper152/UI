export class Block<T> {
    private _value: T | undefined; // хранящееся значение
    private _left: Block<T> | undefined; // ссылка на левую ветку (блок)
    private _right: Block<T> | undefined; // ссылка на правую ветку (блок)
    // Получение значения блока
    public getValue(): T | undefined {
        return this._value;
    }
    // Установка значения блока
    public setValue(value: T | undefined): void {
        this._value = value;
    }
    // Получение ссылки на левую ветку (блок)
    public getLeft(): Block<T> | undefined {
        return this._left;
    }
    // Установка ссылки на левую ветку (блок)
    public setLeft(left: Block<T> | undefined): void {
        this._left = left;
    }
    // Получение ссылки на правую ветку (блок)
    public getRight(): Block<T> | undefined {
        return this._right;
    }
    // Установка ссылки на правую ветку (блок)
    public setRight(right: Block<T> | undefined): void {
        this._right = right;
    }
}
