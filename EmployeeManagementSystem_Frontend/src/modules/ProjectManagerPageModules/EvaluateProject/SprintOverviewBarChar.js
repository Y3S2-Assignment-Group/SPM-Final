import React from "react";
import { Bar } from "react-chartjs-2";

export default function SprintOverviewBarChar(props) {
  const barChart = (
    <Bar
      data={{
        labels: props.sprints.slice(0, 5).map((singleSprint) => {
          return `${singleSprint.toDate.substring(
            0,
            10
          )} - ${singleSprint.fromDate.substring(0, 10)}`;
        }),
        datasets: [
          {
            data: props.sprints.slice(0, 5).map((singleSprint) => {
              return (
                singleSprint.toDoList.length +
                singleSprint.inProgressList.length +
                singleSprint.doneList.length
              );
            }),
            backgroundColor: [
              "#3da19c",
              "#06adbf",
              "#f7d619",
              "#bf00c2",
              "#ff2684",
              "#3254a8",
            ],
            label: "Meal Calorie Intake",
          },
        ],
      }}
      options={{
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },

        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: true,
                drawOnChartArea: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: true,
                drawOnChartArea: false,
              },
            },
          ],
        },
      }}
    />
  );

  return (
    <div>
      <div className="card boderRadiusCards">
        <div className="card-body">
          <div>
            <h5 className="text-center">Sprint Oveview</h5>
          </div>
          <div>{barChart}</div>
        </div>
      </div>
    </div>
  );
}
