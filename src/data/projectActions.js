import firebase from "./firebase";

export const load = project => {
  return function(dispatch, getState) {
    return firebase
      .database()
      .ref("project")
      .once("value")
      .then(
        function(snapshot) {
          dispatch({
            type: "LOAD_PROJECT",
            contents: snapshot.val()
          });
        },
        function(error) {
          console.error(error);
        }
      );
  };
};

export const update = project => {
  return function(dispatch, getState) {
    console.log(project);
    let p = dispatch({
      type: "UPDATE_PROJECT",
      contents: project
    });

    return p;
  };
};

export const del = project => {
  return function(dispatch, getState) {
    let p = dispatch({
      type: "DELETE_PROJECT",
      contents: project
    });

    return p;
  };
};
