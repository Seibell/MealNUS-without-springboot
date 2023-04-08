import { useState, useEffect } from 'react';

function preventDefault(event) {
  event.preventDefault();
}

export default function AdminDashboardTodayCount() {
  const [data, setData] = useState(0);

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    fetch(`http://localhost:8080/MealNUS-war/rest/orders/currentDateOrderCount/${currentDate}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  return <div>{data}</div>;
}