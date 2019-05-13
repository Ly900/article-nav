const Heading = () => {
	return(
		<div class="article__heading">
			<h1>Dynamic Nav</h1>
			<p>I am a dynamic nav created by properties in a JSON.</p>
		</div>
	)
}

const NavWrapper = () => {
	return(
		<div className="article__nav-wrapper">
			<Nav />
			<BreadCrumb />
		</div>
	)
}

const BreadCrumb = () => {
	return (
		<div className="article__breadcrumb">I tell you which is the active nav item.</div>
	)
}

const Nav = () => {
	return (
		<div className="article__nav">I will be the actual nav.</div>
	)
}




const ArticleComponent = () => {
	return(
		<header className="article__header">
			<Heading />
			<NavWrapper />
		</header>
	)
}

ReactDOM.render(
	<ArticleComponent/>,
	document.getElementById("article")
);