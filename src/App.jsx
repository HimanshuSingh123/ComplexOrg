import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { use } from 'react'
import Tile from './tiles/added'

function App() {
  const [todos, setTodoList] = useState([]);
  const [dones, setDoneList] = useState([]);
  const [value, setValue] = useState("");
  
  const handleInput = () => {
    alert('inside handleInput!');
    if(value.trim() === "") return;
    setTodoList([...todos, packageV(value, 1)]);
    setValue("");
  }

  const packageV = (value, button) => {
    return {id:Date.now(), text:value, type:button}
  }

  const addToDoneList = (existingItem) => {
    const exists = dones.some(done => done.id === existingItem.id);
    existingItem.type = 2;
    if(exists){
        alert("item already exists within done list!");
        return;
    }
    setDoneList(dones => [...dones, existingItem]);
  }

  const addToTodoList = (existingItem) => {
    const exists = todos.some(todo => todo.id === existingItem.id);
    existingItem.type = 1;
    if(exists){
      alert('item already in todo list!');
      return;
    }
    setTodoList(todos => [...todos, existingItem]);
  }
  
  const removeFromTodoList = (existingItem) => {
    setTodoList(todos => todos.filter(todo => todo.id !== existingItem.id))
  }

  const removeFromDoneList = (existingItem) => {
    setDoneList(dones => dones.filter(done => done.id !== existingItem.id));
  }

  return (
    <div className='App'>
      <div className="navBar">
            <nav>
                <ul className="navBarList">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Account</a></li>
                    <li class="logoutlogin"><a href="#">Login</a></li>
                </ul>
            </nav>
        </div>
        <div className="EncClass">
            <h1>TO-DO LIST</h1>
            <div className="Info">
                <input
                id="textBox"
                type="text"
                value={value}
                onChange={(e) => {setValue(e.target.value);}}
                onKeyDown={
                    (e) => {
                        if(e.key === "Enter"){
                            handleInput();
                        }
                    }
                }>
                </input>
                <button 
                id="checkMark" 
                type="button"
                onClick={handleInput}
                >✔</button>
            </div>
            <div id="results">
                <div id="added">
                    <ul className='DynamicUl'>
                        {todos.map((todo, index) => <li className='DynamicLi' key={index}>
                            {
                            <Tile 
                            object={todo} 
                            addToDoneList={addToDoneList}
                            removeFromTodoList={removeFromTodoList}
                            type={1}
                            />
                            }
                            </li>)}
                    </ul>
                </div>
                <div id="completed">
                <ul className='DynamicUl'>
                        {dones.map((done, index) => <li className='DynamicLi' key={index}>
                            {
                            <Tile 
                            object={done} 
                            addToTodoList={addToTodoList}
                            removeFromDoneList={removeFromDoneList}
                            type={2}
                            />
                            }
                            </li>)}
                    </ul>
                </div>

            </div>

        </div>
      </div>
  )
}

export default App
