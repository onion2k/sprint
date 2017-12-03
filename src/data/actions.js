
export const project = (project) => {

    return function(dispatch, getState) {

        let p = dispatch({
            type: 'ADD_PROJECT',
            title: 'Add project action dispatch'
        });

        return p;

    }

}
