import React, { useEffect,useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import api from '../api'
import ViewPDF from './ViewPDF';
import {Helmet} from "react-helmet-async"

const Article = (props) => {
    const { id } = useParams();
    const [article, setArticle] = useState([])
    const [file, setFile] = useState('')
    const [formattedDate, setFormattedDate] = useState('')

    useEffect(() => {
        api.getArticleById(id)
        .then((result) => {
           let article = result.data.article;
            setArticle(article)
            let vol = parseInt(article.volume_number.$numberDecimal * 10)/10
            setFile(encodeURI(`${origin}/articles/volume_${vol}/${article.url}`))
            let date = new Date(article.date)
            setFormattedDate((date.getUTCMonth()+1) + '/'+date.getUTCDate()+"/"+date.getUTCFullYear())
        })
        .catch(error => {
            console.error('Error retrieving article', error)
        })
    }, [id])

    return (
        <div className="container">
            <Helmet>
                <title>{`${article.headline} | PRINT | tworeporters.com`}</title>
                <meta name="description" content={`${article.headline} by ${article.author} published in {article.publication} on ${formattedDate}.  Included in ${article.volume}`} />
            </Helmet>
            <div className="text-right">
                <Link className="btn btn-primary btn-sm" to="/search">return to search results</Link>
            </div>
            <div className="article-container">
                <h2 className="article-headline">{article.headline}</h2>
                <div><a href={file} target="_blank" rel="noreferrer">View Original PDF</a></div>
                <div className="byline">
                    <div className="article-author">by: {article.author}</div>
                    <div className="article-date">Published: {formattedDate}</div>
                    <div className="article-publication">in: {article.publication}</div>
                    <div className="article-dateline">Dateline: {article.dateline}</div>
                    <div className="article-volume">{article.volume}</div>
                </div>
                <ViewPDF file={file} />
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(Article);