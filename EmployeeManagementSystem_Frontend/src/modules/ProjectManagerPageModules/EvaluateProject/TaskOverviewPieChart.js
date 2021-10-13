import React,{useState} from "react";
import { Doughnut } from "react-chartjs-2";

export default function TaskOverviewPieChart(props) {

  const [toDoCount, settoDoCount] = useState(props.tasks ? props.tasks.toDoList.length : 0)
  const [inProgressCount, setinProgressCount] = useState(props.tasks ? props.tasks.inProgressList.length : 0)
  const [doneCount, setdoneCount] = useState(props.tasks ? props.tasks.doneList.length : 0)

  const pieChart = (
    <Doughnut
      data={{
        labels: ["To do", "In Progress", "Done"],
        datasets: [
          {
            data: [toDoCount,inProgressCount, doneCount],
            backgroundColor: [
              "#bf00c2",
              "#ff2684",
              "#3254a8",
            ],
            label: "Tasks",
          },
        ],
      }}
      options={{
        animation: {
          animateScale: true,
        },
      }}
    />
  );

  return (
    <div>
      <div className="card boderRadiusCards">
        <div className="card-body">
          <div>
            <h5 className="text-center">Task Oveview</h5>
          </div>
          <div>{pieChart}</div>
        </div>
      </div>
    </div>
  );
}
