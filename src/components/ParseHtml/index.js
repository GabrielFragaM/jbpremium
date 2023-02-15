import React from "react";

export default function ParseContentToHtml(contentState){
    return <div style={{paddingTop: (contentState.paddingTop).toString() + 'px', width: contentState.width, justifyContent: contentState.position}}
                dangerouslySetInnerHTML={{__html: contentState.content}}
    />
}
