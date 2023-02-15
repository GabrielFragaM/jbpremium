import {callApi} from "../api/callApi";
import {message, notification} from "antd";
import { SmileOutlined } from '@ant-design/icons';

export function getCachePost(){
    const post = JSON.parse(sessionStorage.getItem('postStruct'));
    if(post === null || post === undefined){
        return {
            title: 'Post não encontrado.',
            contents: []
        }
    }else{
        return post;
    }

}
export function getCacheContentsPost(){
    return getCachePost().contents;
}

export function resetCachePost(){
    sessionStorage.setItem('postStruct', null);
}

export function updateCachePost({update}){
    const postStruct = JSON.parse(sessionStorage.getItem('postStruct'));
    sessionStorage.setItem('postStruct', JSON.stringify({
        key: 'post',
        ...postStruct,
        ...update,
    }));
}

export function sendToProductionContainer({containerId, sendToProduction, setPostStruct}) {
    const containers = getCacheContentsPost();
    console.log(containers);
    const updatedContainer = {
        ...containers.filter(con => con.id === containerId)[0],
        elements: sendToProduction === false ? [] : containers.filter(con => con.id === containerId)[0].elementsEditing
    };
    const updatedContainers = containers.filter(con => con.id !== containerId);
    updatedContainers.push(updatedContainer);
    updateCachePost({update: {contents: updatedContainers}});
    setPostStruct(updatedContainers);
    const postDetails = getCachePost();
    saveContents(updatedContainers, postDetails.id, true);
}

export async function saveContents(contents, postId, isProduction){
    contents.forEach(function (content) {
        if(content.new && !isProduction){
            callApi(`${process.env.REACT_APP_API_ENV}/PostsContents`, 'POST', {...content, postId: postId})
                .then(() => {
                    console.log('1111111');
                    sessionStorage.setItem('allPostsCache', 'empty');
                });
        }else{
            callApi(`${process.env.REACT_APP_API_ENV}/PostsContents/${content.id}`, 'PUT', {...content, postId: postId})
                .then(() => {
                    console.log('2222');
                    sessionStorage.setItem('allPostsCache', 'empty');
                });
        }
    });
}

export async function savePost(values){
    const postDetails = getCachePost();

    if(postDetails.hasOwnProperty('id')){
        if(postDetails.hasOwnProperty('createdAtString')){
            delete values.createdAtString;
            delete values.updatedAtString;
        }

        callApi(`${process.env.REACT_APP_API_ENV}/BlogPosts/${postDetails.id}`, 'PUT', {id: postDetails.id, categoryId: postDetails.categoryId, ...values}).then(async post => {
            if(post.responseStatus === 204){
                await saveContents(postDetails.contents, postDetails.id, false);
                notification.open({
                    message: 'Salvando seu Post...',
                    description:
                        'Qualquer alteração no Post é feito o salvamento automático das informações.',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });
                sessionStorage.setItem('allPostsCache', 'empty');
            }
        });
    }else{
        callApi(`${process.env.REACT_APP_API_ENV}/BlogPosts`, 'POST', {...postDetails, ...values}).then(async newPost => {
            if(newPost.responseStatus === 201){
                sessionStorage.setItem('allPostsCache', 'empty');
                await saveContents(postDetails.contents, newPost.result.id, false);
                message.success('Post criado com sucesso !');
                window.history.back();
            }
        });
    }
}

export function deletePost(){
    const postDetails = getCachePost();

    callApi(`${process.env.REACT_APP_API_ENV}/BlogPosts/${postDetails.id}`, 'DELETE', {}).then(() =>
        {
            sessionStorage.setItem('allPostsCache', 'empty');
            message.success('Deletado com sucesso !', 1)
                .then(succes => window.history.back());
        }
    );
}


export function deleteContent({containerId}){
    callApi(`${process.env.REACT_APP_API_ENV}/PostsContents/${containerId}`, 'DELETE', {}).then((result) =>
        {
            sessionStorage.setItem('allPostsCache', 'empty');
            message.success('Deletado !', 1);
        }
    );
}