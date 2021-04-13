import { Tree } from "./Tree.js";

// tslint:disable-next-line:typedef
function checkWork() {
    const tree: Tree<number> = new Tree<number>();

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
    console.log(tree.findBlock(7)?.getValue());

    const tree2: Tree<string> = new Tree<string>();

    tree2.insertBlock("sdfsdf");
    tree2.insertBlock("sgsasd");
    tree2.insertBlock("sddddd");

    console.log(tree2.findBlock("sddddd"));
}

checkWork();
