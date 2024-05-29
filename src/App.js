import styles from './app.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const

		useEffect(() => {
			setIsLoading(true);
			fetch('http://localhost:3001/todos')
				.then((loadedData) => loadedData.json())
				.then((loadedTodos) => {
					setTodos(loadedTodos);
				})
				.finally(() => setIsLoading(false));
		}, []);

	const addTask = () => {
		fetch('http://localhost:3001/todos', {
			method: 'POST',
			header: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				task: { newTask }
			}),
		});
	}

	return (

		<div className={styles.app}>
			<div className={styles.header}>Здесь твой список дел:</div>
			<form onSubmit={handleSubmit(onSubmit)}></form>
			<button className={styles.button} onClick={addTask}>Добавить дело</button>
			{isLoading ? (
				<>
					<div className={styles.headingLoader}>Please wait, the page is loading!</div>
					<div className={styles.loader}></div>
				</>
			) : (
				todos.map(({ id, task }) => (
					<div key={id}>
						{' '}
						#{id}: - {task}{' '}
					</div>
				))
			)}
		</div>

	);
};
