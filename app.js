const BreadCrumb = (props) => {
	return (
		<div className="article__breadcrumb">Active nav item: <br/> <strong>{props.activeCategory}</strong> </div>
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
		let listItems = document.getElementsByClassName("article__anchor");

		// If the nav is collapsed, expand all the list items. 
		if (!this.state.navExpanded) {
			for (let listItem of listItems) {
				listItem.classList.add("article__anchor_expanded");
			}

			this.setState(prevState => ({
				navExpanded: !prevState.navExpanded
			}));

		}
		// If the nav is expanded, display the list item that was clicked and collapse all the other list items.
		else {
			for (let listItem of listItems) {
				listItem.classList.remove("article__anchor_expanded", "article__anchor_active");
			}
			e.target.classList.add("article__anchor_expanded", "article__anchor_active");

			// Set the state's activeCategory
			const activeItem = document.getElementsByClassName("article__anchor_active");

			this.setState(prevState => ({
				navExpanded: !prevState.navExpanded,
				activeCategory: activeItem[0].innerText
			}));

		}
	}

	render() {
		let iconClassName = this.state.navExpanded ? "fa-chevron-up" : "fa-chevron-down";
		let listItemClass = this.state.navExpanded ? "article__list-item_expanded" : "";
		let anchorItemClass = this.state.navExpanded ? "article__anchor_expanded" : "";
		
		console.log("navExpanded: ", this.state.navExpanded);

		return(
			<header className="article__header">

				<Heading/>
				<BreadCrumb activeCategory={this.state.activeCategory}/>

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

				</div>

			</header>
		)
	}
}

ReactDOM.render(
	<ArticleComponent/>,
	document.getElementById("article")
);