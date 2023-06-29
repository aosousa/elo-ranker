const rankingDao = require('../dao/rankingDao');
const rankingService = {};

/**
 * Service layer to call the Data Access Object to get list of rankings
 * @param {Object} request Request data
 * @param {Function} getListCB Callback method
 */
rankingService.getList = (request, getListCB) => {
    rankingDao.getList(request, (error, result) => {
        if (error) {
            return getListCB(error);
        }

        return getListCB(null, result);
    });
};

/**
 * Service layer to call the Data Access Object to create a ranking
 * TODO: handle file upload
 * @param {Object} request Request data
 * @param {Function} createCB Callback method
 */
rankingService.create = (request, createCB) => {
    rankingDao.create(request, (error, result) => {
        if (error) {
            return createCB(error);
        }

        return createCB(null, result);
    });
};

/**
 * Service layer to call the Data Access Object to update one ranking
 * @param {Object} request Request data
 * @param {Function} updateCB Callback method
 */
rankingService.update = (request, updateCB) => {
    rankingDao.update(request, (error, result) => {
        if (error) {
            return updateCB(error);
        }

        return updateCB(null, result);
    });
};

/**
 * Service layer to call the Data Access Object to delete a ranking
 * @param {Object} request Request data
 * @param {Function} deleteCB Callback method
 */
rankingService.delete = (request, deleteCB) => {
    rankingDao.delete(request, (error, result) => {
        if (error) {
            return deleteCB(error);
        }

        return deleteCB(null, result);
    });
};

module.exports = rankingService;