const getters = {
    curCloud: state => {
        return state.curCloud
    },
    cloudList: state => {
        return state.cloudList
    },
    curCloudBox: state => {
        return state.cloudList[state.curCloud] || {};
    },
    uploadList: state => {
        return state.uploadList;
    },
    curUploadIdx: state => {
        return state.curUploadIdx;
    }
}

export default getters;