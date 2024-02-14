import { Request, Response } from "express";
import { middleware } from "../../utils/middleware";

jest.mock("../../utils/logger", () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

const createMockReq = (options = {}) =>
  ({
    method: "GET",
    path: "/",
    body: {},
    ...options,
  } as unknown as Request);

const createMockRes = () => {
  const res: Partial<Response> = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("Middleware Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("unknownEndpoint sends correct response", () => {
    const req = createMockReq();
    const res = createMockRes();

    middleware.unknownEndpoint(req, res);

    expect(res.send).toHaveBeenCalledWith({ message: "unknown endpoint" });
  });
});
