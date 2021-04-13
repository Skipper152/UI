var Block = /** @class */ (function () {
    function Block() {
    }
    // Получение значения блока
    Block.prototype.getValue = function () {
        return this._value;
    };
    // Установка значения блока
    Block.prototype.setValue = function (value) {
        this._value = value;
    };
    // Получение ссылки на левую ветку (блок)
    Block.prototype.getLeft = function () {
        return this._left;
    };
    // Установка ссылки на левую ветку (блок)
    Block.prototype.setLeft = function (left) {
        this._left = left;
    };
    // Получение ссылки на правую ветку (блок)
    Block.prototype.getRight = function () {
        return this._right;
    };
    // Установка ссылки на правую ветку (блок)
    Block.prototype.setRight = function (right) {
        this._right = right;
    };
    return Block;
}());
export { Block };
