// swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Next.js API with Swagger',
    version: '1.0.0',
    description: 'API documentation for Next.js project',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  components: {
    schemas: {
      Workout: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Workout ID',
          },
          name: {
            type: 'string',
            description: 'Name of the workout',
          },
          exercises: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/CustomExercise',
            },
          },
          // Add other properties as per your Workout model
        },
      },
      CustomExercise: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Exercise ID',
          },
          name: {
            type: 'string',
            description: 'Name of the exercise',
          },
          // Add other properties as per your CustomExercise model
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./pages/api/**/*.ts', './models/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerDocs = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at /api-docs');
};

export default setupSwaggerDocs;

