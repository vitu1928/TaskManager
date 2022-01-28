import React, { useState, useEffect } from "react";
import axios from 'axios'
import {v4 as uuidv4} from 'uuid';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './Componentes/Header.jsx'
import AddTask from './Componentes/AddTask.jsx';
import Tasks from './Componentes/Tasks.jsx';
import TaskDetails from './Componentes/TaskDetails.jsx';

import "./App.css";

// class App extends React.Component {
// 	constructor() {
// 		super();
		
// 		this.state = {
// 			message: 'Hello world'
// 		}
// 	}
	
// 	componentDidMount() {
// 		console.log('Foi renderizado pela primeira vez')
// 	}
// 	handelMessageChangeClick() {
// 		this.setState({message: 'heloooo'})
// 	}
// 	render() {
// 		return <>
// 			<h1>{this.state.message}</h1>
// 			<button onClick={this.handelMessageChangeClick.bind(this)}> Mudar mensagem</button>
// 		</>
// 	}
// }
const App = () => {
	const [tasks, setTasks] = useState([
		{
			id: 1,
			title: 'Estudar programação',
			completed: false
		},
		{
			id: 2,
			title: 'Ler livros',
			completed: true
		}
	]);

	useEffect(() => {
		const fetchTasks = async () => {
			const { data } = await axios.get('https://jsonplaceholder.cypress.io/todos?_limit=10')
			setTasks(data)
		}

		
		fetchTasks()
	},  [])

	const handleTaskClick = (taskId) => {
		const newTasks = tasks.map((task) => {
			if (task.id === taskId) return { ...task, completed: !task.completed
			}

			return task;
		})

		setTasks(newTasks)
	}

	const handleTaskAddition = (taskTitle) => {
		const newTasks = [
			...tasks, 
			{
				title: taskTitle,
				id: uuidv4(),
				completed: false,
			},
		];

		setTasks(newTasks)
	}

	const handleTaskDeletion = (taskId) => {
		const newTasks = tasks.filter(task => task.id !== taskId)

		setTasks(newTasks)
	}
	return (
		<Router>
			<Header />
				<Routes>
					<Route
						path="/"	 
						element={
								<>
									<AddTask handleTaskAddition={handleTaskAddition}/> 
									<Tasks 
										tasks={tasks}
										handleTaskClick={handleTaskClick} 
										handleTaskDeletion={handleTaskDeletion}
									/>
								</>
						}
					/>
					<Route path="/:taskTitle" element={<TaskDetails />} />
				</Routes>
		</Router>
	);
}
export default App;