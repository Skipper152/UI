import { Tree } from "./Tree.js";
// tslint:disable-next-line:typedef
function checkWork() {
    var _a;
    var tree = new Tree();
    tree.insertBlock(3);
    tree.insertBlock(7);
    tree.insertBlock(1);
    tree.insertBlock(5);
    tree.insertBlock(2);
    console.log("printTree before deleteBlock: ");
    tree.printTree();
    tree.deleteBlock(2);
    console.log("printTree after deleteBlock: ");
    tree.printTree();
    console.log(tree.findBlock(7));
    console.log((_a = tree.findBlock(7)) === null || _a === void 0 ? void 0 : _a.getValue());
    var tree2 = new Tree();
    tree2.insertBlock("sdfsdf");
    tree2.insertBlock("sgsasd");
    tree2.insertBlock("sddddd");
    console.log(tree2.findBlock("sddddd"));
}
checkWork();
