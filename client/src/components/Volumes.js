import React, { useState,useEffect } from 'react'
import api from '../api'
import {Helmet} from "react-helmet-async"

const Volumes = (props) => {
    const [volumes, setVolumes] = useState([])
    const [volumesLoaded,setVolumesLoaded] = useState(false)

    useEffect(() => {
        api.getAllVolumes()
        .then((result) => {
            setVolumes(result.data)
            setVolumesLoaded(true)
        })
        .catch(error => {
            console.error('Error during retrieving volumes', error)
        })
    }, [])

    return (
        <div className="container">
            <Helmet>
                <title>Volumes | newspaper clippings grouped by timeframe | PRINT | tworeporters.com</title>
                <meta name="description" content="View PDF archives of the newspaper clippings written by Joe Albright and Marcia Kunstel.  The volumes represent significant periods within the reporting careers of the award-winning journalists." />
            </Helmet>
            <h2 className="page-title">Volumes</h2>
            <div className="page-intro">
                Please click on the volume you would like to open in PDF form.  Please note that due to the large size of the Volumes, it takes a few seconds for them to load.
            </div>
            <div className="volumes-container">
                {volumesLoaded && 
                    volumes.map((v, index) => {
                        let url = `/volume-pdfs/${v.filename}`
                        let key = `volume-${index}`
                        let src = url.replace(/\.pdf$/, '.jpg');
                        return (
                            <div className="volume-link-wrapper" key={key} >
                                <a href={url} className="volume-name-link" target="_blank" rel="noreferrer">
                                    <img src={src} className="volume-cover" alt={v.volume} />
                                    <div className="volume-title">{v.volume}</div>
                                </a>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Volumes;