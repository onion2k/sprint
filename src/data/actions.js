
export const project = (project) => {

    return function(dispatch, getState) {

        let p = dispatch({
            type: 'UPDATE_PROJECT',
            contents: project
        });

        return p;

    }

}
