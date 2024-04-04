let add = document.querySelector("#add");
let removeAll = document.querySelector("#removeAll");
let remove1 = document.querySelector("#remove");
let section = document.querySelector(".section");
let sectionTwo = document.querySelector(".sectionTwo");
let cancel = document.querySelector("#cancel");
let save = document.querySelector("#save");
let mode = document.querySelector("#mode");
let title = document.querySelector("#title");
let time = document.querySelector("#time");
let task = document.querySelector("#f");


let tasksArray=[];
// from local storage to array
if (localStorage.tasks != null) {
  tasksArray = JSON.parse(localStorage.getItem("tasks"));
}
else{
     tasksArray = [];
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
    let obj = {
      title: title.value,
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
    time.value = "";
  }
});
// show function
function show() {
  task.innerHTML = ``;

  for (let i = 0; i < tasksArray.length; i++) {
    task.innerHTML += `   
  <div class="task redT">
    <h2>${tasksArray[i].title}</h2>
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
});
// dark mode
mode.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  mode.classList.toggle("darkMode");
});
// removeAll button
removeAll.addEventListener("click", function () {
  Swal.fire({
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgba(84, 14, 154, 0.522)",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title:"Your file has been deleted.",
        icon: "success",
        confirmButtonColor: "rgba(84, 14, 154, 0.522)",

      });
      tasksArray.splice(1);
      localStorage.clear();
      show();
    }
  });
});
// remove one task

function remove(i){
  tasksArray.splice(i,1);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  show();
}

show();
