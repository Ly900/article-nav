const BreadCrumb = (props) => {
	return (
		<div className="article__breadcrumb">Active nav item: <br/> <strong>{props.category}</strong> </div>
	)
}

const Nav = () => {
	return (
		<nav className="article__nav" aria-label="article navigation">
		<button className="article__nav-button"><i className="icon-down"></i></button>
		<ul className="article__list">
			<li className="article__list-item"><a href="">Checking</a></li>
			<li className="article__list-item"><a href="">Credit/Debit Cards</a></li>
			<li className="article__list-item"><a href="">Certificates/IRAs/Trust</a></li>
		</ul>
	</nav>
	)
}

const NavWrapper = (props) => {
	return(
		<div className="article__nav-container">
			<Nav />
			<BreadCrumb category={props.category}/>
		</div>
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
	state = {
		activeCategory: "Finances"
	}

	render() {
		return(
			<header className="article__header">
				<Heading/>
				<NavWrapper category={this.state.activeCategory}/>
			</header>
		)
	}
}

ReactDOM.render(
	<ArticleComponent/>,
	document.getElementById("article")
);