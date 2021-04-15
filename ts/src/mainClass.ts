import readlineSync from "readline-sync";
import { TreeClass } from "./treeClass.js";

const tree: TreeClass<number> = new TreeClass<number>();

console.log("1) Для добавления элемента в дерево введите \"insert value\", где value - значение для вставки");
console.log("2) Для удаления элемента из дерева введите \"delete value\", где value - удаляемый элемент");
console.log("3) Для поиска элемента в дереве введите \"find value\", где value - нужный элемент");
console.log("4) Для вывода всего дерева введите \"print\"");
console.log("5) Для завершения введите \"exit\"");

readlineSync.promptCLLoop({
    insert: function(value: string): void {
        tree.insertBlock(Number(value));
    },
    delete: function(value: string): void {
        tree.deleteBlock(Number(value));
    },
    find: function(value: string): void {
      console.log(tree.findBlock(Number(value)));
    },
    print: function(): void {
        tree.printTree();
    },
    exit: function(): boolean {
        return true;
    }
});

/*
function checkWork(): void {
    const tr1: TreeClass<number> = new TreeClass<number>();


    tr1.insertBlock(3);
    tr1.insertBlock(7);
    tr1.insertBlock(1);
    tr1.insertBlock(5);
    tr1.insertBlock(2);

    console.log("printTree before deleteBlock: ");
    tr1.printTree();
    tr1.deleteBlock(2);
    console.log("printTree after deleteBlock: ");
    tr1.printTree();

    console.log(tr1.findBlock(7));
    console.log(tr1.findBlock(7)?.getValue());

    const tr2: TreeClass<string> = new TreeClass<string>();

    tr2.insertBlock("sdfsdf");
    tr2.insertBlock("sgsasd");
    tr2.insertBlock("sddddd");

    console.log(tr2.findBlock("sddddd"));
}

checkWork();
*/
