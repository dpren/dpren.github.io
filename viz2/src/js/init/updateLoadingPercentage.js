module.exports = (p, state) => {

    return (img) => {

        state.loadedItems += 1;

        console.log(state.loadedItems, ((state.loadedItems / state.totalLoadItems) * 100).toFixed(0) + '%');
    };
};
