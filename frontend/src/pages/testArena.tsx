import React from "react";
import ChartBarHorizontal from "@/components/charts/bar-chart-horizontal";
import { mockArenas } from "@/src/services/arena";

const TestArena = () => {
    const selectedArena = mockArenas[2]; 

    return (
        <div className="mt-8"> 
			<h1 className="text-3xl font-semibold mb-4">{selectedArena.name}</h1> 
			<div className="grid grid-cols-4 gap-4 mb-8"> 
                <div className="p-4 bg-violet-800 rounded-xl shadow-md flex flex-col items-center"> 
                    <span className="text-3xl font-bold text-white">{selectedArena.totalVotes}</span> 
                    <span className="text-white">Vote amount</span>
                </div>
                <div className="p-4 bg-fuchsia-800 rounded-xl shadow-md flex flex-col items-center"> 
                    <span className="text-3xl font-bold text-white">{selectedArena.totalIdeas}</span> 
                    <span className="text-white">Idea amount</span>
                </div>
                <div className="p-4 bg-purple-800 rounded-xl shadow-md flex flex-col items-center"> 
                    <span className="text-3xl font-bold text-white">{selectedArena.totalVoters}</span> 
                    <span className="text-white">Voter amount</span>
                </div>
                <div className="p-4 bg-pink-800 rounded-xl shadow-md flex flex-col items-center"> 
                    <span className="text-3xl font-bold text-white">{selectedArena.winRate} %</span> 
                    <span className="text-white">Win rate</span>
                </div>
			</div>
            <ChartBarHorizontal arena={selectedArena} /> {/* Pass selected arena as prop */}
        </div>
    );
};

export default TestArena;
