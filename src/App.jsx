import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { use } from 'react'
import Tile from './tiles/added'
import { TaskContent } from './TaskContext'

function App() {
  const [masterList, setMasterList] = useState([]);
  const todos = masterList.filter(t => !t.completed);
  const dones = masterList.filter(t => t.completed);
  const [value, setValue] = useState("");


  const handleInput = () => {
    alert('inside handleInput!');
    if(value.trim() === "") return;
    setMasterList([...masterList, packageV(value)]);
    // api would probably go somewhere here?
    setValue("");
  }

  const packageV = (value) => {
    return {id:Date.now(), text:value, completed:false, description : "", images : [], links: []}
  }

  const switchList = (existingItem) => {
    setMasterList(prev => prev.map(
      task => task.id === existingItem.id ? 
      {...task, completed: !task.completed} : task
    ))
  }

  const packageImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    return {
        id : `Image-${Date.now()}`,
        filename: file.name,
        file: file,
        uploadDate: new Date().toISOString(),
        url: URL.createObjectURL(file)
    };
  }

  const packageLink = (url) => {
    return {
      id: `Link-${Date.now()}`,
      url: url,
      uploadDate: new Date().toISOString()
    };
  }

/*
const appendImage = (e, existingItem) => {
  const packagedImage = packageImage(e);
  if (!packagedImage) return;

  setMasterList(prev => {
    // 🔍 Find the fresh version of the task
    const freshTask = prev.find(task => task.id === existingItem.id);
    const existingImages = freshTask?.images || [];

    return prev.map(task =>
      task.id === existingItem.id
        ? { ...task, images: [...existingImages, packagedImage] }
        : task
    );
  });
};
*/

  const appendImage = (e, existingItem) => {
    let packagedImage = packageImage(e);
    if (!packagedImage) return;
    setMasterList(prev => prev.map(task => task.id === existingItem.id ? {...task, images: [...task.images, packagedImage]} : task));
    console.log(getImagesForObject(existingItem));
  }

  const removeImage = (existingItem, existingImageId) => {
    setMasterList(prev => prev.map(task => existingItem.id === task.id ? {...task, images: task.images.filter(image => image.id !== existingImageId)} : task));
  }

  const appendLink = (url, existingItem) => {
    let packagedLink = packageLink(url);
    if (!packagedLink) return;
    setMasterList(prev => prev.map(task => task.id === existingItem.id ? {...task, links:[...task.links, packagedLink]} : task))
  }

  const removeLink = (existingItem, existingLinkId) => {
    setMasterList(prev => prev.map(task => task.id === existingItem.id ? {...task, links:task.links.filter(link => link.id !== existingLinkId)} : task))
  }

  const getTask = (existingItem) => {
    return masterList.find(task => task.id === existingItem.id ? task : 'None');
  }

//.map()	Transform each item in an array	🔁 New array (same length)
//.filter()	Remove some items based on a condition	🔁 New array (shorter or same)
//.some()	Check if at least one item passes a condition	✅ true or false
//find() returns the first item in an array that satisfies a condition — or undefined if no match is found.

  const updateDescription = (existingItem, text) => {
    setMasterList(prev => prev.map(
      task => task.id === existingItem.id ? 
      {...task, description: text} : task
    ))
  }

  const removeTask = (taskId) => {
    setMasterList(prev => prev.filter(task => task.id !== taskId));
  }

  const getAllImages = () => {
    return masterList.flatMap(task => task.images);
  }

  const getAllLinks = () => {
    return masterList.flatMap(task => task.links);
  }

  const getLinksForObject = (existingItem) => {
    const task = masterList.find(task => task.id === existingItem.id)
    return task ? task.links : [];
  }

  const getImagesForObject = (existingItem) => {
    let task = masterList.find(task => task.id === existingItem.id);
    return task ? task.images : [];
  }


  return (
    <TaskContent.Provider value={{
      appendImage,
      removeImage, 
      appendLink, 
      removeLink,
      getAllImages,
      getAllLinks,
      getImagesForObject,
      getLinksForObject,
      getTask,
      masterList
    }}>
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
                            switchListFunc={switchList}
                            updateDescription={updateDescription}
                            removeTask={removeTask}
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
                            switchListFunc={switchList}
                            updateDescription={updateDescription}
                            removeTask={removeTask}
                            />
                            }
                            </li>)}
                    </ul>
                </div>

            </div>

        </div>
      </div>
      </TaskContent.Provider>
  )
}

export default App
