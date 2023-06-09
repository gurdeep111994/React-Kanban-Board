import React from "react";
import "./index.css"

export default function KanbanBoard(props) {
	const [txtValue, setTxtValue] = React.useState('')
	let [tasks, setTasks] = React.useState([
		{ name: '1', stage: 0 },
		{ name: '2', stage: 0 },
		{ name: '3', stage: 1 },
		{ name: '4', stage: 3 },
	])

	let [stagesNames, setStagesNames] = React.useState(['Backlog', 'To Do', 'Ongoing', 'Done']);


	let stagesTasks = [];
	for (let i = 0; i < stagesNames.length; ++i) {
		stagesTasks.push([]);
	}
	for (let task of tasks) {
		const stageId = task.stage;
		stagesTasks[stageId].push(task);
	}

	const OnSubmit = () => {
		if (txtValue) {
			const trimValue = txtValue.trim();
			if (!checkIfTaskExist(trimValue)) {
				setTasks([...tasks, { name: trimValue, stage: 0 }]);
				setTxtValue('');
			}
		}
	}

	const checkIfTaskExist = (name) => {
		return tasks.find(x => x.name == name);
	}

	const deleteTask = (task) => {
		setTasks(tasks.filter(x => x.name !== task.name));
	}

	const moveNext = (task) => {
		if (task.stage < 3) {
			setTasks(tasks.map(x => {
				if (x.name == task.name) {
					x.stage = x.stage + 1;
				}
				return x;
			}));
		}
	}

	const moveBack = (task) => {
		if (task.stage > 0) {
			setTasks(tasks.map(x => {
				if (x.name == task.name) {
					x.stage = x.stage - 1;
				}
				return x;
			}));
		}
	}

	return (
		<div className="mt-20 layout-column justify-content-center align-items-center">
			<section className="mt-50 layout-row align-items-center justify-content-center">
				<input id="create-task-input" type="text" className="large" onChange={(e) => { setTxtValue(e.target.value); }} placeholder="New task name" data-testid="create-task-input" value={txtValue} />
				<button type="submit" className="ml-30" data-testid="create-task-button" onClick={OnSubmit}>Create task</button>
			</section>

			<div className="mt-50 layout-row">
				{stagesTasks.map((tasks, i) => {
					return (
						<div className="card outlined ml-20 mt-0" key={`${i}`}>
							<div className="card-text">
								<h4>{stagesNames[i]}</h4>
								<ul className="styled mt-50" data-testid={`stage-${i}`}>
									{tasks.map((task, index) => {
										return <li className="slide-up-fade-in" key={`${i}${index}`}>
											<div className="li-content layout-row justify-content-between align-items-center">
												<span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
												<div className="icons">
													<button className="icon-only x-small mx-2" onClick={() => { moveBack(task); }} disabled={task.stage == 0} data-testid={`${task.name.split(' ').join('-')}-back`}>
														<i className="material-icons">arrow_back</i>
													</button>
													<button className="icon-only x-small mx-2" onClick={() => { moveNext(task); }} disabled={task.stage == 3} data-testid={`${task.name.split(' ').join('-')}-forward`}>
														<i className="material-icons">arrow_forward</i>
													</button>
													<button className="icon-only danger x-small mx-2" onClick={() => { deleteTask(task); }} data-testid={`${task.name.split(' ').join('-')}-delete`}>
														<i className="material-icons">delete</i>
													</button>
												</div>
											</div>
										</li>
									})}
								</ul>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}