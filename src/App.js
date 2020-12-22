import React from 'react';

function App() {
  const familyTreeTest = [
    {
      id: 1,
      name: "Dad",
      children: [3, 4],
      gender: "male",
      parents: [],
    },
    {
      id: 2,
      name: "Mom",
      children: [3, 4],
      gender: "female",
      parents: [],
    },
    {
      id: 3,
      name: "Child1",
      children: [5],
      gender: "female",
      parents: [1, 2],
    },
    {
      id: 4,
      name: "Child2",
      children: [5],
      gender: "male",
      parents: [1, 2],
    },
    {
      id: 5,
      name: "GrandChild",
      children: [],
      gender: "male",
      parents: [3, 4],
    }
  ]
  return (
    <FamilyMember tree={familyTreeTest}></FamilyMember>
  );
}

function Card(props) {
  return (
  <div className="card" style={ props.gender === "male" ? {backgroundColor: "lightblue"} : {backgroundColor: "lightpink"}}>{props.name}</div>
  )
}



function FamilyMember(props) {
  const parentsToAdd = []
  let childrenToFind = []

  for(const value of props.tree) {
    if(value.parents.length === 0) {
      parentsToAdd.push(value)
      parentsToAdd.push(props.tree.find(obj =>  {
        return obj.gender !== value.gender && JSON.stringify(value.children.sort()) === JSON.stringify(obj.children.sort())  
      } ))
      break;
    }
  }

  for(const tester of parentsToAdd[0].children) {
    childrenToFind.push(tester);
  }
  
  return (
    <div>
      {parentsToAdd.map((value) => {
        return <Card name={value.name} gender={value.gender}/>
      })}

      <hr></hr>

      {childrenToFind.map((value) => {
        childrenToFind.push(props.tree.find(obj =>  {
          return obj.id === value 
        } ))
        return <Card name={props.tree.find(obj =>  { return obj.id === value } ).name} gender={props.tree.find(obj =>  { return obj.id === value } ).gender}/>
      })}
    </div>
  );
}

export default App;
