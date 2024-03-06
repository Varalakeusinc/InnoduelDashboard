import * as React from "react";
import { Loader2 } from "lucide-react";

/**
 *  Loading indicator to use globally in app
 * @returns Loading indicator JSX
 */
const LoadingIndicator = () => {
	const [rotation, setRotation] = React.useState<number>(0);

	React.useEffect(() => {
		const intervalId = setInterval(() => {
			// Update rotation by a small increment every millisecond
			setRotation(prevRotation => prevRotation + 1);
		}, 1); // Interval of 1 millisecond

		return () => {
			clearInterval(intervalId); // Cleanup on component unmount
		};
	}, []);

	return (
		<Loader2
			style={{
				transform: `rotate(${rotation}deg)`,
				color: "darkorange",
			}}
			size={50}
		/>
	);
};

export default LoadingIndicator;
