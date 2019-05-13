const Heading = () => {
	return(
		<div class="article-nav__heading">
			<h1>Dynamic Nav</h1>
			<p>I am a dynamic nav created by properties in a JSON.</p>
		</div>
	)
}

const Nav = () => {
	return(
		<div>I am the nav.</div>
	)
}

const ArticleNav = () => {
	return(
		<header className="article-nav__header">
			<Heading />
			<Nav />
		</header>
	)
}

ReactDOM.render(
	<ArticleNav/>,
	document.getElementById("app")
);