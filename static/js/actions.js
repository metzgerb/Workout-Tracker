//add initial event handlers for form buttons
document.getElementById("formBtn").addEventListener("click", addRow);
document.getElementById("resetBtn").addEventListener("click", resetForm);

//handles add
function addRow(){
   //create request
   var req = new XMLHttpRequest();
   var payload = {add:true};
   payload.name = document.getElementById("formName").value;
   payload.reps = document.getElementById("formReps").value;
   payload.weight = document.getElementById("formWeight").value;
   payload.date = document.getElementById("formDate").value;
   payload.lbs = document.getElementById("formLbs").checked;
   
   //reset form
   resetForm();
   
   req.open('POST', '/', true);
   req.setRequestHeader('Content-Type', 'application/json');
   req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
         var response = JSON.parse(req.responseText);
         
         //build table 
         var table = document.getElementById("data-table");
         
         //create new row
         var tRowIn = document.createElement("tr");
         table.appendChild(tRowIn);
         
         //set id for new row
         var newRow = table.lastElementChild;
         newRow.id = response[0].id;
         
         //create cells in new row
         for (var i = 0; i < 6; i++){
            var tCellIn = document.createElement("td");
            newRow.appendChild(tCellIn);
         }
         
         //fill cells
         var rowCells = newRow.getElementsByTagName("td");
         rowCells[0].textContent = response[0].date;
         rowCells[1].textContent = response[0].name;
         rowCells[2].textContent = response[0].reps;
         rowCells[3].textContent = response[0].weight;
         if(response[0].lbs == true){
            rowCells[4].textContent = "lbs";
         } else {
            rowCells[4].textContent = "kgs";
         }
                  
         //add edit button
         var editBtn = document.createElement("button");
         var eText = document.createTextNode("Edit");
         editBtn.appendChild(eText);
         editBtn.onclick = function() {editRow(response[0].id)};
         rowCells[5].appendChild(editBtn);
         
         //add delete button
         var deleteBtn = document.createElement("button");
         var dText = document.createTextNode("Delete");
         deleteBtn.appendChild(dText);
         deleteBtn.onclick = function() {deleteRow(response[0].id)};
         rowCells[5].appendChild(deleteBtn);
         
      } else {
         console.log("Error in network request: " + req.statusText);
      }});
   
   //send payload to node app
   req.send(JSON.stringify(payload));
}

//handles delete
function deleteRow(id){
   var req = new XMLHttpRequest();
   var payload = {deleteRow:true};
   payload.id = id;
   
   //call delete from database
   req.open('POST', '/', true);
   req.setRequestHeader('Content-Type', 'application/json');
   req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
         //remove row from table
         var table = document.getElementById("data-table");
         
         //get row to delete
         var rowToDelete = document.getElementById(id);
         table.removeChild(rowToDelete);
         
      } else {
         console.log("Error in network request: " + req.statusText);
      }});
      
   //send payload to node app
   req.send(JSON.stringify(payload));      
}

//primes update
function editRow(id){
   //get values from row
   var rowToUpdate = document.getElementById(id);
   var rowCells = rowToUpdate.getElementsByTagName("td");
   
   document.getElementById("formId").value = id;
   document.getElementById("formName").value = rowCells[1].textContent;
   document.getElementById("formReps").value= rowCells[2].textContent;
   document.getElementById("formWeight").value= rowCells[3].textContent;
   //format date from MM-DD-YYYY to YYYY-MM-DD
   var formattedDate = rowCells[0].textContent.split("-");
   formattedDate = formattedDate[2] + '-' + formattedDate[0] + '-' + formattedDate[1];
   document.getElementById("formDate").value= formattedDate;
   
   if(rowCells[4].textContent == "Lbs") {
      document.getElementById("formLbs").checked = true;
      document.getElementById("formKgs").checked = false;
   } else {
      document.getElementById("formLbs").checked = false;
      document.getElementById("formKgs").checked = true;
   }
   
   //change form buttons from add to updateRow
   document.getElementById("formBtn").removeEventListener("click",addRow);
   document.getElementById("formBtn").addEventListener("click", updateRow);
   document.getElementById("formBtn").textContent = "Update";
   document.getElementById("resetBtn").textContent = "Cancel";
}

//handles update
function updateRow(){
   //create request
   var req = new XMLHttpRequest();
   var payload = {update:true};
   payload.name = document.getElementById("formName").value;
   payload.reps = document.getElementById("formReps").value;
   payload.weight = document.getElementById("formWeight").value;
   payload.date = document.getElementById("formDate").value;
   payload.lbs = document.getElementById("formLbs").value;
   
   //reset form
   resetForm();
   
   //update DB
   
   //update row in html
   
   
   //change form button from updateRow to addRow
   document.getElementById("formBtn").removeEventListener("click",updateRow);
   document.getElementById("formBtn").addEventListener("click", addRow);
   document.getElementById("formBtn").textContent = "Add";
   document.getElementById("resetBtn").textContent = "Reset";
}
	
function resetForm(){
   document.getElementById("formId").value = "";
   document.getElementById("formName").value = "";
   document.getElementById("formReps").value= "";
   document.getElementById("formWeight").value= "";
   document.getElementById("formDate").value= "";
   document.getElementById("formLbs").checked = true;
   document.getElementById("formKgs").checked = false;
}