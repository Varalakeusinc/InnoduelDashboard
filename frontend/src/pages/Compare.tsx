import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArenaCompare from "./ArenaCompare";

const Compare = () => {
	const [views, setViews] = useState<string[]>(['view1']);
	const viewIdCounter = useRef(2);

	const handleAddView = () => {
		const newViewId = `view${viewIdCounter.current}`;
		viewIdCounter.current++;
		setViews(prevViews => [...prevViews, newViewId]);
	};

	const handleRemoveView = (viewIdToRemove: string) => {
		setViews(prevViews => prevViews.filter(id => id !== viewIdToRemove));
	};

	return (
		<div className="container mx-auto">
			<div className="fixed top-40 right-4 z-50 flex space-x-2">
				<Button variant="outline" size="icon" onClick={handleAddView}>
					<Plus className="h-4 w-4" />
				</Button>
				<Button variant="outline" size="icon" onClick={() => handleRemoveView(views[views.length - 1])} disabled={views.length === 1}>
					<Minus className="h-4 w-4" />
				</Button>
			</div>
			<div className="mt-20 grid grid-flow-col gap-4">
				{views.map((viewId, index) => (
					<div key={viewId} className={`inline-block ${index !== 0 ? 'ml-4' : ''} ${index !== views.length - 1 ? 'mr-4' : ''}`} style={{ width: "900px" }}>
						<div className="h-full">
							<ArenaCompare onClose={() => handleRemoveView(viewId)} isCloseDisabled={views.length === 1} />
						</div>
					</div>
				))}
			</div>

		</div>
	);
};

export default Compare;
