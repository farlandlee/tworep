const Volume = require('../models/volume-model')

getVolumes = async (req, res) => {
    await Volume.find(
        {},
        { _id: 0, volume_number: 1, volume: 1, filename: 1 }, 
        { sort: { volume_number : "asc" }}, 
        (err, volumes) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!volumes.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `No volumes found.` })
            }
            return res.status(200).json(volumes)
        }
    ).catch(err => console.log(err))
}

module.exports = {
    getVolumes
}