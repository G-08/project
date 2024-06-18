import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "../src/app/api", // define api folder under app folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Swagger API Example",
        version: "1.0",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [],
      paths: {
        "/auth/changePassword": {
          put: {
            tags: ["auth"],
            summary: "Change password",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      oldPassword: { 
                        type: "string",
                        example: "oldpassword123",
                      },
                      newPassword: { 
                        type: "string",
                        example: "newpassword123",
                      },
                    },
                    required: ["oldPassword", "newPassword"],
                  },
                },
              },
            },
            responses: {
              200: {
                description: "Password changed successfully",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Password changed successfully",
                        },
                      },
                    },
                  },
                },
              },
              400: {
                description: "Invalid input",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Invalid input",
                        },
                      },
                    },
                  },
                },
              },
              401: {
                description: "Unauthorized",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Not authorized",
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Internal server error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Internal server error",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/auth/deleteAccount": {
          delete: {
            tags: ["auth"],
            summary: "Delete user account",
            parameters: [
              {
                name: "userId",
                in: "query",
                required: true,
                schema: {
                  type: "string",
                },
                description: "ID of the user to be deleted",
              },
            ],
            responses: {
              200: {
                description: "Account deleted successfully",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Account deleted successfully",
                        },
                      },
                    },
                  },
                },
              },
              400: {
                description: "Invalid input",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Invalid input",
                        },
                      },
                    },
                  },
                },
              },
              401: {
                description: "Unauthorized",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Not authorized",
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Internal server error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Internal server error",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/auth/deleteScheda": {
        delete: {
            tags: ["auth"],
            summary: "Delete user account and associated data",
            description: "Delete user account and associated data",
            parameters: [
            {
                name: "userId",
                in: "query", // Consider using "path" instead of "query" if this is meant to be part of the URL path
                required: true,
                schema: {
                type: "string",
                },
                description: "ID of the user",
            },
            ],
            responses: {
            200: {
                description: "Account deleted successfully",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Account deleted successfully",
                        },
                    },
                    },
                },
                },
            },
            400: {
                description: "Invalid input",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Invalid input",
                        },
                    },
                    },
                },
                },
            },
            401: {
                description: "Unauthorized",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Not authorized",
                        },
                    },
                    },
                },
                },
            },
            404: {
                description: "User not found",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "User not found",
                        },
                    },
                    },
                },
                },
            },
            500: {
                description: "Internal server error",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Internal server error",
                        },
                    },
                    },
                },
                },
            },
            },
        },
        },

        "/auth/getScheda": {
            get: {
                tags: ["auth"],
                summary: "Get user's scheda",
                parameters: [
                {
                    name: "userId",
                    in: "query",
                    required: true,
                    schema: {
                    type: "string",
                    },
                    description: "ID of the user",
                },
                ],
                responses: {
                200: {
                    description: "User's scheda data",
                    content: {
                    "application/json": {
                        schema: {
                        type: "object",
                        properties: {
                            data: {
                            type: "object",
                            properties: {
                                _id: {
                                type: "string",
                                },
                                userEmail: {
                                type: "string",
                                },
                                gambe: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                    _id: {
                                        type: "string",
                                    },
                                    exercises: {
                                        type: "array",
                                        items: {
                                        type: "object",
                                        properties: {
                                            _id: {
                                            type: "string",
                                            },
                                            name: {
                                            type: "string",
                                            },
                                        },
                                        },
                                    },
                                    },
                                },
                                },
                                schiena: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                    _id: {
                                        type: "string",
                                    },
                                    exercises: {
                                        type: "array",
                                        items: {
                                        type: "object",
                                        properties: {
                                            _id: {
                                            type: "string",
                                            },
                                            name: {
                                            type: "string",
                                            },
                                        },
                                        },
                                    },
                                    },
                                },
                                },
                                petto: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                    _id: {
                                        type: "string",
                                    },
                                    exercises: {
                                        type: "array",
                                        items: {
                                        type: "object",
                                        properties: {
                                            _id: {
                                            type: "string",
                                            },
                                            name: {
                                            type: "string",
                                            },
                                        },
                                        },
                                    },
                                    },
                                },
                                },
                                braccia: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                    _id: {
                                        type: "string",
                                    },
                                    exercises: {
                                        type: "array",
                                        items: {
                                        type: "object",
                                        properties: {
                                            _id: {
                                            type: "string",
                                            },
                                            name: {
                                            type: "string",
                                            },
                                        },
                                        },
                                    },
                                    },
                                },
                                },
                                addome: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                    _id: {
                                        type: "string",
                                    },
                                    exercises: {
                                        type: "array",
                                        items: {
                                        type: "object",
                                        properties: {
                                            _id: {
                                            type: "string",
                                            },
                                            name: {
                                            type: "string",
                                            },
                                        },
                                        },
                                    },
                                    },
                                },
                                },
                            },
                            },
                        },
                        },
                    },
                    },
                },
                401: {
                    description: "Unauthorized",
                    content: {
                    "application/json": {
                        schema: {
                        type: "object",
                        properties: {
                            message: {
                            type: "string",
                            example: "Not authorized",
                            },
                        },
                        },
                    },
                    },
                },
                404: {
                    description: "Scheda not found",
                    content: {
                    "application/json": {
                        schema: {
                        type: "object",
                        properties: {
                            message: {
                            type: "string",
                            example: "Scheda not found",
                            },
                        },
                        },
                    },
                    },
                },
                500: {
                  description: "Internal server error",
                  content: {
                  "application/json": {
                      schema: {
                      type: "object",
                      properties: {
                          message: {
                          type: "string",
                          example: "Internal server error",
                          },
                      },
                      },
                  },
                  },
              },
                },
            },
        },
        "/auth/getUserData": {
          get: {
            tags: ["auth"],
            summary: "Get user data",
            parameters: [
              {
                name: "userId",
                in: "query",
                required: true,
                schema: {
                  type: "string",
                },
                description: "ID of the user",
              },
            ],
            responses: {
              200: {
                description: "User data retrieved successfully",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        data: {
                          type: "object",
                          properties: {
                            _id: {
                              type: "string",
                              example: "60d0fe4f5311236168a109ca",
                            },
                            username: {
                              type: "string",
                              example: "Example username",
                            }, 
                            email: {
                              type: "string",
                                required: true,
                                example: "user@example.com",
                              },
                            password: {
                              type: "string",
                              example: "password123",
                            },
                            firstName: {
                              type: "string",
                              example: "FirstName",
                            },
                            lastName: {
                              type: "string",
                              example: "Lastname",
                            },
                            date_of_birth: {
                              type: "string",
                              example: "01/01/2000",
                            },
                            user_weight: {
                                type: "number",
                                example: "80",
                              },
                            user_height: {
                              type: "number",
                              example: "1,80",
                            },
                            thighs: {
                              type: "number",
                              example: "20",
                            },
                            shoulders: {
                              type: "number",
                              example: "30",
                            },
                            waist: {
                              type: "number",
                              example: "30",
                            },
                            biceps: {
                              type: "number",
                              example: "15",
                            },
                            initial: {
                              type: "number",
                              example: "1",
                            },
                            goal: {
                              type: "number",
                              example: "2",
                            },
                            theme: {
                                type: "string",
                                example: "white",
                              }
                          },
                        },
                      },
                    },
                  },
                },
              },
              401: {
                description: "Unauthorized",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Not authorized",
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: "User not found",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "User not found",
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Internal server error",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Internal server error",
                        },
                    },
                    },
                },
                },
            },
            },
          },
        },
        "/auth/getUserTheme": {
          get: {
            tags: ["auth"],
            summary: "Get user theme",
            parameters: [
              {
                name: "userId",
                in: "query",
                required: true,
                schema: {
                  type: "string",
                },
                description: "ID of the user",
              },
            ],
            responses: {
              200: {
                description: "Successfully retrieved user data",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        data: {
                          type: "object",
                          properties: {
                            theme: {
                              type: "string",
                              description: "The theme selected by the user",
                              example: "black",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              401: {
                description: "Unauthorized",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Not authorized",
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Internal server error",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Internal server error",
                        },
                    },
                    },
                },
                },
            },
            },
          },
        },
        "/auth/login": {
          post: {
            tags: ["auth"],
            summary: "Login",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      email: { 
                        type: "string",
                        example: "user@example.com",
                      },
                      password: { 
                        type: "string",
                        example: "password123",
                      },
                    },
                    required: ["email", "password"],
                  },
                },
              },
            },
            responses: {
              200: {
                description: "Login successful",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        token: {
                          type: "string",
                          example: "jwt-token",
                        },
                      },
                    },
                  },
                },
              },
              400: {
                description: "Invalid credentials",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Invalid credentials",
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: "User not found",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "User not found",
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Internal server error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Internal server error",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/auth/logout": {
          get: {
            tags: ["auth"],
            summary: "Logout",
            parameters: [
                {
                  name: "userId",
                  in: "query",
                  required: true,
                  schema: {
                    type: "string",
                  },
                  description: "ID of the user",
                },
            ],
            responses: {
              200: {
                description: "Logout successful",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Logout successful",
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Internal server error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Logout failed",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/auth/updateScheda": {
        post: {
            tags: ["auth"],
            summary: "Update user's scheda",
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    properties: {
                    email: {
                        type: "string",
                        example: "user@example.com",
                    },
                    password: {
                        type: "string",
                        example: "password123",
                    },
                    },
                },
                },
            },
            },
            responses: {
            200: {
                description: "Scheda updated successfully",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        },
                        data: {
                        type: "object",
                        properties: {
                            userEmail: {
                            type: "string",
                            },
                            gambe: {
                            type: "string",
                            },
                            schiena: {
                            type: "string",
                            },
                            petto: {
                            type: "string",
                            },
                            braccia: {
                            type: "string",
                            },
                            addome: {
                            type: "string",
                            },
                        },
                        },
                    },
                    },
                },
                },
            },
            400: {
                description: "Invalid input",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Invalid input",
                        },
                    },
                    },
                },
                },
            },
            401: {
                description: "Unauthorized",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Not authorized",
                        },
                    },
                    },
                },
                },
            },
            404: {
                description: "User not found",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "User not found",
                        },
                      },
                    },
                  },
                },
              },
            500: {
                description: "Internal server error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Internal server error",
                        },
                      },
                    },
                  },
                },
              },
            },
        },
        },
        "/auth/updateTheme": {
        put: {
            tags: ["auth"],
            summary: "Update user theme",
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    properties: {
                    userId: {
                        type: "string",
                        example: "user123",
                    },
                    theme: {
                        type: "string",
                        example: "dark",
                    },
                    },
                    required: ["userId", "theme"],
                },
                },
            },
            },
            responses: {
            200: {
                description: "Theme updated successfully",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Theme updated successfully",
                        },
                    },
                    },
                },
                },
            },
            400: {
                description: "Invalid input",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Invalid input",
                        },
                    },
                    },
                },
                },
            },
            401: {
                description: "Unauthorized",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Not authorized",
                        },
                    },
                    },
                },
                },
            },
            404: {
                description: "User not found",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "User not found",
                        },
                    },
                    },
                },
                },
            },
            500: {
                description: "Internal server error",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Internal server error",
                        },
                    },
                    },
                },
                },
            },
            },
        },
        },
        "/auth/updateUserData": {
          put: {
            tags: ["auth"],
            summary: "Update user data",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      username: {
                        type: "string",
                        example: "Example username",
                      }, 
                      email: {
                        type: "string",
                          required: true,
                          example: "user@example.com",
                        },
                      password: {
                        type: "string",
                        example: "password123",
                      },
                      firstName: {
                        type: "string",
                        example: "FirstName",
                      },
                      lastName: {
                        type: "string",
                        example: "Lastname",
                      },
                      date_of_birth: {
                        type: "string",
                        example: "01/01/2000",
                      },
                      user_weight: {
                          type: "number",
                          example: "80",
                        },
                      user_height: {
                        type: "number",
                        example: "1,80",
                      },
                      thighs: {
                        type: "number",
                        example: "20",
                      },
                      shoulders: {
                        type: "number",
                        example: "30",
                      },
                      waist: {
                        type: "number",
                        example: "30",
                      },
                      biceps: {
                        type: "number",
                        example: "15",
                      },
                      initial: {
                        type: "number",
                        example: "1",
                      },
                      goal: {
                        type: "number",
                        example: "2",
                      },
                      theme: {
                          type: "string",
                          example: "white",
                        }
                    },
                  },
                },
              },
            },
            responses: {
              200: {
                description: "User data updated successfully",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "User data updated successfully",
                        },
                      },
                    },
                  },
                },
              },
              400: {
                description: "Invalid input",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Invalid input",
                        },
                      },
                    },
                  },
                },
              },
              401: {
                description: "Unauthorized",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Not authorized",
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: "User not found",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "User not found",
                        },
                      },
                    },
                  },
                },
              },
                500: {
                    description: "Internal server error",
                    content: {
                    "application/json": {
                        schema: {
                        type: "object",
                        properties: {
                            message: {
                            type: "string",
                            example: "Internal server error",
                            },
                        },
                        },
                    },
                    },
                },
            },
          },
        },
        "/creaScheda/creaEsercizio": {
          get: {
            tags: ["creaScheda"],
            summary: "Create new exercise",
            responses: {
              200: {
                description: "Exercise created successfully",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        id: {
                          type: "number",
                          description: "Unique identifier for the exercise",
                        },
                        name: {
                          type: "string",
                          description: "Name of the exercise",
                        },
                        muscular_group: {
                          type: "string",
                          description: "Muscular group targeted by the exercise",
                        },
                        exercise_description: {
                          type: "string",
                          description: "Description of how to perform the exercise",
                        },
                        reps_number: {
                          type: "number",
                          description: "Number of repetitions recommended for the exercise",
                        },
                        sets_number: {
                          type: "number",
                          description: "Number of sets recommended for the exercise",
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Internal server error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Internal server error",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/creaScheda/getExercises": {
          get: {
            tags: ["creaScheda"],
            summary: "Get exercises",
            responses: {
              200: {
                description: "Exercises retrieved successfully",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        exercises: {
                          type: "array",
                          items: { 
                            type: "object", // Define actual exercise structure here
                          },
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Internal server error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Internal server error",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/creaScheda": {
        post: {
            tags: ["creaScheda"],
            summary: "Create new scheda",
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    properties: {
                    email: {
                        type: "string",
                        example: "user@example.com",
                    },
                    password: {
                        type: "string",
                        example: "password123",
                    },
                    },
                },
                },
            },
            },
            responses: {
            200: {
                description: "Exercises retrieved successfully",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        },
                        token: {
                        type: "string",
                        },
                    },
                    },
                },
                },
            },
            400: {
                description: "Invalid email or password",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Invalid email or password",
                        },
                    },
                    },
                },
                },
            },
            500: {
                description: "Internal server error",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Internal server error",
                        },
                    },
                    },
                },
                },
            },
            },
        },
        },
        "/register": {
          post: {
            tags: ["register"],
            summary: "Register new user",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      username: {
                        type: "string",
                        example: "Example username",
                      }, 
                      email: {
                        type: "string",
                          required: true,
                          example: "user@example.com",
                        },
                      password: {
                        type: "string",
                        example: "password123",
                      },
                      firstName: {
                        type: "string",
                        example: "FirstName",
                      },
                      lastName: {
                        type: "string",
                        example: "Lastname",
                      },
                      date_of_birth: {
                        type: "string",
                        example: "01/01/2000",
                      },
                      user_weight: {
                          type: "number",
                          example: "80",
                        },
                      user_height: {
                        type: "number",
                        example: "1,80",
                      },
                      thighs: {
                        type: "number",
                        example: "20",
                      },
                      shoulders: {
                        type: "number",
                        example: "30",
                      },
                      waist: {
                        type: "number",
                        example: "30",
                      },
                      biceps: {
                        type: "number",
                        example: "15",
                      },
                      initial: {
                        type: "number",
                        example: "1",
                      },
                      goal: {
                        type: "number",
                        example: "2",
                      },
                      theme: {
                          type: "string",
                          example: "white",
                        }
                    },
                    required: ["username", "password", "email"],
                  },
                },
              },
            },
            responses: {
              201: {
                description: "User registered successfully",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "User registered successfully",
                        },
                      },
                    },
                  },
                },
              },
              400: {
                description: "Invalid input",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Invalid input",
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Internal server error",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Internal server error",
                        },
                    },
                    },
                },
                },
            },
            },
          },
        },
    },
},
    });

  return spec;
};
