const BreadCrumb = (props) => {
	return (
		<div className="article__breadcrumb">Active nav item: <br/> <strong>{props.category}</strong> </div>
	)
}

const Heading = () => {
	return(
		<div class="article__heading-container">
			<h1 class="article__heading">Dynamic Nav</h1>
			<p>I am a dynamic nav created by properties in a JSON.</p>
		</div>
	)
}

class ArticleComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// navExpanded: false,
			navExpanded: false,
			activeCategory: "Finances",
			activeListItem: null
		}
	}

	handleListItemClick = (e) => {
		let listItems;

		// If the nav is collapsed... 
		if (!this.state.navExpanded) {
			// listItems = document.getElementsByClassName("article__anchor");

			listItems = document.getElementsByClassName("article__anchor");
			console.log(listItems);

			for (let listItem of listItems) {
				listItem.classList.add("article__anchor_expanded");
			}

		}
		
		// If the nav is expanded...
		else {
			listItems = document.getElementsByClassName("article__anchor");

			// Close all the list items.
			for (let listItem of listItems) {
				listItem.classList.remove("article__anchor_expanded");
			}

			// Expand the list item that was clicked.
			e.target.classList.add("article__anchor_expanded");

			// Remove active class from previous active list item.
			listItems = document.getElementsByClassName("article__anchor");
			for (let listItem of listItems) {
				listItem.classList.remove("article__anchor_active");
			}

			// Add active class to list item clicked.
			e.target.classList.add("article__anchor_active");
		}

		this.setState(prevState => ({
			navExpanded: !prevState.navExpanded
		}));
	}

	render() {
		let iconClassName = this.state.navExpanded ? "fa-chevron-up" : "fa-chevron-down";
		let listItemClass = this.state.navExpanded ? "article__list-item_expanded" : "";
		let anchorItemClass = this.state.navExpanded ? "article__anchor_expanded" : "";
		
		console.log("navExpanded: ", this.state.navExpanded);

		return(
			<header className="article__header">

				<Heading/>

				<div className="article__nav-container">
					<nav className="article__nav" aria-label="article navigation">
						<button className="article__nav-button"><i className={`fas ${iconClassName} article__icon`}></i></button>
						<ul className="article__list">
							{/* <li className={`article__list-item article__list-item_active ${listItemClass}`}>
								<a href="#" className={`article__anchor article__anchor_active ${anchorItemClass}`}
								onClick={(e) => {this.handleListItemClick(e)}}>Checking</a>
							</li>
							<li className={`article__list-item ${listItemClass}`}>
								<a href="#" className={`article__anchor ${anchorItemClass}`}
								onClick={(e) => {this.handleListItemClick(e)}}>Credit/Debit Cards</a>
							</li>
							<li className={`article__list-item ${listItemClass}`}>
								<a href="#" className={`article__anchor ${anchorItemClass}`}
								onClick={(e) => {this.handleListItemClick(e)}}>Certificates/IRAs/Trust</a>
							</li> */}

							<li className={`article__list-item`}>
								<a href="#" className={`article__anchor article__anchor_active`}
								onClick={(e) => this.handleListItemClick(e)}>Checking</a>
							</li>
							<li className={`article__list-item`}>
								<a href="#" className={`article__anchor`}
								onClick={(e) => this.handleListItemClick(e)}>Credit</a>
							</li>
							<li className={`article__list-item`}>
								<a href="#" className={`article__anchor`}
								onClick={(e) => this.handleListItemClick(e)}>Blah</a>
							</li>

							{/* {console.log(this)} */}
							{/* <ListItem product="Checking" navExpanded={this.state.navExpanded} onClick={ArticleComponent.handleListItemClick} /> */}
							{/* <ListItem product="Credit Cards" navExpanded={this.state.navExpanded} onClick={(e) => {this.handleListItemClick(e)}}/> */}
							{/* <ListItem product="Loans" navExpanded={this.state.navExpanded} onClick={(e) => {this.handleListItemClick(e)}}/> */}
						</ul>
					</nav>

					<BreadCrumb />
				</div>

			</header>
		)
	}
}

ReactDOM.render(
	<ArticleComponent/>,
	document.getElementById("article")
);