let count = 0;
let arr = [];
function calculate_equation() {
    let a = document.result.coef_a.value;
    let b = document.result.coef_b.value;
    let c = document.result.coef_c.value;

    if (validation(a, b, c)) {
        let d = b * b - 4 * a * c;
        let res;
        let x1;
        let x2;
        let eq;
        if (d < 0) {
            res = "Пара комплексно-сопряженных корней";
            x1 = "(" + -b / (2 * a) + ", " + Math.sqrt(-d) / (2 * a) + ")";
            x2 = "(" + -b / (2 * a) + ", " + -Math.sqrt(-d) / (2 * a) + ")";
            eq = a + "&middot;x<sup>2</sup> + " + b + "&middot;x + " + c + " = 0";
        } else if (d >= 0) {
            if (d === 0) {
                res = "Два одинаковых вещественных корня";
                x1 = x2 = -b / (2 * a);
                eq = a + "&middot;x<sup>2</sup> + " + b + "&middot;x + " + c + " = 0";
            } else {
                res = "Два различных вещественных корня";
                x1 = -b / (2 * a) - Math.sqrt(d) / (2 * a);
                x2 = -b / (2 * a) + Math.sqrt(d) / (2 * a);
                eq = a + "&middot;x<sup>2</sup> + " + b + "&middot;x + " + c + " = 0";
            }
        }

        arr[count] = [res, x1, x2, eq];

        insertNewRow(res, x1, x2, eq);
        deleteRow("result_table", "hoverRow", "clickedRow");
    }
}

function validation(a, b, c) {
    if (isNaN(a) || isNaN(b) || isNaN(c) ||
        a === '' || b === '' || c === '') {
        document.getElementById('target').innerHTML = "Incorrect input!";
        return false;
    }
    document.getElementById('target').innerHTML = '';
    return true;
}

function insertNewRow(res, x1, x2, eq) {
    let tbody = document.getElementById('result_table').getElementsByTagName('TBODY')[0];

    // Создаем строку таблицы и добавляем ее
    let row = document.createElement("TR");
    tbody.appendChild(row);

    // Создаем ячейки в вышесозданной строке
    let td1 = document.createElement("TD");
    let td2 = document.createElement("TD");
    let td3 = document.createElement("TD");
    let td4 = document.createElement("TD");

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);

    // Заполняем ячейки
    td1.innerHTML = res;
    td2.innerHTML = x1;
    td3.innerHTML = x2;
    td4.innerHTML = eq;

    row.id = count;

    if (count % 2 === 0) {
        row.style.backgroundColor = '#0a6bab';
        row.style.color = '#dbdbdb';
    }
    count++;
}

function deleteRow(tabName, hoverClass, clickClass) {

    let table = document.getElementById(tabName);

    let hoverClassReg = new RegExp("\\b"+hoverClass+"\\b");
    table.onmouseover = table.onmouseout = function(e) {
        if (!e) e = window;
        let elem = e.target;

        if (elem.parentNode.tagName === 'TR' && elem.parentNode.parentNode.tagName === 'TBODY') {
            let row = elem.parentNode;
            if (!row.getAttribute('clickedRow')) {
                row.className = e.type === "mouseover" ? row.className +
                    " " + hoverClass : row.className.replace(hoverClassReg, " ");
            }
        }
    };

    if (clickClass) table.onclick = function(e) {
        if (!e) e = window;
        let elem = e.target;

        if (elem.parentNode.tagName === 'TR' && elem.parentNode.parentNode.tagName === 'TBODY') {
            arr.splice(elem.id, 1);
            let tbody = document.getElementById(tabName).getElementsByTagName('TBODY')[0];
            tbody.remove()
            count = 0;
            tbody = document.createElement('TBODY');
            table.appendChild(tbody);
            for(let rowCount = 0; rowCount < arr.length; rowCount++) {
                insertNewRow(arr[rowCount][0], arr[rowCount][1], arr[rowCount][2], arr[rowCount][3]);
            }
        }
    };
}