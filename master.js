let add = document.querySelector("#add");
let removeAll = document.querySelector("#removeAll");
let remove1 = document.querySelector("#remove");
let section = document.querySelector(".section");
let sectionTwo = document.querySelector(".sectionTwo");
let cancel = document.querySelector("#cancel");
let save = document.querySelector("#save");
let mode = document.querySelector("#mode");
let title = document.querySelector("#title");
let notes = document.querySelector("#notes");
let time = document.querySelector("#time");
let task = document.querySelector("#f");
let taskR = document.querySelector(".task");
let  taskH2 = document.querySelector(".task h2");
let done = document.querySelector("#done");
let red = document.querySelector("#red");
// array
let tasksArray = [];
// from local storage to array
if (localStorage.tasks != null) {
  tasksArray = JSON.parse(localStorage.getItem("tasks"));
  removeAll.style.display = "block";
} else {
  tasksArray = [];
  removeAll.style.display = "none";
}

//
if (tasksArray.length== length) {
  removeAll.style.display = "none";
} 
add.addEventListener("click", function () {
  add.style.cssText = "display:none;";
  removeAll.style.cssText = "display:none;";
  sectionTwo.style.cssText = "display:block;";
  section.style.cssText = "display:none;";
  task.style.cssText = "display:none;";
});

save.addEventListener("click", function () {
  if (title.value === "") {
    Swal.fire({
      title: "NO Task To Add !",
      confirmButtonColor: " rgba(84, 14, 154, 0.522)",
    });
  } else {
    obj = {
      title: title.value,
      notes: notes.value ,
      time: time.value,
    };
    tasksArray.push(obj);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    show();

    sectionTwo.style.cssText = " display:none;";
    section.style.cssText = "display:flex;";
    add.style.cssText = "display:block;";
    removeAll.style.cssText = "display:block;";
    task.style.cssText = "display:inline-block;";

    title.value = "";
    notes.value = "";
    time.value = "";
  }
});
// show function
function show() {
  task.innerHTML = ``;

  for (let i = 0; i < tasksArray.length; i++) {
    task.innerHTML += `   
  <div class="task">
    <h1>${tasksArray[i].title}</h1>
    <h2>${tasksArray[i].notes}</h2>
    <h2>${tasksArray[i].time}</h2>

<span onclick=remove(${i})>Remove</span>
  </div>`;
  }
}

// cancel button
cancel.addEventListener("click", function () {
  sectionTwo.style.cssText = "display:none;";
  section.style.cssText = "display:flex;";
  add.style.cssText = "display:block;";
  removeAll.style.cssText = "display:block;";
  document.body.style.cssText = "background-color:none;";
  task.style.cssText = "display:block;";
  title.value = "";
  time.value = "";
  notes.value = "";


  if (tasksArray.length== length) {
    removeAll.style.display = "none";
  } 
});
// dark mode
mode.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  mode.classList.toggle("darkMode");
});
// removeAll button
removeAll.addEventListener("click", function () {
  Swal.fire({
    text: "Delete All ?",
    showCancelButton: true,
    confirmButtonColor: "rgba(84, 14, 154, 0.522)",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Your tasks has been deleted",
        confirmButtonColor: "rgba(84, 14, 154, 0.522)",
      });
      tasksArray.splice(0);
      localStorage.clear();
      show();
      removeAll.style.display = "none";
    }
  });
});

// remove one task

function remove(i) {
  tasksArray.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
    show();

  if (tasksArray.length== length) {
    removeAll.style.display = "none";
  } 
}

show();
