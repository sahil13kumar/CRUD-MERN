import './App.css';
import React,{useState,useEffect} from 'react';
import Axios from 'axios';

function App() {

  const [name, SetName] = useState('');
  const [age, SetAge] = useState(0);
  const [listOfFriends,setListOfFriends] = useState([]);


  const addFriend = () => {
    Axios.post('http://localhost:5000/insert',{name:name,age:age
    })
    setListOfFriends([...listOfFriends,{name:name,age:age}])
    
  };


  const updateFriend = (id) => {
    const newAge = prompt("Enter new age: ");

    Axios.put("http://localhost:5000/update", {
      newAge: newAge,
      id: id,
    }).then(() => {
      setListOfFriends(
        listOfFriends.map((val) => {
          return val._id == id ? { _id: id, name: val.name, age: newAge } : val;
        })
      );
    });
  };


  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`).then(()=>{
      setListOfFriends(listOfFriends.filter(item => item._id !== id))
    })
  }


  useEffect(()=>{
    Axios.get('http://localhost:5000/read')
    .then((response)=>{setListOfFriends(response.data) })
    .catch((err)=>console.log(err));
  }, []);

  return (
    <div className="App">
      
      <div className="inputs">
        <input type="text" placeholder="Friend Name..." onChange={(e)=>{
          SetName(e.target.value);
        }}/>
        <input type="number" placeholder="Friend Age..." onChange={(e)=>{
          SetAge(e.target.value);
        }}/>      
      
        <button onClick={addFriend}>Add Friend</button>        
      </div>
      
      <div className="listOfFriends">
      {listOfFriends.map((val)=>{
      return(
        <div className="friendsContainer">
          <div className="friends">
            <h3>Name: {val.name}</h3>
            <h3>Age: {val.age} </h3>
          </div>

          <button onClick={()=>{updateFriend(val._id)}}>Update</button>
          <button onClick={()=>{deleteFriend(val._id)}}>Delete</button>

        </div>
      ) 
      })}
      </div>

    </div>
  );
}

export default App;
