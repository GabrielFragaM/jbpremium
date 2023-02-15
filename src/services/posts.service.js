import {callApi} from '../api/callApi';

export async function getLikes(postId){
    return callApi(`${process.env.REACT_APP_API_ENV}/UserActions/like/post/${postId}`, 'GET', {}).then(async likes => {
        return likes.result;
    });
}
export async function getComments(postId){
    return callApi(`${process.env.REACT_APP_API_ENV}/UserActions/comment/post/${postId}`, 'GET', {}).then(async comments => {
        return comments.result;
    });
}
export async function getSubCategory(categoryId){
    return callApi(`${process.env.REACT_APP_API_ENV}/SubCategories/${categoryId}`, 'GET', {}).then(async category => {
        return category.result;
    });
}
export async function getContent(postId){
    return callApi(`${process.env.REACT_APP_API_ENV}/PostsContents/post/${postId}`, 'GET', {}).then(async contents => {
        return contents.result;
    });
}

