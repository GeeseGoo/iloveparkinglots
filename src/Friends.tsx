import React, { useState } from "react";
import { SearchBar } from "./components/searchBar";
import "./Friends.css";
import friends from "./assets/friends.svg";

function Friends() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleClass = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="friends-container">
			{/* <SearchBar barcolour={'blue'}/> */}
			<div className={`friends-content ${isOpen ? "open" : ""}`}>
				<SearchBar />
			</div>

			<button className="friends-button" onClick={toggleClass}>
				<img src={friends} />
			</button>

			<div className="hidden"></div>
		</div>
	);
}

export default Friends;
