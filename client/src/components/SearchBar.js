import React, { useState,useEffect } from 'react'
import {
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons'
import { faSearch } from '@fortawesome/pro-solid-svg-icons'
import { connect } from 'react-redux'
import { searchArticles } from '../actions/searchAction'
import api from '../api'

const SearchBar = (props) => {
    const [closed, setDropdownOpen] = useState(true)
    const [volumes, setVolumes] = useState([])
    const [volumesLoaded,setVolumesLoaded] = useState(false)
    const [publications, setPublications] = useState([])
    const [publicationsLoaded,setPublicationsLoaded] = useState(false)
    const [terms,setTerms] = useState(props.searchState.searchTerms)

    const handleToggle = () => setDropdownOpen(prevState => !prevState)

    const openClass = closed ? '' : ' caret-up'
    const classes = `text-center bordered${openClass}`

    const handleChange = (e) => {
        setTerms({
            ...terms,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        // this doesn't seem legit...
        props.searchState.searchTerms = terms;
        props.searchArticles(terms)
        setDropdownOpen(true)
    }

    const clearForm = e => {
        e.preventDefault()
        props.searchState.searchTerms = {};
        setTerms({})
        
    }


    useEffect(() => {
        api.getAllVolumes()
        .then((result) => {
            setVolumes(result.data)
            setVolumesLoaded(true)
        })
        .catch(error => {
            console.error('Error during retrieving volumes', error)
        })
        api.getAllPublications()
        .then((result) => {
            setPublications(result.data)
            setPublicationsLoaded(true)
        })
        .catch(error => {
            console.error('Error during retrieving publications', error)
        })
    }, [])

    return (
        <Row className="searchbar-wrapper">
            <Col xs md="12">
                <Form id="search-form">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <FontAwesomeIcon icon={faSearch} size="lg" color="#0069d9" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input type="search" name="includes" placeholder="Search includes these words or phrases" className="form-control-lg semi-transparent" onChange={handleChange} value={terms.includes || ''} />
                        <InputGroupAddon addonType="append">
                            <Button 
                                color="primary" 
                                type="submit"
                                onClick={handleClick}
                            >
                                Submit
                            </Button>
                        </InputGroupAddon>
                        <InputGroupAddon addonType="append">
                            <Button 
                                color="danger" 
                                type="submit"
                                onClick={clearForm}
                            >
                                Clear
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <FormGroup className={classes}>
                        <Button
                            className="advanced-search-button"
                            color="secondary"
                            id="advanced-search-form"
                            onClick={handleToggle}
                        >
                            more options
                            <FontAwesomeIcon icon={faAngleDown} size="lg" color="#ffffff" />
                        </Button>
                        <SlideDown className="full-width px-4 py-3 text-left advanced-search-slidedown" closed={closed} >
                            <FormGroup row>
                                <Col sm="12">
                                    Date Range
                                </Col>
                                <Col>
                                    <Label>From</Label>
                                    <Input 
                                        type="date" 
                                        name="startDate" 
                                        onChange={handleChange} 
                                        value={terms.startDate || ''}
                                        min="1958-01-01" 
                                        max="2000-12-31"
                                    />
                                </Col>
                                <Col>
                                    <Label>To</Label>
                                    <Input 
                                        type="date" 
                                        name="endDate" 
                                        onChange={handleChange} 
                                        value={terms.endDate || ''}
                                        min="1958-01-01" 
                                        max="2000-12-31"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <Label>Volume</Label>
                                    {volumesLoaded && 
                                        <Input type="select" name="volume_number" onChange={handleChange} value={terms.volume_number || ''}>
                                            <option>Any</option>
                                            {volumes.map((v, index) => {
                                                let volumeNumber = parseFloat(v.volume_number.$numberDecimal)
                                                return (
                                                    <option key={index} value={volumeNumber}>
                                                        {v.volume}
                                                    </option>
                                                )})
                                            }
                                        </Input>
                                    }
                                </Col>
                                <Col>
                                    <Label>Publication</Label>
                                    {publicationsLoaded && 
                                        <Input type="select" name="publication" onChange={handleChange} value={terms.publication || ''}>
                                            <option>Any</option>
                                            {publications.map((publication, index) => (
                                                <option key={index} value={publication}>
                                                    {publication}
                                                </option>
                                            ))}
                                        </Input>
                                    }
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <Label>Does not contain the words</Label>
                                    <Input name="excludes" type="text" onChange={handleChange} value={terms.excludes || ''} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col className="button-column">
                                    <Button 
                                        type="submit"
                                        onClick={handleClick}
                                        color="primary" 
                                        size="lg" 
                                        block
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </FormGroup>
                        </SlideDown>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    )
}

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps, {searchArticles})(SearchBar)