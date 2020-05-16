import React, { Component } from 'react';
import commentBox from 'commentbox.io';

class ArticleCommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
                id: this.props.identifier
        }
    }

    componentDidMount() {
        this.removeCommentBox = commentBox('5733967550480384-proj', {
            className: 'commentbox', 
            defaultBoxId: this.state.id,
            tlcParam: 'tlc',
            backgroundColor: '#ffffff',
            textColor: '#000000'
        });
    }

    componentWillUnmount() {
        this.removeCommentBox();
    }

    render() {
        return (
            <div className="commentbox" />
        )
    }
}
export default ArticleCommentBox;