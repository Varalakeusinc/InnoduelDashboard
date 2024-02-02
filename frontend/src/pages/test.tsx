import { useEffect, useState } from "react";
import { testService } from "../services/test";

interface Test {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TestPage = () => {
  const [testData, setTestData] = useState<Test[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data: Test[] = await testService.getTestData();
      setTestData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-xl">Test Page</h1>
      <p>This is the test page, below should be a list of hard coded "Todos"</p>
      <hr className="my-4"/>
      {testData?.length > 0 &&
        testData.map((item: Test) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>{item.completed ? "Completed" : "Not completed"}</p>
          </div>
        ))}
    </div>
  );
};

export default TestPage;
