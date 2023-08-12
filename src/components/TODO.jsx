import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import addSound from './Sounds/item_added.mp3';

function Main({ logo }) {

    const list = useRef(null);  //setting reference to the list

    const [tasks, setTask] = useState(() => {
        const storedItems = JSON.parse(localStorage.getItem('todo'));
        return storedItems ? (storedItems) : [];

    });
    const [newTaskText, setNewTaskText] = useState('');

    const addTask = () => {
        //This will ignore the blank values
        if (newTaskText !== '' && newTaskText !== " ") {
            const newTask = newTaskText;
            setTask([...tasks, newTask]);
            setNewTaskText(''); // Clear the input field after adding a task
            toast.success('Item Added !!!');
            const audio = new Audio(addSound);
            audio.play();
        }
    };

    //adding task to local storage whenever there is any change in tasks
    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(tasks));
    }, [tasks]);


    //getting items from the local storage
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('todo'));
        if (storedItems) {
            setTask(storedItems);
        }
    }, []);


    //deleting from the local storage
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, currIndex) => currIndex !== index);
        // _ denotes an ignorable argument as this argument is not used for filtering
        setTask(updatedTasks);
        toast(' ❌ Item Deleted !!!');

    };



    //add on enter
    const addOnEnter = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }



    // Main rendering occurs here
    return (
        <main className='main'>
            <div className='container' id='container'>
                <nav className='top'>
                    {/* Heading */}
                    <img src={logo} alt="logo" className='logo icon' />
                    <h1
                        className='heading'
                        id='heading'>
                        Task-Wave
                    </h1>

                    {/* Manage Input Here */}
                    <input
                        type='text'
                        className='input'
                        placeholder='Add an Item'
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        onKeyUp={addOnEnter}
                    >
                    </input>


                    <button
                        className='btn'
                        id='btn'
                        onClick={addTask}>
                        <FontAwesomeIcon icon={faPlus} id='add' />
                    </button>

                </nav>


                <div className='items'>
                    <div className='taskContainer'>
                        <ol ref={list}>
                            {/* Rendering Tasks Here using map */}
                            {tasks.map((task, index) => (

                                <li key={index}>
                                    <div id='listIcons'>

                                        {/* Delete Icon */}
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            id='delete'
                                            className='list-icon'
                                            onClick={() => deleteTask(index)} />
                                    </div>

                                    {/* Task appears here */}
                                    <div id='list-text'>{task}</div>
                                </li>

                            ))}
                        </ol>
                    </div>
                </div>
            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="dark"
            />
            </div>
        </main>
    )
}

export default Main