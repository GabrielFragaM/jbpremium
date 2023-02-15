
import {message} from "antd";
import {getCachePost, savePost, updateCachePost} from "../../../services/postStruct.service";

export async function updateContent(key, value, contentState, setContentState){
    try{
        contentState[key] = value;
        let newValues = {...contentState};
        await setContentState(newValues);
    }catch (e){
    }
}

export async function save(contentState, containerId, element) {
    try {
        const postStruct = getCachePost();

        let container = [...postStruct.contents.filter(con => con.id === containerId)];
        const updatedContainers = [...postStruct.contents.filter(con => con.id !== containerId)];

        if (element) {
            const updatedElements = [...container[0].elementsEditing.filter(el => el.id !== element.id)];
            updatedContainers.push({
                ...container[0],
                elementsEditing: [
                    ...updatedElements,
                    contentState
                ],
            });
        } else {
            updatedContainers.push({
                ...container[0],
                elementsEditing: [
                    ...container[0].elementsEditing,
                    {
                        ...contentState,
                        id: parseInt(Date.now() * Math.random()).toString(),
                    }
                ],
            });
        }
        updateCachePost({update: {contents: updatedContainers}});
        sessionStorage.setItem('tempElement', JSON.stringify(null));
        await savePost(getCachePost());
    } catch (e) {
        message.warning('Não foi possivel salvar.');
    }

}