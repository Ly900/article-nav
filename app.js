const BreadCrumb = (props) => {
	return (
		<div className="article__breadcrumb">Active nav item: {props.category}</div>
	)
}

const Nav = () => {
	return (
		<div className="article__nav">I will be the actual nav.</div>
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