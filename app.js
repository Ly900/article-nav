const BreadCrumb = (props) => {
	return (
		<div className="article__breadcrumb">Active nav item: <br/> <span class="article__category"><strong>{props.activeCategory}</strong></span> </div>
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

const ArticleTile = (props) => {
	// console.log("props.article", props.article.id);
	return(
		<div class="article__tile d-flex col flex-column align-items-center justify-content-start" key={props.article.id}>
			<picture class="article__tile-picture"><img src={`./images/${props.article.category.toLowerCase()}.png`} class="article__tile-img"/></picture>
			<span class="article__tile-content article__tile-category">{props.article.category}</span>
			<span class="article__tile-content article__tile-title"><strong>{props.article.title}</strong></span>
		</div>
	)
}

const ArticleTiles = (props) => {
		return(
			<div class="container-fluid article__tiles">
				<div class="row">

					{ props.articles.map( article => {
						if (props.activeCategory.toLowerCase().trim() !== "all") {
							if ( article.category.toLowerCase().trim() === props.activeCategory.toLowerCase().trim() ) {
								return (
									<ArticleTile article={article} />
								)
							}
						} else {
							return (
								<ArticleTile article={article} />
							)
						}

						})
					}
				</div>
			</div>
		)
	}
// }

class ArticleComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			navExpanded: false,
			loading: true,
			articles: null,
			activeCategory: ""
		}
	}

	// handleClick = (e) => {
	// 	let articleNav = document.getElementsByClassName(".article__nav");
	// 	console.log(e.target);
	// 	if ( e.target.closest(".article__nav") || !this.state.navExpanded) {
	// 		return;
	// 	}
	// 	if (this.state.navExpanded) {
	// 		this.toggleNav();
	// 	}
	// }

	componentDidMount = () => {
		fetch("./article-feed.json")
			.then(response => response.json())
			.then(data => {
				this.setState({ 
					loading: false,
					articles: data.articles,
					activeCategory: "All",
					navExpanded: false
				})
				document.addEventListener("mousedown", this.handleClick, false)
			})
	}

	toggleNav = () => {
		this.setState(prevState => ({
			navExpanded: !prevState.navExpanded
		}));
	}

	// Set the state's activeCategory
	setActiveCategory = () => {
		const activeItem = document.getElementsByClassName("article__anchor_active");
		this.setState({
			activeCategory: activeItem[0].innerText
		});
	}

	handleClick = (e) => {
		console.log(e.target);
		console.log("this.state.navExpanded: ", this.state.navExpanded);

		const listItems = document.getElementsByClassName("article__anchor");

		// If the nav is collapsed and the nav was clicked, expand all the list items. 
		if (!this.state.navExpanded && e.button === 0) {
			let closestListItem = e.target.closest(".article__anchor");
			if ( closestListItem ) {
				for (let listItem of listItems) {
					listItem.classList.add("article__anchor_expanded");
				}
				this.toggleNav();
				console.log("this.state.navExpanded: ", this.state.navExpanded);
			}
		}

		// If the nav is expanded... display the list item that was clicked and collapse all the other list items.
		else {

			let closestListItem = e.target.closest(".article__anchor");
			console.log(e.target);

			// If an element inside the nav was clicked...
			if ( closestListItem ) {
				for (let listItem of listItems) {
					listItem.classList.remove("article__anchor_expanded", "article__anchor_active");
				}
				closestListItem.classList.add("article__anchor_expanded", "article__anchor_active");
			}

			// If the nav button was clicked...
			if ( e.target.classList.contains("article__icon") || e.target.classList.contains("article__nav-button") ) {
				for (let listItem of listItems) {
					if ( listItem.classList.contains("article__anchor_active") ) {
						listItem.classList.add("article__anchor_expanded");
					}
					if ( !listItem.classList.contains("article__anchor_active") ) {
						listItem.classList.remove("article__anchor_expanded");
					}
				}
			}

			this.setActiveCategory();

			this.toggleNav();

		}
	}

	removeDuplicates = (myArr, prop) => {
		return myArr.filter((obj, pos, arr) => {
			return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
		});
	}

	render() {
		let iconClassName = this.state.navExpanded ? "fa-chevron-up" : "fa-chevron-down";
		let articlesArray = !this.state.loading ? Object.keys(this.state.articles).map((k) => this.state.articles[k]) : "Loading";
		let uniqueCategories = !this.state.loading ? this.removeDuplicates(articlesArray, "category") : "";

		return(
			<header className="article__header">

				<Heading/>
				<BreadCrumb activeCategory={this.state.activeCategory}/>

				<div className="article__nav-container">
					<nav className="article__nav" aria-label="article navigation">
						<button className="article__nav-button"><i className={`fas ${iconClassName} article__icon`}></i></button>
						<ul className="article__list">
							<li className={`article__list-item`}>
								{/* <a href="#" className="article__anchor article__anchor_active" onClick={(e) => this.handleClick(e)}> */}
								<a href="#" className="article__anchor article__anchor_active">
									<picture class="article__list-item-picture"><img src={`./images/all.png`} class="article__list-item-img"/></picture>
									<span class="article__list-item-category">All</span>
								</a>
							</li>
							{
							!this.state.loading ? uniqueCategories.map( (key, index) => {
								return(
									<li key={key} className={`article__list-item`}>
										{/* <a href="#" className="article__anchor" onClick={(e) => this.handleClick(e)}> */}
										<a href="#" className="article__anchor">
											<picture class="article__list-item-picture"><img src={`./images/${key.category.toLowerCase()}.png`} class="article__list-item-img"/></picture>
											<span class="article__list-item-category">{key.category}</span>
										</a>
									</li>
								)
							}) : " "
							}
						</ul>
					</nav>

				</div>
				
				{
					!this.state.loading ? <ArticleTiles activeCategory={this.state.activeCategory} articles={this.state.articles} loading={this.state.loading}/> : ""
				}

				

				
				{/* <ArticleTiles displayTiles={}/> */}

			</header>
		)
	}
}

ReactDOM.render(
	<ArticleComponent/>,
	document.getElementById("article")
);