import { useState, useEffect } from 'react';
export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    fetch('/api/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && age) {
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age: parseInt(age, 10) }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((newUser) => {
          setUsers((prevUsers) => [...prevUsers, newUser]);
          setName('');
          setAge('');
        })
        .catch((error) => console.error('Error adding user:', error));
    }
  };

  return (
    <div className="container">
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.name} ({user.age})</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
