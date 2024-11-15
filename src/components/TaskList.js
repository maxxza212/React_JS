import React from "react";
import { Button, Card } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
    const getPriorityStyle = (priority) => {
        switch (priority) {
            case "Hard":
                return { color: "red", fontWeight: "bold" };
            case "Medium":
                return { color: "orange", fontWeight: "bold" };
            case "Low":
                return { color: "green", fontWeight: "bold" };
            default:
                return {};
        }
    };

    const getStatusButton = (status) => {
        const statusColors = {
            "To Do": "secondary",
            "In Progress": "warning",
            Done: "success",
        };

        return (
            <Button
                variant={statusColors[status]}
                size="sm"
                className="rounded-pill px-3"
                disabled
            >
                {status}
            </Button>
        );
    };

    return (
        <div>
            {tasks.map((task, index) => (
                // <Card
                //     className="mb-3 shadow-sm border-0 rounded-3"
                //     key={index}
                //     style={{
                //         backgroundColor: "rgba(255, 255, 255, 0.1)", // Sangat transparan (10%)
                //         backdropFilter: "blur(15px)", // Efek blur untuk meniru kaca
                //         border: "1px solid rgba(255, 255, 255, 0.3)", // Border semi-transparan untuk detail kaca
                //         borderRadius: "15px", // Sudut membulat
                //         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sedikit bayangan untuk menonjolkan elemen
                //     }}
                // >

                <Card
                    className="mb-3 shadow-sm border-0 rounded-3"
                    key={index}
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.6)", // Transparansi lebih tinggi (50%)
                        backdropFilter: "blur(10px)", // Efek blur tetap
                        borderRadius: "15px", // Sudut membulat
                    }}
                >

                    <Card.Body className="d-flex justify-content-between align-items-center">
                        {/* Left: Task Details */}
                        <div className="d-flex flex-column flex-md-row align-items-center w-100">
                            <div className="me-md-4 mb-2 mb-md-0 me-4">
                                <strong>Task:</strong>
                                <div>{task.name}</div>
                            </div>
                            <div className="me-md-4 mb-2 mb-md-0 me-4">
                                <strong>Priority:</strong>
                                <div style={getPriorityStyle(task.priority)}>{task.priority}</div>
                            </div>
                            <div className="me-4">
                                <strong>Status:</strong>
                                <div>{getStatusButton(task.status)}</div>
                            </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="d-flex align-items-center">
                            <Button
                                variant="outline-primary"
                                className="me-2 d-flex align-items-center"
                                onClick={() => showEditForm(task)}
                            >
                                <BsPencil />
                            </Button>
                            <Button
                                variant="outline-danger"
                                className="d-flex align-items-center"
                                onClick={() => deleteTask(task.id)}
                            >
                                <BsTrash />
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default TaskList;
