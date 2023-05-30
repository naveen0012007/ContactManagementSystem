'use strict'
const addBtn = document.querySelector('.btn');
const toDoContainer = document.getElementById('toDoContainer');
const inputText = document.getElementById('inputText');
const inputNumber = document.getElementById('inputNumber');
let modal1 = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let closeModel = document.querySelectorAll('.closeModal');
const updateNameInput = document.getElementById('modalBtnName');
const updateNumberInput = document.getElementById('modalBtnNumber');
let storeData,inputBox1,inputBox2 ,editBtn ,deleteBtn; 
// creating array
let arr = [];
let count=1;
let flag=true;

let dummy;

toDoContainer.addEventListener('click',function(e){
  let actionOfButton=e.target.closest('.context').id;
  if(e.target.classList.contains('edit')){
   dummy=actionOfButton;
   const parent = document.getElementById(actionOfButton);
  
   const child = parent.children;
  
      let data0=child[0];
      let data1=child[1];
   updateNameInput.value=data0.innerText;
   updateNumberInput.value=data1.innerText;
   actionBtn();  
  }
})

function seperateEdit(val) {
   if (val !== null && val !== 'closeModal') {
       let spliteString = val.split('-');
       arr= arr.filter((valu)=>{
           if(valu.id == spliteString[1]){
           valu.name= updateNameInput.value;
           valu.number=updateNumberInput.value ;
            return  valu;
           }
           return val;
       })
       finalStep(dummy);
       localStore()
   }
}

function finalStep(val){
   if (val !== null && val !== 'closeModal') {
      let spliteString = val.split('-');
  arr.forEach((valu ,index)=>{

   if(Number(spliteString[1])=== Number(valu.id)){
   const parent = document.getElementById(dummy);
   const child = parent.children;
      let data0=child[0];
      let data1=child[1];
      data0.innerText=arr[index].name;
      data1.innerText=arr[index].number;
  }
})
}
}

closeModel[1].addEventListener('click', function () {
   actionBtn();
   seperateEdit(dummy);
})

function actionBtn() {
   modal1.classList.toggle('hidden');
   overlay.classList.toggle('hidden');
}

function updateContact(val) {
  val.name= updateNameInput.value ;
  val.number=updateNumberInput.value ;
  updateEmpty()
}

function updateEmpty() {
  updateNameInput.value = '';
  updateNumberInput.value = '';
}

addBtn.addEventListener('click',function(){
  if (inputText.value && inputNumber.value) {
    addElement();
    localStore();
}
});

function addContact(a1, b1) {
  arr = [...arr, { id:count, name: a1, number: b1 }];
  console.log({count});
  storeData.setAttribute('id', `para-${count}`);
console.log(storeData.getAttribute('id'));
  editBtn.classList.add(`hiddeplus-${count}`);
  deleteBtn.classList.add(`hiddeDeleteBtn-${count}`);
  deleteBtn.addEventListener('click', (e) => {
    console.log(e.target.classList[1]);
    seperateFun(e.target.classList[1]);
  })
  count++;
}


function seperateFun(val) {


  if (val !== null && val !== 'closeModal') {
      let spliteString = val.split('-');
      // document.getElementById(`para-${spliteString[1]}`).classList.add('hidden');
      document.getElementById(`para-${spliteString[1]}`).remove();
      console.log('delete index',spliteString[1]);
      deleteContact(spliteString[1]);
      
  }
}

function deleteContact(index) {

  // console.log({index})
  arr= arr.filter((val)=> { 
  if(val.id !== Number(index)){
   return val;
  }
});
// console.log('delete',{arr});
localStore();
}
// for (let index = 0; index < closeModel.length; index++)
   closeModel[0].addEventListener('click', function () {
       actionBtn();
   })
document.addEventListener('keydown', function (e) {
   if (e.key === 'Escape' && !modal1.classList.contains('hidden')) {
       actionBtn();
   }
});


function addElement() {
  let a, b;
  storeData = document.createElement('div');
  inputBox1 = document.createElement('span');
  inputBox2 = document.createElement('span');
  editBtn= document.createElement('button')
  deleteBtn = document.createElement('button')
  
  editBtn.innerText = 'Edit';
  deleteBtn.innerText = 'Delete';
  toDoContainer.appendChild(storeData);
  const context = document.querySelector('.context');
  storeData.appendChild(inputBox1);
  storeData.appendChild(inputBox2);
  storeData.appendChild(editBtn);
  storeData.appendChild(deleteBtn);
  //  assing value
  inputBox1.innerText=inputText.value;
  inputBox2.innerText=inputNumber.value;
  // adding the class to the para
  storeData.classList.add('context');
  inputBox1.classList.add('dataName');
  inputBox2.classList.add('dataNumber');
  deleteBtn.classList.add('button');
  // add edit class
  editBtn.classList.add('edit');
  editBtn.classList.add(`editId-${arr.length}`);
  a = inputText.value;
  b = inputNumber.value;

  if(flag==true)
   addContact(a, b);
   inputText.value = "";
   inputNumber.value = "";  
  //  localStorage.clear();
}


function localStore(){
let string = JSON.stringify(arr)
console.log(string);
localStorage.setItem('value',string);
localStorage.setItem('increment',count);
}

let retString=[];
retString=localStorage.getItem('value');   
let retArray = JSON.parse(retString)

    

if(retArray.length>=0)
{
  flag=false; 
  count=Number(localStorage.getItem('increment'));
  count++;

 retArray.forEach((val)=>{
   inputText.value =val.name;
   inputNumber.value=val.number;
   addElement();  
   reassingData(val.id) 
   arr=retArray;

 }) 
 flag=true; 
}

function reassingData(val){

  storeData.setAttribute('id', `para-${val}`);
  console.log(storeData.getAttribute('id'));
    editBtn.classList.add(`hiddeplus-${val}`);
    deleteBtn.classList.add(`hiddeDeleteBtn-${val}`);
    deleteBtn.addEventListener('click', (e) => {
      console.log(e.target.classList[1]);
      seperateFun(e.target.classList[1]);
    })
}