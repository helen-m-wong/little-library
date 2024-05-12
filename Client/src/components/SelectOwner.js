import React, { useState, useEffect } from 'react';

function OwnerSelection({ onSelectOwner }) {
    const [members, setMembers] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState('');

    useEffect(() => {
        const getMembers = async() => {
            try {
                const res = await fetch('/members');
                const data = await res.json();
                if (res.status === 200) {
                    console.log("Members data retrieved");
                    setMembers(data.members);
                } else {
                    console.log("There was an error retrieving the data");
                }
            } catch (error) {
                console.log(error);
            }
        };
        getMembers();
    }, []);

    const handleOwnerChange = (e) => {
        setSelectedOwner(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedOwner) {
            onSelectOwner(selectedOwner);
        }
    }

    return (
        <div>
            <h2>Select Owner</h2>
            <form onSubmit={handleSubmit}>
                <select value={selectedOwner} onChange={handleOwnerChange}>
                    <option value="">Select Owner</option>
                    {members.map(member => (
                        <option key={member.id} value={member.id}>
                            {member.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Assign Owner</button>
            </form>
        </div>
    );
}

export default OwnerSelection;