export class BlockClass<T> {
    private _value: T | undefined; // хранящееся значение
    private _left: BlockClass<T> | undefined; // ссылка на левую ветку (блок)
    private _right: BlockClass<T> | undefined; // ссылка на правую ветку (блок)
    // Получение значения блока
    public getValue(): T | undefined {
        return this._value;
    }
    // Установка значения блока
    public setValue(value: T | undefined): void {
        this._value = value;
    }
    // Получение ссылки на левую ветку (блок)
    public getLeft(): BlockClass<T> | undefined {
        return this._left;
    }
    // Установка ссылки на левую ветку (блок)
    public setLeft(left: BlockClass<T> | undefined): void {
        this._left = left;
    }
    // Получение ссылки на правую ветку (блок)
    public getRight(): BlockClass<T> | undefined {
        return this._right;
    }
    // Установка ссылки на правую ветку (блок)
    public setRight(right: BlockClass<T> | undefined): void {
        this._right = right;
    }
}
