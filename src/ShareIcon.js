import React, { Component } from 'react';
import { IoMdShare } from 'react-icons/io';
import { toast } from 'react-toastify';
import ShareButtons from './ShareButtons';
import Modal from 'react-bootstrap/Modal';
import MediaQuery from 'react-responsive';

class ShareIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: this.props.article,
      shareToast: false,
      shareModal: false,
      flag: this.props.flag ? true : false
    }
    this.displayArticleToast = this.displayArticleToast.bind(this);
    this.displayArticleModal = this.displayArticleModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  displayArticleToast(e) {
    e.stopPropagation();
    console.log("ShareIcon")
    // console.log("I was called")
    let article = this.state;
    if (this.state.shareToast) return;
    this.setState({
      shareToast: true
    })

    toast((
      <div className="toast-box">
        <h6 className="toast-heading">{article.article.title}</h6>
        <hr />
        <div>
          <h6 className="toast-share">Share via</h6>
          <ShareButtons article={article} styling="shareIcon-margins" />
        </div>
      </div>), {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        className: 'share-toast',
        onClose: () => this.setState({ shareToast: false })
      });

  }

  displayArticleModal(e) {
    e.stopPropagation();
    
    if(this.state.flag){
      this.props.callback(this.state);
    }
    if(!this.state.flag) {
      this.setState({
        shareModal: true
      });
    }
  }

  handleClose(e) {
    this.setState({
      shareModal: false
    });
  }

  handleClick(e) {
    e.stopPropagation();
    return;
  }


  render() {
    let article = this.state;
    return (
      <span>
        <IoMdShare
          onClick={this.displayArticleModal}
        />
        <MediaQuery minDeviceWidth={650}>
        {
          this.state.shareModal?
        (<div onClick={(e) => e.stopPropagation()}>
        <Modal style={{display:"inline"}} dialogClassName="modal-box" show={this.state.shareModal} onClick={this.handleClick}
          onHide={this.handleClose} backdrop="static" keyboard={ false }>
          <Modal.Header className="modal-heading" closeButton>
          <div className="modal-title">
              {this.state.flag ? (<h5>{this.props.newsChannel != "NY" ? "GUARDIAN" : "NY TIMES"}</h5>) : null}
            <div> {article.article.title}</div>
          </div>
          </Modal.Header>
            <Modal.Body>
              <div>
                <h6 className="toast-share">Share via</h6>
                <ShareButtons article={article} styling="shareIcon-margins" />
              </div>
            </Modal.Body>
        </Modal>
        </div>):null
        }
        </MediaQuery>
        <MediaQuery maxDeviceWidth={649} >
        {this.state.shareModal?
        (
        <div style={{display:"inline"}} onClick={(e) => e.stopPropagation()}>
        <Modal size='sm' dialogClassName="modal-box" show={this.state.shareModal} onClick={this.handleClick}
          onHide={this.handleClose} backdrop="static" keyboard={ false }>
          <Modal.Header className="modal-heading" closeButton>
          <div className="modal-title">
              {this.state.flag ? (<h5>{this.props.newsChannel != "NY" ? "GUARDIAN" : "NY TIMES"}</h5>) : null}
            <div> {article.article.title}</div>
          </div>
          </Modal.Header>
            <Modal.Body>
              <div>
                <h6 className="toast-share">Share via</h6>
                <ShareButtons article={article} styling="shareIcon-margins-sm" />
              </div>
            </Modal.Body>
        </Modal>
        </div>):null}
        </MediaQuery>
      </span>
        )
      }
    }
export default ShareIcon;