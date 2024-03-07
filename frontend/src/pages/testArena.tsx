import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChartBarHorizontal from "@/components/charts/bar-chart-horizontal";
import { mockArenas, MockArena } from "@/src/services/arena"; // Importing MockArena type

const testArena = () => {
  // const { id } = useParams();
  const id = "arena-1"
  const [selectedArena, setSelectedArena] = useState<MockArena | null>(null); // Initialize with null

  useEffect(() => {
    // Fetch arena data based on the id
    const fetchArenaData = () => {
      // Assuming you have a function to fetch arena data by id
      const arena = mockArenas.find((arena) => arena.id === id);
      if (arena) {
        setSelectedArena(arena);
      }
    };

    fetchArenaData(); // Call the fetchArenaData function
  }, [id]); // Re-fetch data when the id parameter changes

  return (
    <div className="mt-8">
      {selectedArena && (
        <>
          <h1 className="text-3xl font-semibold mb-4">{selectedArena.name}</h1>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-violet-800 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-3xl font-bold text-white">
                {selectedArena.totalVotes}
              </span>
              <span className="text-white">Vote amount</span>
            </div>
            <div className="p-4 bg-fuchsia-800 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-3xl font-bold text-white">
                {selectedArena.totalIdeas}
              </span>
              <span className="text-white">Idea amount</span>
            </div>
            <div className="p-4 bg-purple-800 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-3xl font-bold text-white">
                {selectedArena.totalVoters}
              </span>
              <span className="text-white">Voter amount</span>
            </div>
            <div className="p-4 bg-pink-800 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-3xl font-bold text-white">
                {selectedArena.winRate} %
              </span>
              <span className="text-white">Win rate</span>
            </div>
          </div>
          <ChartBarHorizontal arena={selectedArena} />
        </>
      )}
    </div>
  );
};

export default testArena;
