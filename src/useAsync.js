import { useReducer, useEffect } from "react";

function reducer(state, action) {
  console.log("action", action);
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: true,
  });
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await callback();
      console.log(data);
      dispatch({ type: "SUCCESS", data });
    } catch (e) {
      console.log(e);
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();

    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}
