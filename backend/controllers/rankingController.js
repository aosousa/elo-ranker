const express = require('express');
const path = require('path');
const rankingController = express.Router();
const rankingService = require('../services/rankingService');
const authMiddleware = require('../middleware/auth');

/**
 * Controller method to get a list of rankings
 * @param {Object} request Request data
 * @param {Object} response Response object
 */
const getRankings = (request, response) => {
    rankingService.getList(request, (error, list) => {
        if (error) {
            response.status(500).send({
                status: false,
                data: null,
                error
            });
        } else {
            response.status(200).send({
                status: true,
                data: list,
                error: null
            });
        }
    });
}

/**
 * Controller method to create a ranking
 * TODO: handle file upload
 * @param {Object} request Request data
 * @param {*} response 
 */
const createRanking = (request, response) => {
    if (request.files) {
        const rankingFile = request.files.ranking;
        if (path.extname(rankingFile.name) !== '.json') {
            response.status(500).send({
                status: false,
                data: null,
                error: 'Invalid file extension'
            })
            return
        }

        rankingFile.mv(`./uploads/${rankingFile.name}`);
        request.body.ranking = rankingFile.data.toString().trim().replace(/\s+/g, ' ');
    }

    rankingService.create(request, (error, result) => {
        if (error) {
            response.status(500).send({
                status: false,
                data: null,
                error
            });
        } else {
            response.status(200).send({
                status: true,
                data: result,
                error: null
            });
        }
    });
}

/**
 * Controller method to update a ranking
 * @param {Object} request Request data
 * @param {Object} response Response object
 */
const updateRanking = (request, response) => {
    rankingService.update(request, (error, count) => {
        if (error) {
            response.status(500).send({
                status: false,
                data: null,
                error
            });
        } else {
            if (count === 0) {
                response.status(500).send({
                    status: false,
                    data: null,
                    error: null
                });
            } else {
                response.status(200).send({
                    status: true,
                    data: null,
                    error: null
                });
            }
        }
    });
}

/**
 * Controller method to delete a ranking
 * @param {Object} request Request data
 * @param {Object} response Response object
 */
const deleteRanking = (request, response) => {
    rankingService.delete(request, (error, result) => {
        if (error) {
            response.status(500).send({
                status: false,
                data: null,
                error
            });
        } else {
            response.status(200).send({
                status: true,
                data: result,
                error: null
            });
        }
    });
}

rankingController.get('/', getRankings);
rankingController.post('/', authMiddleware.authenticateToken, createRanking);
rankingController.put('/:id', authMiddleware.authenticateToken, updateRanking);
rankingController.delete('/:id', authMiddleware.authenticateToken, deleteRanking);

module.exports = rankingController;