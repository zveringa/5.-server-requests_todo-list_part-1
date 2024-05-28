import styles from './app.module.css';
import { useState, useEffect } from 'react';

const TODO_LIST = [
	{
		id: '001',
		task: 'Реализовать приложение на базе Create React App — страницу со списком дел (Todo list)',
	},
	{
		id: '002',
		task: 'Переделать приложение, заменив JSON Placeholder на JSON Server',
	},
	{
		id: '003',
		task: 'Также дополнительно — сделать приложение из второго пункта, но с использованием Firebase (без использования JSON Server)',
	},
];

export const App = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		new Promise((resolve) => {
			resolve({ json: () => TODO_LIST });
		})
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			});
	}, []);

	return (
		<div className={styles.app}>
			{todos.map(({ id, task }) => (
				<div key={id}>
					{' '}
					#{id}: - {task}{' '}
				</div>
			))}
		</div>
	);
};
