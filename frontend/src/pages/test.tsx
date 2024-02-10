import { useEffect, useState } from "react";
import { testService } from "../services/test";

export interface Test {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TestPage = () => {
  const [testData, setTestData] = useState<Test[]>([]);
  const [testDataById, setTestDataById] = useState<Test>();

  async function fetchData() {
    try {
      const data: Test[] = await testService.getTestData();
      setTestData(data);
    } catch (error) {
      // Handle error here
      // Show toast or something
    }
  }
  async function fetchDataById(id: number = 1) {
    try {
      const data: Test = await testService.getTestDataById(id);
      setTestDataById(data);
    } catch (error) {
      // Handle error here
      // Show toast or something
    }
  }

  useEffect(() => {
    fetchData();
    fetchDataById();
    fetchDataById(5); // This will throw an error, look console
  }, []);

  return (
    <div>
      <h1 className="text-xl">Test Page</h1>
      <p>This is the test page, below should be a list of hard coded "Todos"</p>
      <hr className="my-4" />
      {testData?.length > 0 &&
        testData.map((item: Test) => (
          <TestComponent key={item.id} test={item} />
        ))}

      <hr className="my-4" />
      <p>Below example of how to get "Test" object by id</p>
      <hr className="my-4" />
      {!testDataById && <p>Loading...</p>}
      {testDataById && <TestComponent test={testDataById} />}
    </div>
  );
};
const TestComponent = ({ test }: { test: Test }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Title: {test.title}</h2>
      <p className="text-gray-700">Id: {test.id}</p>
      <p className="text-gray-700">Description: {test.description}</p>
      <p className="text-gray-700">
        State:{" "}
        <span className="{test.completed ? 'text-green-500' : 'text-red-500'}">
          {test.completed ? "Completed" : "Not completed"}
        </span>
      </p>
    </div>
  );
};

export default TestPage;
