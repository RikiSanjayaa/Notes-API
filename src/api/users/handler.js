class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postUserHandler = async (request, h) => {
    this._validator.validateUserPayload(request.payload);
    const userId = await this._service.AddUser(request.payload);
    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  };

  getUserByIdHandler = async (request) => {
    const { id } = request.params;
    const user = await this._service.getUserById(id);
    return {
      status: 'success',
      data: { user },
    };
  };
}

module.exports = UsersHandler;
