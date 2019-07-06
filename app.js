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

class ArticleTiles extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			articles: null,
			activeCategory: ""
		}
	}

	displayTiles(cat) {
		console.log("active category: ", this.props.activeCategory);
		console.log("articles: ", this.props.articles);
		this.setState({
			loading: false,
			articles: this.props.articles,
			activeCategory: this.props.activeCategory
		})
	}

	render() {

		return(
			<div class="container-fluid article-tiles">
				
					{ !this.state.loading && 
						this.state.articles.map( article => {
							return (
								<div class="tile" key={article.id}>{article.title}</div>
							)
						})
					}

			</div>
		)
	}
}

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
				console.log("step 1");
				this.setState({ 
					loading: false,
					articles: data.articles,
					activeCategory: "All"
				})
				console.log("step 2");
				this.refs.tiles.displayTiles(this.state.activeCategory)
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

	handleListItemClick = (e) => {
		let listItems = document.getElementsByClassName("article__anchor");
		// console.log(e.target.textContent);

		// If the nav is collapsed, expand all the list items. 
		if (!this.state.navExpanded) {
			for (let listItem of listItems) {
				listItem.classList.add("article__anchor_expanded");
			}
			this.toggleNav();
		}

		// If the nav is expanded... display the list item that was clicked and collapse all the other list items.
		else {

			// If a list item is clicked...
			if ( e.target.classList.contains("article__anchor") ) {
				for (let listItem of listItems) {
					listItem.classList.remove("article__anchor_expanded", "article__anchor_active");
				}
				e.target.classList.add("article__anchor_expanded", "article__anchor_active");
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
						<button className="article__nav-button" onClick={(e) => this.handleListItemClick(e)}><i className={`fas ${iconClassName} article__icon`}></i></button>
						<ul className="article__list">
							<li className={`article__list-item`}>
								<a href="#" className="article__anchor article__anchor_active" onClick={(e) => this.handleListItemClick(e)}>
									<picture class="article__list-item-picture"><img src={`./images/all.png`} class="article__list-item-img"/></picture>
									<span class="article__list-item-category">All</span>
								</a>
							</li>
							{
							!this.state.loading ? uniqueCategories.map( (key, index) => {
								return(
									<li key={key} className={`article__list-item`}>
										<a href="#" className="article__anchor" onClick={(e) => this.handleListItemClick(e)}>
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

				<ArticleTiles ref="tiles" activeCategory={this.state.activeCategory} articles={this.state.articles}/>

			</header>
		)
	}
}

ReactDOM.render(
	<ArticleComponent/>,
	document.getElementById("article")
);