import React, { Fragment } from 'react';
import {Route} from 'react-router-dom';
import Article from './Article';
import Articles from './Articles';
import Contact from './Contact';
import { connect } from 'react-redux';

const ArticlesContainer = (props) => {
    console.log(props);
    let articleUrls = props.searchState.searched && props.searchState.results? props.searchState.results.map( (article) => {
        return (
            <Route key={article.url} path={`/articles/${article.url}`}  render={() => <Article article={article} />} />
        );
    }) : [];

    return (
        <Fragment>
            <Route path="/contact" render={() => <Contact title="Contact Us" />} />
            {articleUrls}
            <Articles title={props.title} />  
        </Fragment>
    )
};
const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(ArticlesContainer);