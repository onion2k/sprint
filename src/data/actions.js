
export const actionProject = (project) => {

    return function(dispatch, getState) {

        return fetch(`/api/${project}`, { credentials: 'include' }).then((response) => {

            if(response.status===200) {
                return response.json();
            }
            throw new Error('Network response was not ok.');

        }).then((jsonResult) => {

            // dispatch({
            //     type: 'ADD_BARCODE',
            //     id: nextBarcode++,
            //     barcode,
            //     barcode_id,
            //     name,
            //     user_id,
            //     state,
            //     description,
            //     timestamp,
            // });

            return true;

        }).catch((e) => {
            console.log(e);
        });
    }
}