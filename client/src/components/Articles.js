import React from 'react';
import { Container } from 'reactstrap';
import { connect, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const Articles = (props) => {
    const articles = useSelector(state => state.searchState.articles)
    const searched = useSelector(state => state.searchState.searched)
    const error = useSelector(state => state.searchState.error)
    const message = useSelector(state => state.searchState.message)
    let results = ''

    if(!searched) {
        return ('')
    }
    else if(error && error !== '') {
        results = error
    }
    else if(articles.length) {
        
        results = articles.map((article,index) => {
            // headline author date publication dateline volume url
            let key = `article-${index}`
            let date = new Date(article.date)
            let formattedDate = (date.getUTCMonth()+1) + '/'+date.getUTCDate()+"/"+date.getUTCFullYear()
            let route = `/article/${article._id}`
            return (
                <div className="article" key={key}>
                    <Link className="article-title" to={route} >
                        {article.headline}
                    </Link>
                    <div className="byline">
                        <div className="article-author">by: {article.author}</div>
                        <div className="article-date">Published: {formattedDate}</div>
                        <div className="article-publication">in: {article.publication}</div>
                        <div className="article-dateline">Dateline: {article.dateline}</div>
                        <div className="article-volume">{article.volume}</div>
                    </div>
                    <Link className="btn btn-primary btn-sm" to={route} >
                        View Article
                    </Link>
                </div>
            )
        })
    }
    else if (searched && message !== '') {
        results = message
    }
    else if (searched && !articles.length) {
        results = 'No articles found.'
    }

    return (
        <Container className="articles-container">
            <h3>{props.title}</h3>
            <h4>{articles.length} Articles Found</h4>
            <div className="results-container">
                {results}
            </div>
        </Container>
    );
};

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(Articles);