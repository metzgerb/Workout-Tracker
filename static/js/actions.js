//function to build table
function build(data){
   //get tablebody
   var table = document.getElementById("data-table");
   
   //loop through array to create table rows
   for (var i = 0; i < data.length ; i++) {
      var tRowIn = document.createElement("tr");
      table.appendChild(tRowIn);
   }
   
   //add 5 cells to each row
   var rows = table.getElementsByTagName("tr");
   for (var i = 0; i < rows.length; i++){
      for (var j = 0; j < 5; j++){
         var tCellIn = document.createElement("td");
         rows[i].appendChild(tCellIn);
      }
   }
   
   //add row id and fill cells
   for (var i =0; i<rows.length; i++){
      rows[i].id = data[i].id;
      var rowCells = rows[i].getElementsByTagName("td");
      rowCells[0].textContent = data[i].date;
      rowCells[1].textContent = data[i].name;
      rowCells[2].textContent = data[i].reps;
      rowCells[3].textContent = data[i].weight;
      rowCells[4].textContent = data[i].lbs;
      //rowCells[5].InnerHTML = <button type="button" onclick="editRow(i)">Edit</button><button type="button" onclick="deleteRow({{this.id}})">Delete</button>;
   }
   
}

//handles add
function addRow(){
   //create request
   var req = new XMLHttpRequest();
   var payload = {add:true};
   payload.name = document.getElementById("formName").value;
   payload.reps = document.getElementById("formReps").value;
   payload.weight = document.getElementById("formWeight").value;
   payload.date = document.getElementById("formDate").value;
   payload.lbs = document.getElementById("formLbs").value;
   
   console.log(payload);
   
   req.open('POST', '/', true);
   req.setRequestHeader('Content-Type', 'application/json');
   req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
         var response = JSON.parse(req.responseText);
         //build table
         console.log(response);
         build(response);
      } else {
         console.log("Error in network request: " + req.statusText);
      }});
   
   //send payload to node app
   req.send(JSON.stringify(payload));
}

//handles delete
function deleteRow(id){
   
}

//primes update
function editRow(id){
   
}

//handles update
function updateRow(){
   
}

//add event listener to form button
//document.getElementById("formBtn").addEventListener("click", add());