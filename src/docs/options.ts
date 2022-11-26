import { healthCheck, home } from "./healthcheck.api.docs";
import { version } from '../../package.json';

import {
    create_dynamicSignupForm,
    get_dynamicSignupForm,
    login,
    logout,
    registration,
    registrationRequestBody,
    changePassword,
    changePasswordRequestBody,
    loginRequestBody,
    dynamicSignupFormRequestBody
} from "./auth.api.docs";
import {
    createCrud, createCrudWithFile, crudDelete, crudList, crudUpdate, crudUpdateWithFile, crudRequestBodyWithFile, crudRequestBody,
    crudUpdatesRequestBodyWithFile,
    crudSingle,
} from "./crud.api.docs";


// define Swagger options with specific properties
const options = {
    openapi: '3.0.1',
    info: {
        title: "Unislove API Docs",
        description: "Unislove backend applications api documentation with in details API description",
        version,
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
        },
    },
    server: [
        {
            url: 'http://localhost:3002',
            description: 'development Server',
        },
    ],
    schemes: ['https', 'http'],
    tags: [
        {
            name: 'Home',
        },
        {
            name: 'Authentication',
        },
        {
            name: 'Crud',
        }
    ],
    paths: {
        '/': {
            get: home
        },
        '/healthCheck': {
            get: healthCheck,
        },
        //auth
        '/api/v1/auth/register': {
            post: registration
        },
        '/api/v1/auth/changePassword': {
            put: changePassword
        },
        '/api/v1/auth/login': {
            post: login
        },
        '/api/v1/auth/logout': {
            get: logout
        },
        '/api/v1/auth/dynamicSignupForm': {
            post: create_dynamicSignupForm,
            get: get_dynamicSignupForm
        },
        //crud
        '/api/v1/crud/{model_name}': {
            post: createCrud,
            get: crudList
        },
        '/api/v1/crud/{model_name}/{id}': {
            get: crudSingle,
            put: crudUpdate,
            delete: crudDelete
        },
        '/api/v1/crud/{model_name}/withfile': {
            post: createCrudWithFile,
            put: crudUpdateWithFile
        },
        
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            registrationRequestBody,
            loginRequestBody,
            changePasswordRequestBody,
            dynamicSignupFormRequestBody,
            crudRequestBody,
            crudRequestBodyWithFile,
            crudUpdatesRequestBodyWithFile,
        },
    },
};

export { options };
