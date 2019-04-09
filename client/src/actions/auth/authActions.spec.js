import * as ActionTypes from "../types";
import * as ActionCreators from "./authActions";

describe("AuthActions", () => {
  it("should create action REGISTER_USER_STARTED to authorise users", () => {
    const dispatch = jest.fn();
    const expected = {
      type: ActionTypes.REGISTER_USER_STARTED
    };

    const newUser = {};

    // we expect this to return a function since it is a thunk
    expect(typeof ActionCreators.registerUser(newUser)).toEqual("function");
    // then we simulate calling it with dispatch as the store would do
    ActionCreators.registerUser(newUser)(dispatch);
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).toBeCalledWith(expected);
  });
});
