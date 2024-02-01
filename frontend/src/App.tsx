import { useEffect, useState } from "react";
import "./App.css";
import { testService } from "./services/test";

interface Test {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

function App() {
  const [testData, setTestData] = useState<Test[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data: Test[] = await testService.getTestData();
      setTestData(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>Hello world!</h1>
      <div>
        {testData && testData.length > 0 && testData.map((item: Test) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>{item.completed ? "Completed" : "Not completed"}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
