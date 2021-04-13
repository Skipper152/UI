import { Block } from "./Block.js";
var Tree = /** @class */ (function () {
    function Tree() {
        this._rootBlock = undefined;
        this._size = 0;
    }
    // 1. Добавление элементов
    Tree.prototype.insertBlock = function (value) {
        var newBlock = new Block(); // создание нового блока
        newBlock.setValue(value); // вставка значение
        if (this._rootBlock === undefined) { // если корневого узла не существует, то задается корневой узел
            this._rootBlock = newBlock;
        }
        else { // если корневой узел уже существует, то начинаем искать место, куда вставить новый элемент
            var currentBlock = this._rootBlock;
            var rootBlock = void 0;
            while (true) {
                rootBlock = currentBlock;
                if (value === currentBlock.getValue()) { // если добавляемый элемент уже есть в дереве, то не добавляем его
                    return;
                }
                else if ((currentBlock === null || currentBlock === void 0 ? void 0 : currentBlock.getValue()) !== undefined && value < (currentBlock === null || currentBlock === void 0 ? void 0 : currentBlock.getValue())) { // решаем в какую сторону необходимо идти, если этот блок true, то идем влево
                    currentBlock = currentBlock.getLeft();
                    if (currentBlock === undefined) { // если дошли до конца, то вставляем элемент слева и выходим из метода
                        this._size++;
                        rootBlock.setLeft(newBlock);
                        return;
                    }
                }
                else { // в данном случае идем вправо
                    currentBlock = currentBlock.getRight();
                    if (currentBlock === undefined) { // если дошли до конца, то вставляем элемент справа и выходим из метода
                        this._size++;
                        rootBlock.setRight(newBlock);
                        return;
                    }
                }
            }
        }
    };
    // 2. Поиск элемента в дереве
    Tree.prototype.findBlock = function (value) {
        var currentBlock = this._rootBlock;
        while (value !== (currentBlock === null || currentBlock === void 0 ? void 0 : currentBlock.getValue())) {
            currentBlock = value < (currentBlock === null || currentBlock === void 0 ? void 0 : currentBlock.getValue()) ? currentBlock === null || currentBlock === void 0 ? void 0 : currentBlock.getLeft() : currentBlock === null || currentBlock === void 0 ? void 0 : currentBlock.getRight();
            if (currentBlock === undefined) {
                return undefined;
            }
        }
        return currentBlock;
    };
    // 3. Удаление элемента
    Tree.prototype.deleteBlock = function (value) {
        var currentBlock = this._rootBlock;
        var rootBlock = this._rootBlock;
        var isLeft = true;
        while (value !== (currentBlock === null || currentBlock === void 0 ? void 0 : currentBlock.getValue())) { // поиск необходимого блока
            rootBlock = currentBlock;
            if (value < (currentBlock === null || currentBlock === void 0 ? void 0 : currentBlock.getValue())) { // если true, двигаемся влево
                isLeft = true;
                currentBlock = currentBlock === null || currentBlock === void 0 ? void 0 : currentBlock.getLeft();
            }
            else { // иначе вправо
                isLeft = false;
                currentBlock = currentBlock === null || currentBlock === void 0 ? void 0 : currentBlock.getRight();
            }
            if (currentBlock === undefined) { // если блок не найден, то выходим из метода
                return false;
            }
        }
        if (currentBlock.getLeft() === undefined && currentBlock.getRight() === undefined) { // если блок в ветке последний, то он просто удаляется
            if (currentBlock === this._rootBlock) { // если этот блок равен корневому узлу, то дерево очищается
                this._rootBlock = undefined;
            }
            else if (isLeft) {
                rootBlock === null || rootBlock === void 0 ? void 0 : rootBlock.setLeft(undefined); // иначе удаляем этот узел
            }
            else {
                rootBlock === null || rootBlock === void 0 ? void 0 : rootBlock.setRight(undefined);
            }
        }
        else if (currentBlock.getRight() === undefined) { // если правая ветка пустая, то узел заменяется блоком с левой ветки
            if (currentBlock === this._rootBlock) {
                this._rootBlock = currentBlock.getLeft();
            }
            else if (isLeft) {
                rootBlock === null || rootBlock === void 0 ? void 0 : rootBlock.setLeft(currentBlock.getLeft());
            }
            else {
                rootBlock === null || rootBlock === void 0 ? void 0 : rootBlock.setRight(currentBlock.getLeft());
            }
        }
        else if (currentBlock.getLeft() === undefined) { // аналогичная ситуация, только левая ветка заменяется блоком с правой
            if (currentBlock === this._rootBlock) {
                this._rootBlock = currentBlock.getRight();
            }
            else if (isLeft) {
                rootBlock === null || rootBlock === void 0 ? void 0 : rootBlock.setLeft(currentBlock.getRight());
            }
            else {
                rootBlock === null || rootBlock === void 0 ? void 0 : rootBlock.setRight(currentBlock.getRight());
            }
        }
        else { // если есть и правая и левая ветки, то нужно выбрать подходящую замену для удаляемого узла
            var replacement = this.receiveReplacement(currentBlock); // поиск замены осуществляется с помощью метода receiveReplacement
            if (currentBlock === this._rootBlock) {
                this._rootBlock = replacement;
            }
            else if (isLeft) {
                rootBlock === null || rootBlock === void 0 ? void 0 : rootBlock.setLeft(replacement);
            }
            else {
                rootBlock === null || rootBlock === void 0 ? void 0 : rootBlock.setRight(replacement);
            }
        }
        return true; // если удаление успешно, то возвращаем true
    };
    // Поиск замены для удаляемого элемента
    Tree.prototype.receiveReplacement = function (block) {
        var rootBlock = block;
        var replacementBlock = block;
        var currentBlock = block.getRight(); // берем правую ветку и проходимся по ней
        while (currentBlock !== undefined) {
            rootBlock = replacementBlock;
            replacementBlock = currentBlock;
            currentBlock = currentBlock.getLeft();
        }
        if (replacementBlock !== block.getRight()) {
            rootBlock.setLeft(replacementBlock.getRight());
            replacementBlock.setRight(block.getRight());
        }
        return replacementBlock; // возвращаем замену
    };
    // 4. Вывод всего дерева
    Tree.prototype.printTree = function () {
        var values = []; // общий стек значений дерева
        values.push(this._rootBlock);
        var gaps = 64; // начальное значение расстояния между элементами
        var isRowEmpty = false;
        // Отделяем дерево от остального вывода, чтобы было нагляднее
        var line = "######################################################### Your Tree ##############################################################\n";
        console.log(line);
        while (!isRowEmpty) {
            var str1 = "";
            var local = []; // локальный стек для задания потомков элемента
            isRowEmpty = true;
            for (var i = 0; i < gaps; i++) {
                str1 += " ";
            }
            while (values.length !== 0) { // цикл выоплняется,пока общий стек значений дерева не пустой
                var temp = values.pop(); // берем следующий, при этом удаляя его из стека
                if (temp !== undefined) {
                    str1 += temp.getValue();
                    local.push(temp.getLeft()); // сохраняем в локальный стек, наследники текущего элемента
                    local.push(temp.getRight());
                    if (temp.getLeft() !== undefined || temp.getRight() !== undefined) {
                        isRowEmpty = false;
                    }
                }
                else {
                    str1 += "**";
                    local.push(undefined);
                    local.push(undefined);
                }
                for (var j = 0; j < gaps * 2 - 2; j++) {
                    str1 += " ";
                }
            }
            str1 += "\n";
            console.log(str1);
            str1 = "";
            gaps /= 2; // при переходе на следующий уровень расстояние между элементами каждый раз уменьшается, для красивого отображения
            while (local.length !== 0) {
                values.push(local.pop()); // перемещаем все элементы из локального стека в глобальный
            }
        }
        var line2 = "\n##################################################################################################################################";
        console.log(line2);
    };
    return Tree;
}());
export { Tree };
