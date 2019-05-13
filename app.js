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
			navExpanded: true,
			activeCategory: "Finances"
		}
	}

	handleListItemClick = () => {
		this.setState(prevState => ({
			navExpanded: !prevState.navExpanded
		}));
		// console.log("navExpanded: ", this.state.navExpanded);
	}

	render() {
		let iconClassName = this.state.navExpanded ? "fa-chevron-down" : "fa-chevron-up";
		console.log(this.state.navExpanded);

		return(
			<header className="article__header">

				<Heading/>

				<div className="article__nav-container">
					<nav className="article__nav" aria-label="article navigation">
						<button className="article__nav-button"><i className={`fas ${iconClassName} article__icon`}></i></button>
						<ul className="article__list article__list_expanded">
							<li className="article__list-item article__list-item_expanded">
								<a href="#" className="article__anchor article__anchor_active" onClick={this.handleListItemClick}>Checking</a>
							</li>
							<li className="article__list-item article__list-item_expanded">
								<a href="#" className="article__anchor article__anchor_not-active" onClick={this.handleListItemClick}>Credit/Debit Cards</a>
							</li>
							<li className="article__list-item article__list-item_expanded">
								<a href="#" className="article__anchor article__anchor_not-active" onClick={this.handleListItemClick}>Certificates/IRAs/Trust</a>
							</li>
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