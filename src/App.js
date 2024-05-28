import styles from './app.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3001/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.app}>
			{isLoading ? (
				<div className={styles.loader}></div>
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
