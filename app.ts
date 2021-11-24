class Matrix {
  mat: HTMLElement;
  columns: number;
  lines: number;
  btns: NodeListOf<HTMLButtonElement>;
  cellContainer: HTMLElement;

  constructor(i: number) {
    this.columns = 2;
    this.lines = 2;
    this.mat = document.querySelector(`#mat-${i}`) as HTMLElement;
    this.btns = this.mat.querySelectorAll(".btn");
    this.cellContainer = this.mat.querySelector(
      ".cell-container"
    ) as HTMLElement;
  }
}

let mat1: Matrix = new Matrix(1);
let mat2: Matrix = new Matrix(2);
let matr = {
  mat: document.querySelector("#mat-3"),
  lines: mat1.lines,
  columns: mat2.columns,
  elem: [
    [0, 0],
    [0, 0],
  ],
};

displayMat(mat1);
setupBtns(mat1);
displayMat(mat2);
setupBtns(mat2);

function setupBtns(mat: Matrix) {
  mat.btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const btn = e.target as HTMLButtonElement;
      if (btn.classList.contains("line-btn")) {
        if (btn.innerText === "+") {
          mat.lines += 1;
        } else if (mat.lines > 1) {
          mat.lines -= 1;
        }
      } else {
        if (btn.innerText === "+") {
          mat.columns += 1;
        } else if (mat.columns > 1) {
          mat.columns -= 1;
        }
      }
      displayMat(mat);
    });
  });
}

function displayMat(mat: Matrix) {
  const elemArr = makeElemArr(mat);

  mat.cellContainer.innerHTML = "";
  mat.cellContainer.style.gridTemplateColumns = `repeat(${mat.columns},1fr)`;
  mat.cellContainer.style.gridTemplateRows = `repeat(${mat.lines},1fr)`;
  let spanLines = mat.mat.querySelector(".btn-container-lines span");
  (spanLines as HTMLSpanElement).innerHTML = mat.lines.toString();
  let spanColumns = mat.mat.querySelector(".btn-container-col span");
  (spanColumns as HTMLSpanElement).innerHTML = mat.columns.toString();

  for (let i = 0; i < mat.lines; i++) {
    for (let j = 0; j < mat.columns; j++) {
      const newCell = document.createElement("input");
      newCell.classList.add("cell");

      if (typeof elemArr[i][j] === "number") {
        newCell.value = elemArr[i][j].toString();
      }

      mat.cellContainer.appendChild(newCell);
    }
  }
  displayResultMat();
}

function makeElemArr(mat: Matrix): number[][] {
  let arr: number[][] = [];
  const inputs: NodeListOf<HTMLInputElement> =
    mat.mat.querySelectorAll(".cell");

  if (inputs.length === 0) {
    let a: any[] = [];
    for (let i = 0; i < mat.lines; i++) {
      let temp = [];
      for (let j = 0; j < mat.columns; j++) {
        temp.push(0);
      }
      a.push(temp);
    }
    return a;
  }

  let k = 0;
  for (let i = 0; i < mat.lines; i++) {
    let tempArr = [];
    for (let j = 0; j < mat.columns; j++) {
      if (inputs[k]) {
        tempArr.push(parseInt(inputs[k].value));
        k++;
      } else {
        tempArr.push(0);
        k++;
      }
    }
    arr.push(tempArr);
  }

  // console.log(arr);
  return arr;
}

function displayResultMat() {
  const cellsContiner = matr.mat?.querySelector(
    ".cell-container"
  ) as HTMLElement;
  if (mat1.columns != mat2.lines) {
    cellsContiner.innerHTML = "Nu se poate face inmultirea";
    // makeElemArr(mat1);
  } else {
    matr.lines = mat1.lines;
    matr.columns = mat2.columns;
    let arr1 = makeElemArr(mat1);
    let arr2 = makeElemArr(mat2);
    // console.log(arr1, arr2);
    matr.elem = [];

    for (let i = 0; i < matr.lines; i++) {
      const arr: number[] = [];
      for (let j = 0; j < matr.columns; j++) {
        arr.push(0);
      }
      matr.elem.push(arr);
    }

    for (let i = 0; i < matr.lines; i++) {
      for (let j = 0; j < matr.columns; j++) {
        matr.elem[i][j] = 0;
        for (let k = 0; k < matr.lines; k++) {
          arr2[k][j];
          matr.elem[i][j] += arr1[i][k] * arr2[k][j];
        }
      }
    }
    cellsContiner.style.gridTemplateColumns = `repeat(${matr.columns},1fr)`;
    cellsContiner.style.gridTemplateRows = `repeat(${matr.lines},1fr)`;
    cellsContiner.innerHTML = "";

    for (let i = 0; i < matr.elem.length; i++) {
      for (let j = 0; j < matr.elem[0].length; j++) {
        const newCell = document.createElement("input");
        newCell.classList.add("cell");
        newCell.value = matr.elem[i][j].toString();
        cellsContiner.appendChild(newCell);
      }
    }
  }
}

(document.querySelector("#da") as HTMLButtonElement).addEventListener(
  "click",
  (e) => {
    displayResultMat();
  }
);
