'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Input, Button, message, Spin, Modal } from 'antd';
import Cookies from 'js-cookie';

const Boards = () => {
    const [boards, setBoards] = useState([]);
    const [boardName, setBoardName] = useState('');
    const [boardDescription, setBoardDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(null); // State for selected board
    const [collaboratorEmail, setCollaboratorEmail] = useState(''); // State for collaborator email
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

    // Fetch boards on component mount
    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/collaboration/boards/");
                setBoards(response.data); // Initialize boards state with fetched boards
            } catch (error) {
                message.error("Failed to fetch boards.");
                console.error("Error fetching boards:", error.response ? error.response.data : error);
            }
        };

        fetchBoards();
    }, []);

    // Create a new board
    const createBoard = async () => {
        if (!boardName || !boardDescription) {
            message.error("Please provide a Board Name and Description.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8000/api/collaboration/create-board/", {
                name: boardName,
                desc: boardDescription,
            }, {
                headers: {
                    'X-CSRFToken': Cookies.get('csrftoken'),
                }
            });

            // Log the full response to check its structure
            console.log("Response from creating board:", response.data);

            if (response.data) {
                message.success(`Board created: ${response.data.name || 'No name provided'}`);

                // Add the newly created board to the boards state
                setBoards((prevBoards) => [...prevBoards, response.data]);

                // Clear input fields
                setBoardName('');
                setBoardDescription('');
            }
        } catch (error) {
            message.error("Failed to create board.");
            console.error("Error creating board:", error.response ? error.response.data : error);
        } finally {
            setLoading(false);
        }
    };

    // Handle board selection
    const handleBoardSelect = (board) => {
        setSelectedBoard(board);
        setModalVisible(true); // Show the modal to add a collaborator
    };

    // Handle adding a collaborator
    const addCollaborator = async () => {
        if (!collaboratorEmail) {
            message.error("Please enter a collaborator email.");
            return;
        }
    
        try {
            const response = await axios.post(`http://localhost:8000/api/collaboration/add-collaborator/${selectedBoard.id}/`, {
                email: collaboratorEmail,
            });
    
            // If the API returns success
            message.success(`Collaborator ${collaboratorEmail} added to ${selectedBoard.name}`);
    
            // Clear input and close modal
            setCollaboratorEmail('');
            setModalVisible(false);
        } catch (error) {
            message.error("Failed to add collaborator.");
            console.error("Error adding collaborator:", error.response ? error.response.data : error);
        }
    };
    

    return (
        <div>
            <h1>Create a New Board</h1>
            <Input
                placeholder="Board Name"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <Input.TextArea
                placeholder="Board Description"
                value={boardDescription}
                onChange={(e) => setBoardDescription(e.target.value)}
                rows={4}
                style={{ marginBottom: '10px' }}
            />
            <Button type="primary" onClick={createBoard} loading={loading}>
                Create Board
            </Button>

            <h2 style={{ marginTop: '20px' }}>All Boards</h2>
            {loading && <Spin />}
            <Row gutter={16}>
                {boards.map(board => (
                    <Col span={8} key={board.id}>
                        <Card
                            title={board.name} // Ensure board name is displayed as the card title
                            style={{ marginBottom: '20px', cursor: 'pointer', background: '#e6f7ff', height: '200px' }}
                            onClick={() => handleBoardSelect(board)} // Select the board on click
                        >
                            <p>{board.desc || "No description"}</p> {/* Use board.desc for description */}
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal for adding collaborator */}
            <Modal
                title={`Add Collaborator to ${selectedBoard?.name}`}
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={addCollaborator}
            >
                <Input
                    placeholder="Collaborator Email"
                    value={collaboratorEmail}
                    onChange={(e) => setCollaboratorEmail(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default Boards;
