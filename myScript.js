let maxItemsPerPage = 3;
let currentItemsOnLastPage = 0;
let currentPage = 1;
let lastPage = 1;

function add() {
  let inside = document.getElementById("input").value;
  const txtnode = document.createTextNode(inside);

  const newDiv = document.createElement("div");
  newDiv.className = "content";
  const todoList = document.getElementById("child");

  if (inside.trim()) {
    let newJob = document.createElement("li");
    newJob.className = "list-group-item flex-fill bd-highlight";
    newJob.appendChild(txtnode);
    newJob.id = "target";
    todoList.appendChild(newDiv);
    newDiv.appendChild(newJob);

    currentItemsOnLastPage += 1;

    //cheks if new navigation buttons are needed
    pageCheker(newJob);
    //creates new edit button
    addEdit(newDiv);
    //creates new delete button
    addDelete(newDiv);
  } else {
    alert("You can't leave input empty");
  }
  document.getElementById("input").value = "";
}

//cheks if new navigation buttons are needed
function pageCheker(extraJob) {
  let myElement = document.getElementById("child");

  let jobs = myElement.children.length;

  if (jobs > maxItemsPerPage) {
    ////////////// !!!fix adding while on latest page bug!!! ////////////
    if (currentItemsOnLastPage > maxItemsPerPage) {
      extraJob.parentElement.className = "content hideme";
      addNavigator();
    } else if (lastPage == currentPage) {
      extraJob.parentElement.className = "content showme";
    } else {
      extraJob.parentElement.className = "content hideme";
    }
  }
}

function addNavigator() {
  const newPage = document.createElement("li"); // creates new button

  newPage.id = `${lastPage + 1}`; // assings ID one greater than the previus button
  newPage.innerHTML = `${lastPage + 1}`; // assings Number one greater than the previus button
  newPage.className = "page-item page-link";

  newPage.addEventListener("click", split); //onclick only shows jobs that should be on that page
  newPage.addEventListener("click", clear); //onclick hides all other list items(jobs)

  const Parent = document.getElementById("pageBtns");
  Parent.appendChild(newPage);

  currentItemsOnLastPage = 1;
  lastPage += 1;
}

function handlerDelete() {
  this.parentElement.remove();
}

function page1Func() {
  let firstBtn = document.getElementById("1");

  firstBtn.addEventListener("click", split);
  firstBtn.addEventListener("click", clear);
}

function split() {
  let myElement = document.getElementById("child");
  for (
    i = maxItemsPerPage * (this.id - 1);
    i < maxItemsPerPage * this.id;
    i++
  ) {
    myElement.children[i].className = "content showme";
    //myElement.children[i].innerHTML = this.id;
    //myElement.children[i].className = "showme";
    currentPage = this.id;

    for (let i = 0; i < lastPage; i++) {
      this.parentElement.children[i].className = "page-item page-link";
      this.className = "page-item page-link currentPage";
    }
  }
}

function clear() {
  let myElement = document.getElementById("child");
  //makes all before invisible
  for (let i = 0; i < maxItemsPerPage * (this.id - 1); i++) {
    myElement.children[i].className = "content hideme";
  }
  //makes all after invisible
  for (let i = maxItemsPerPage * this.id; i < myElement.children.length; i++) {
    myElement.children[i].className = "content hideme";
  }
}
function handlerEdit() {
  if (this.innerHTML === "edit") {
    let existingTxt = this.parentElement.querySelector("#target").innerHTML;
    this.parentElement.querySelector("#target").remove();
    let newInput = document.createElement("input");
    newInput.className = "list-group-item flex-fill bd-highlight";
    newInput.id = "target";
    newInput.value = existingTxt;
    this.parentElement.insertBefore(newInput, this.parentElement.childNodes[0]);
    this.innerHTML = "save";
  } else {
    let newTxt = this.parentElement.querySelector("#target").value;
    if (newTxt.trim()) {
      this.parentElement.querySelector("#target").remove();
      let newJob = document.createElement("li");
      newJob.className = "list-group-item flex-fill bd-highlight";
      newJob.id = "target";
      newJob.appendChild(document.createTextNode(newTxt));
      this.parentElement.insertBefore(newJob, this.parentElement.childNodes[0]);
      this.innerHTML = "edit";
    } else {
      this.parentElement.remove();
    }
  }
}

function empty() {
  const elements = document.getElementsByClassName("content");
  while (elements.length > 0) elements[0].remove();

  let pageBtns = document.getElementById("pageBtns");

  while (pageBtns.children.length > 1) {
    pageBtns.children[1].remove();
    currentPage = 1;
    lastPage = 1;
  }
}

function moveLeft() {
  if (currentPage != 1) {
    document.getElementById(`${currentPage - 1}`).click();
  }
}

//clicks the next button
function moveRight() {
  if (currentPage != lastPage) {
    document.getElementById(`${Number(currentPage) + 1}`).click();
  }
}

function enter(event) {
  let x = event.keyCode;
  if (x === 13) {
    add();
  }
}

//creates new delete button
function addDelete(parentDIV) {
  const newDelete = document.createElement("button");
  newDelete.appendChild(document.createTextNode("Delete"));
  newDelete.className = "btn btn-outline-secondary";
  newDelete.addEventListener("click", handlerDelete);
  parentDIV.appendChild(newDelete);
}

//creates new edit button
function addEdit(parentDIV) {
  const newEdit = document.createElement("button");
  newEdit.appendChild(document.createTextNode("edit"));
  newEdit.className = "btn btn-outline-secondary";
  newEdit.addEventListener("click", handlerEdit);
  parentDIV.appendChild(newEdit);
}

/* not cool yo
function addJob(parentDIV, inputTXT) {
  let newJob = document.createElement("li");
  newJob.className = "list-group-item flex-fill bd-highlight";
  //newJob.id = "target";
  newJob.appendChild(inputTXT);
  parentDIV.appendChild(newJob);

}
*/

/*
  
  const txtnode = document.createTextNode(inside);
  const newDiv = document.createElement("div");
  newDiv.className = "content";
  const todoList = document.getElementById("child");

  if (inside.trim()) {
    todoList.appendChild(newDiv);
    addJob(newDiv, node);
    addEdit(newDiv);
    addDelete(newDiv);
  } else {
    alert("You can't leave input empty");
  }

  document.getElementById("input").value = "";
}

*/

/*
function addJob(parentDIV, inputTXT) {
  let newJob = document.createElement("span");
  newJob.className = "job";
  newJob.id = "target";
  newJob.appendChild(inputTXT);
  parentDIV.appendChild(newJob);

  currentItemsOnLastPage += 1;

  ////////////////page checker///////////////
  let myElement = document.getElementById("child");

  let jobs = myElement.children.length;

  if (jobs > maxItemsPerPage) {
    ////////////// !!!fix adding while on latest page bug!!! ////////////
    if (currentItemsOnLastPage > maxItemsPerPage) {
      newJob.parentElement.className = "content hideme";
      addNavigator();
    } else if (lastPage == currentPage) {
      newJob.parentElement.className = "content showme";
    } else {
      newJob.parentElement.className = "content hideme";
    }
  }
  ////////////////page checker///////////////
}

*/
