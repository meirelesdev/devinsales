const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API | DevinSales",
    description:
      "Estas é a documentação para as desenvolvedores que utilizaram nossa API.",
  },
  host: "devinsales.herokuapp.com",
  schemes: ["https"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "authorization",
      in: "header",
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  definitions: {
    AddUser: {
      name: 'John Doe',
      password: 'aB12345',
      email: 'john.doe@email.com',
      birth_date: '01/01/1990',
      roles: [{ role_id: 2 }]
    },
    UserLogin: {
      email: "john.doe@email.com",
      password: "aB12345"
    },
    UserInfo: {
      user: [{
        id: 42,
        name: "John Doe",
        email: "john.doe@email.com",
        birth_date: "01/01/1990"
      }]
    },
    CreateUserResponses: {
      possibleResponse_1: { message: "É necessário que a data informada exista e  seja do tipo dd/mm/yyyy" },
      possibleResponse_2: { message: "É necessário que o usuário seja maior de idade" },
      possibleResponse_3: { message: "O novo usuário necessita ter um cargo de WRITE e READ" },
      possibleResponse_4: { message: "E-mail deve ser único" },
    },
    Permissions: [
      {
        permission_id: 1,
      },
    ],
    AddRole: {
      description: "Financeiro",
    },
    AddPermission: {
      description: "WRITE",
    },
    AddProduct: {
      name: "MacBook Air",
      suggested_price: 7999.99,
    },
    ResProduct: {
      nome: "MacBook Air",
      preço_sugerido: 7999.99,
    },
    ResRole: {
      message: "Cargo criado com sucesso."
    },
    GetProduct: {
      Products: [
        {
          id: 2,
          name: "MacBook Pro",
          suggested_price: 10999.99,
        },
      ],
    },
    PutProduct: {
      name: "Ipad Air",
      suggested_price: 4999.99,
    },
    PatchProduct: {
      suggested_price: 3999.99,
    },
    AddCity: {
      name: "Curitiba"
    },
    ResState: {
      id: 1
    },
    address: {
      street: "Rua Florianopolis",
      number: 123,
      cep: "89229780",
      complement: "Apto. 302"
    }
  },
};

const outputFile = "./src/swagger.json";
const endpointsFiles = ["./src/routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc)
