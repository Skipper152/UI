import { BlockClass } from "./blockClass.js";

export class TreeClass<T> {
    private _rootBlock: BlockClass<T> | undefined; // узел дерева
    private _size: number; // количество элементов в дереве

    constructor() {
        this._rootBlock = undefined;
        this._size = 0;
    }
    // 1. Добавление элементов
    public insertBlock(value: T): void {
        const newBlock: BlockClass<T> = new BlockClass<T>(); // создание нового блока
        newBlock.setValue(value); // вставка значение
        if (this._rootBlock === undefined) { // если корневого узла не существует, то задается корневой узел
            this._rootBlock = newBlock;
        } else { // если корневой узел уже существует, то начинаем искать место, куда вставить новый элемент
            let currentBlock: BlockClass<T> | undefined = this._rootBlock;
            let rootBlock: BlockClass<T>;
            while (true) {
                rootBlock = currentBlock;
                if (value === currentBlock.getValue()) { // если добавляемый элемент уже есть в дереве, то не добавляем его
                    return;
                    // tslint:disable-next-line:unnecessary-else
                } else if (currentBlock?.getValue() !== undefined && value < (<T>currentBlock?.getValue())) { // решаем в какую сторону необходимо идти, если этот блок true, то идем влево
                    currentBlock = currentBlock.getLeft();
                    if (currentBlock === undefined) { // если дошли до конца, то вставляем элемент слева и выходим из метода
                        this._size++;
                        rootBlock.setLeft(newBlock);
                        return;
                    }
                } else { // в данном случае идем вправо
                    currentBlock = currentBlock.getRight();
                    if (currentBlock === undefined) { // если дошли до конца, то вставляем элемент справа и выходим из метода
                        this._size++;
                        rootBlock.setRight(newBlock);
                        return;
                    }
                }
            }
        }
    }
    // 2. Поиск элемента в дереве
    public findBlock(value: T): BlockClass<T> | undefined {
        let currentBlock: BlockClass<T> | undefined = this._rootBlock;
        while (value !== currentBlock?.getValue()) {
            currentBlock = value < (<T>currentBlock?.getValue()) ? currentBlock?.getLeft() : currentBlock?.getRight();
            if (currentBlock === undefined) {
                return undefined;
            }
        }
        return currentBlock;
    }
    // 3. Удаление элемента
    public deleteBlock(value: T): boolean {
        let currentBlock: BlockClass<T> | undefined = this._rootBlock;
        let rootBlock: BlockClass<T> | undefined = this._rootBlock;
        let isLeft: boolean = true;

        while (value !== currentBlock?.getValue()) { // поиск необходимого блока
            rootBlock = currentBlock;
            if (value < (<T>currentBlock?.getValue())) { // если true, двигаемся влево
                isLeft = true;
                currentBlock = currentBlock?.getLeft();
            } else { // иначе вправо
                isLeft = false;
                currentBlock = currentBlock?.getRight();
            }
            if (currentBlock === undefined) { // если блок не найден, то выходим из метода
                return false;
            }
        }
        if (currentBlock.getLeft() === undefined && currentBlock.getRight() === undefined) { // если блок в ветке последний, то он просто удаляется
            if (currentBlock === this._rootBlock) { // если этот блок равен корневому узлу, то дерево очищается
                this._rootBlock = undefined;
            } else if (isLeft) {
                rootBlock?.setLeft(undefined); // иначе удаляем этот узел
            } else {
                rootBlock?.setRight(undefined);
            }
        } else if (currentBlock.getRight() === undefined) { // если правая ветка пустая, то узел заменяется блоком с левой ветки
            if (currentBlock === this._rootBlock) {
                this._rootBlock = currentBlock.getLeft();
            } else if (isLeft) {
                rootBlock?.setLeft(currentBlock.getLeft());
            } else {
                rootBlock?.setRight(currentBlock.getLeft());
            }
        } else if (currentBlock.getLeft() === undefined) { // аналогичная ситуация, только левая ветка заменяется блоком с правой
            if (currentBlock === this._rootBlock) {
                this._rootBlock = currentBlock.getRight();
            } else if (isLeft) {
                rootBlock?.setLeft(currentBlock.getRight());
            } else {
                rootBlock?.setRight(currentBlock.getRight());
            }
        } else { // если есть и правая и левая ветки, то нужно выбрать подходящую замену для удаляемого узла
            const replacement: BlockClass<T> | undefined = this.receiveReplacement(currentBlock); // поиск замены осуществляется с помощью метода receiveReplacement
            if (currentBlock === this._rootBlock) {
                this._rootBlock = replacement;
            } else if (isLeft) {
                rootBlock?.setLeft(replacement);
            } else {
                rootBlock?.setRight(replacement);
            }
        }
        return true; // если удаление успешно, то возвращаем true
    }
    // Поиск замены для удаляемого элемента
    private receiveReplacement(block: BlockClass<T>): BlockClass<T> | undefined {
        let rootBlock: BlockClass<T> = block;
        let replacementBlock: BlockClass<T> = block;
        let currentBlock: BlockClass<T> | undefined = block.getRight(); // берем правую ветку и проходимся по ней
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
    }
    // 4. Вывод всего дерева
    public printTree(): void {
        const values: Array<BlockClass<T> | undefined> = []; // общий стек значений дерева
        values.push(this._rootBlock);
        let gaps: number = 64; // начальное значение расстояния между элементами
        let isRowEmpty: boolean = false;
        // Отделяем дерево от остального вывода, чтобы было нагляднее
        const line: string = "######################################################### Your TreeClass ##############################################################\n";
        console.log(line);
        while (!isRowEmpty) {
            let str1: string = "";
            const local: Array<BlockClass<T> | undefined> = []; // локальный стек для задания потомков элемента
            isRowEmpty = true;
            for (let i = 0; i < gaps; i++) {
                str1 += " ";
            }
            while (values.length !== 0) { // цикл выоплняется,пока общий стек значений дерева не пустой
                const temp: BlockClass<T> | undefined = values.pop(); // берем следующий, при этом удаляя его из стека
                if (temp !== undefined) {
                    str1 += temp.getValue();
                    local.push(temp.getLeft()); // сохраняем в локальный стек, наследники текущего элемента
                    local.push(temp.getRight());
                    if (temp.getLeft() !== undefined || temp.getRight() !== undefined) {
                        isRowEmpty = false;
                    }
                } else {
                    str1 += "**";
                    local.push(undefined);
                    local.push(undefined);
                }
                for (let j = 0; j < gaps * 2 - 2; j++) {
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
        const line2: string = "\n##################################################################################################################################";
        console.log(line2);
    }
}
