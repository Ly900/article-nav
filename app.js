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
				document.addEventListener("keyup", this.handleKeyPress, false)
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

	closeNav = () => {
		let listItems = document.getElementsByClassName("article__anchor");
		for (let listItem of listItems) {
			if ( listItem.classList.contains("article__anchor_active") ) {
				listItem.classList.add("article__anchor_expanded");
			} else {
				listItem.classList.remove("article__anchor_expanded", "article__anchor_active");
			}
		}
	}

	handleKeyPress = (e) => {
		if (this.state.navExpanded && e.keyCode === 27) {
		this.closeNav();
		this.toggleNav();
		}
	}

	handleClick = (e) => {
		let listItems = document.getElementsByClassName("article__anchor");
		const buttonClicked = e.target.classList.contains("article__icon") || e.target.classList.contains("article__nav-button");

		// If the left mouse button was not clicked, return and do nothing.
		if (e.button !== 0) {
			return false;
		}

		// If the nav is collapsed, expand all the list items. 
		if (!this.state.navExpanded) {
			let closestListItem = e.target.closest(".article__anchor");
		
			if ( closestListItem || buttonClicked) {
				for (let listItem of listItems) {
					listItem.classList.add("article__anchor_expanded");
				}
				this.toggleNav();
			}
			return;
		}

		// If the nav is expanded... 
		let closestListItem = e.target.closest(".article__anchor");

		// If an element inside the nav was clicked...
		if ( closestListItem ) {
			for (let listItem of listItems) {
				listItem.classList.remove("article__anchor_expanded", "article__anchor_active");
			}
			closestListItem.classList.add("article__anchor_expanded", "article__anchor_active");
			this.setActiveCategory();
			this.toggleNav();
		}

		// If the nav button or an area outside the nav is clicked, close the nav.
		if ( buttonClicked || !closestListItem) {
			this.closeNav();
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