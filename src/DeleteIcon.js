import React, { Component } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast, cssTransition } from 'react-toastify';

const Zoom = cssTransition({
    enter: 'zoomIn',
    exit: 'zoomOut',
    duration: 1000,
  });

class DeleteIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            removeToast: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.deleteArticleToast = this.deleteArticleToast.bind(this);
    }

    deleteArticleToast(){
        // console.log("I was called")
        if(this.state.removeToast) return;
        this.setState({
            removeToast: true
        })

        
        toast((<div>
          <h6 className="toast-heading">{"Removing " + this.state.title}</h6>
        </div>), {
          position: "top-center",
          autoClose: true,
          hideProgressBar: true,
          pauseOnHover: false,
          draggable: false,
          transition: Zoom,
          autoClose: 1000,
          className: 'shareToast',
          onClose: () => this.setState({removeToast: false}) 
        });   
    }

    handleClick(e) {
        e.stopPropagation();
        this.deleteArticleToast();
        this.props.callback(this.state.id); 
    }

    render() {
        return <MdDelete onClick={this.handleClick} />
    }
}
export default DeleteIcon;