import React from "react";

let printable: any[] = []; //Family members are stored here to be returned and rendered to the DOM
const familyTreeTest: { id: number; name: string; children: number[]; gender: "male" | "female"; parents: number[] }[] = [
  {
    id: 2351232112252,
    name: "Sally",
    children: [5555, 6666, 7777, 8458189966444, 897543276547654765443576],
    gender: "female",
    parents: [],
  },
  {
    id: 1231239887112,
    name: "Billy",
    children: [8458189966444, 5555, 6666, 7777, 897543276547654765443576],
    gender: "male",
    parents: [],
  },
  {
    id: 7777,
    name: "Suzie",
    gender: "female",
    children: [317849882, 8569047194214199353],
    parents: [2351232112252, 1231239887112],
  },
  { id: 23123122, name: "Sam", gender: "male", children: [317849882, 8569047194214199353], parents: [] },
  { id: 317849882, name: "Josh", gender: "male", children: [43924235082592], parents: [7777, 23123122] },
  { id: 8593288989, name: "Sarah", gender: "female", children: [43924235082592], parents: [] },
  { id: 43924235082592, name: "Jim", gender: "male", children: [9305009999], parents: [317849882, 8593288989] },
  { id: 83473298328562398696, name: "Clara", gender: "female", children: [9305009999], parents: [] },
  { id: 9305009999, name: "Joe", children: [], gender: "male", parents: [43924235082592, 83473298328562398696] },
  {
    id: 8569047194214199353,
    name: "Charlie",
    gender: "male",
    children: [565893648394894339808],
    parents: [23123122, 7777],
  },
  { id: 4382743284732483290, name: "Jessie", gender: "female", children: [565893648394894339808], parents: [] },
  {
    id: 565893648394894339808,
    name: "Bob",
    gender: "male",
    children: [],
    parents: [8569047194214199353, 4382743284732483290],
  },
  { id: 8458189966444, name: "Ricky", gender: "male", children: [], parents: [2351232112252, 1231239887112] },
  {
    id: 897543276547654765443576,
    name: "Julian",
    gender: "male",
    children: [],
    parents: [1231239887112, 2351232112252],
  },
];

FamilyMember(familyTreeTest); 

function App(): JSX.Element {
  
  return (
    <div style={{display: "grid", gridRowGap: "20px", gridColumnGap: "15px", justifyContent: "center"}}>
      
      {printable.map((value) => {
        if(value[0] === "line") {
          return <hr></hr>
        } else if(value[0] === "couple") {
          return <ParentCards name1={value[1]} gender1={value[2]} name2={value[3]} gender2={value[4]} position={value[5]}/>
        } else {
          return <SingleCard name={value[0]} gender={value[1]} position={value[2]}/>
        }
      })}

    </div>
  );
}

//This function is used to print members of the family who are single
function SingleCard(props: { gender: "male" | "female"; name: string; position: string}): JSX.Element {
  return (
  <div className="card" style={ props.gender === "male" ? {backgroundColor: "lightblue", gridColumn: props.position} : {backgroundColor: "lightpink", gridColumn: props.position}}>{props.name}</div>
  )
}

//This function is used to print members of the family who have a partner
function ParentCards(props: { gender1: "male" | "female"; name1: string; gender2: "male" | "female"; name2: string; position: string}): JSX.Element {
  return (
    <div style={{gridColumn: props.position}}>
      <div className="card" style={ props.gender1 === "male" ? {backgroundColor: "lightblue" } : {backgroundColor: "lightpink"}}>{props.name1}</div>
      <div className="card" style={ props.gender2 === "male" ? {backgroundColor: "lightblue" } : {backgroundColor: "lightpink"}}>{props.name2}</div>
    </div>
  )
}

//This function is used to find the family members on the next level of the family tree
function FindOffspring(tree: any[], children: number[], parentsCheck: boolean, shifter: number): number[] {
  
  let newChildren: number[] = [] //Array to store the new children
  let gridCount: number = 21 - shifter; //Number used to shift values in the grid to allign all family members

  //This runs when we are looking for the root parents
  if(parentsCheck) {
    for(const value of tree) {
      if(value.parents.length === 0) { //Runs if we find a family member without parents

        //Find partner of family member
        let temp = tree.find(obj =>  {
          return obj.gender !== value.gender && JSON.stringify(value.children.sort()) === JSON.stringify(obj.children.sort())  
        } )

        printable.push(["couple", value.name, value.gender, temp.name, temp.gender, JSON.stringify(Math.floor(gridCount/2))])

        newChildren = newChildren.concat(value.children)
        // eslint-disable-next-line
        newChildren = newChildren.filter((item, pos) => newChildren.indexOf(item) === pos)
        break;
      }
    }
  } else { //This runs when we are no longer looking for the root parents
    while(children.length !== 0){
      for(const value of tree) {
        if(children[0] === value.id) { //Check to see if family member is on this level of the family tree
          if(value.children.length !== 0) { //If parent's children is not 0 he/she has a partner

            //Find partner of family member
            let temp = tree.find(obj =>  {
              return obj.gender !== value.gender && JSON.stringify(value.children.sort()) === JSON.stringify(obj.children.sort())  
            } )


            if(value.children.length > 1) { //If parents have more then 1 Child
              printable.push(["couple", value.name, value.gender, temp.name, temp.gender, JSON.stringify(Math.floor((gridCount-children.length)/2)-(value.children.length-1)) + "/ " + JSON.stringify(Math.floor((gridCount-children.length)/2)+1)])
            } else { //If parents only have 1 Child
              printable.push(["couple", value.name, value.gender, temp.name, temp.gender, JSON.stringify(Math.floor((gridCount-children.length)/2))])
            }
            
            gridCount++

            newChildren = newChildren.concat(value.children)
            // eslint-disable-next-line
            newChildren = newChildren.filter((item, pos) => newChildren.indexOf(item) === pos)
            break;

          } else { //Else if parent's children is 0, then he/she is single
            printable.push([value.name, value.gender, JSON.stringify(Math.floor((gridCount-children.length)/2))])
            gridCount++

            newChildren.push(0) //Add a 0 to make sure the tree grid is shifted properly
            break;
          }
        }
      } 
      children.shift() //Remove children that was just looked at
    }
  }
  return newChildren; //Return children of the parnets that were just looked at
}

function FamilyMember(tree: { id: number; name: string; children: number[]; gender: "male" | "female"; parents: number[] }[]): void {
  let childrenToFind: number[] = [] //Array to keep hold of children that will need to be added to the tree

  let parents: boolean = true; //Boolean used to look for root parents
  let shifter: number = 0; //Number used for shifting values for the family tree grid

  while(parents === true || childrenToFind.length !== 0) { //Lood while there are still children to find in the family tree

    //Find the next set of children
    childrenToFind = FindOffspring(tree, childrenToFind, parents, shifter);

    //Update shifting for grid 
    if(childrenToFind.filter(x => x === 0).length !== 0) {
      shifter += childrenToFind.filter(x => x === 0).length
    }

    //Remove additional elements added for shifting grid values
    childrenToFind = childrenToFind.filter(function(x) { return x !== 0 })

    //set parents to false after root parenst are found
    parents = false;
  }
}

export default App;
