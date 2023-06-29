const models = require('../models/index');
const rankingDao = {};

/**
 * Fetch data for ranking list
 * @param {Object} request Request data
 * @param {Function} getListCB Callback method
 */
rankingDao.getList = (request, getListCB) => {
    models.Ranking.findAll().then(
        (rankings) => getListCB(null, rankings),
        (error) => getListCB(error.parent)
    );
};

/**
 * Create a ranking
 * TODO: handle file upload
 * @param {Object} request Request data
 * @param {Function} createCB Callback method
 */
rankingDao.create = (request, createCB) => {
    models.Ranking.create(request.body).then(
        (ranking) => createCB(null, ranking),
        (error) => createCB(error.parent)
    );
};

/**
 * Update a ranking by ID
 * @param {Object} request Request data
 * @param {Function} updateCB Callback method
 */
rankingDao.update = (request, updateCB) => {
    models.Ranking.update(request.body, {
        where: {
            id: request.params.id
        }
    }).then(
        (count) => updateCB(null, count),
        (error) => updateCB(error.parent)
    );
};

/**
 * Delete a ranking by ID
 * @param {Object} request Request data
 * @param {Function} deleteCB Callback method
 */
rankingDao.delete = (request, deleteCB) => {
    models.Ranking.destroy({
        where: {
            id: request.params.id
        }
    }).then(
        () => deleteCB(null, true),
        (error) => deleteCB(error.parent)
    );
};

module.exports = rankingDao;