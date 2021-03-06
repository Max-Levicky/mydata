import {handler} from './create'
import {Data} from '../data.model';
import {HandlerResponse} from '../../aws/handlerResponse';
import uuid = require('uuid');

describe('Create handler test', () => {
    it('should return 400 response when name contains incorrect symbols', done => {
        const data: Data = {
            name: 'incorrect name',
            value: 'aValue',
            type: 'other'
        };
        const event = {
            body: JSON.stringify(data),
            requestContext: {
                authorizer: {
                    id: uuid()
                }
            }
        };
        const callback = (e, response) => {
            expect(response).toBeInstanceOf(HandlerResponse);
            expect(response.statusCode).toEqual(400);
            const responseErrors = JSON.parse(response.body);
            expect(responseErrors).toHaveLength(1);
            expect(responseErrors[0].property).toEqual('name');
            expect(responseErrors[0].constraints.matches).toEqual('Name can contain only letters, numbers and dash.');
            done();
        };

        expect.hasAssertions();
        handler(event, undefined, callback)
    });
});
