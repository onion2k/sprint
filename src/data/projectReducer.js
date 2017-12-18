import {
  LOAD_PROJECT,
  ADD_PROJECT,
  UPDATE_PROJECT,
  CREATE_FEATURE,
  UPDATE_FEATURE,
  DELETE_FEATURE
} from "./constants.js";

const initialState = {
  title: "",
  client: "elanders",
  description: "Project desc",
  task: "design",
  risks: "design",
  feature: {
    abcdef123: {
      title: "Feature 1",
      risks: "",
      tasks: [
        {
          id: "task123",
          title: "Task 1",
          min: 25,
          max: 50,
          type: "development",
          comments: "Blah blah blah"
        },
        {
          id: "task234",
          title: "Task 2",
          min: 5,
          max: 37.5,
          type: "design",
          comments: ""
        },
        {
          id: "task456",
          title: "Task 3",
          min: 5,
          max: 25,
          type: "projectmanagement",
          comments: ""
        },
        {
          id: "task567",
          title: "Task 4",
          min: 5,
          max: 15,
          type: "development",
          comments: ""
        }
      ]
    },
    abcdef456: {
      title: "Feature 2",
      tasks: [
        {
          id: "design1",
          title: "Task 1",
          min: 15,
          max: 25,
          type: "design",
          comments: ""
        }
      ]
    },
    abcdef789: {
      title: "Feature 3",
      tasks: [
        {
          id: "dev1",
          title: "Development 1",
          min: 15,
          max: 25,
          type: "development",
          comments: ""
        },
        {
          id: "dev2",
          title: "Development 2",
          min: 30,
          max: 40,
          type: "development",
          comments: ""
        }
      ]
    },
    abcdef100: {
      title: "Feature 4",
      tasks: [
        {
          id: "test1",
          title: "Testing",
          min: 10,
          max: 12,
          type: "development",
          comments: ""
        }
      ]
    }
  }
};

export default function project(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECT:
      state.title = action.contents;
      return { ...state };

    case UPDATE_PROJECT:
      state.title = action.contents.title;
      return { ...state };

    case UPDATE_FEATURE:
      if (state.feature[action.contents.id] === undefined) {
        let id = Date.now();
        // no tasks? add an array
        state.feature[id] = action.contents;
      } else {
        state.feature[action.contents.id] = action.contents;
      }
      return { ...state };

    case DELETE_FEATURE:
      delete state.feature[action.contents];
      return { ...state };

    case ADD_PROJECT:
      return { project: action.project, contents: action.contents };

    default:
      return state;
  }
}
